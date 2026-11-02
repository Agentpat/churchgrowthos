import Attendance from "../models/Attendance.js";
import AttendanceSession from "../models/AttendanceSession.js";
import Member from "../models/Member.js";
import Service from "../models/Service.js";
import ApiError from "../utils/ApiError.js";

// =====================================
// Validate Live Attendance State
// =====================================
//
// Attendance recording requires BOTH:
//
// Service.status === "LIVE"
// AttendanceSession.status === "OPEN"
//
// This is the central backend guard.
// =====================================

const validateAttendanceIsOpen = async (
  churchId,
  serviceId,
) => {
  const service = await Service.findOne({
    _id: serviceId,
    churchId,
    isActive: true,
  });

  if (!service) {
    throw new ApiError(
      404,
      "Service not found.",
    );
  }

  // -------------------------------------
  // Service must actually be LIVE
  // -------------------------------------

  if (service.status !== "LIVE") {
    if (service.status === "SCHEDULED") {
      throw new ApiError(
        400,
        "Attendance cannot be taken until the service is live.",
      );
    }

    if (service.status === "COMPLETED") {
      throw new ApiError(
        400,
        "Attendance cannot be taken for a completed service.",
      );
    }

    if (service.status === "CANCELLED") {
      throw new ApiError(
        400,
        "Attendance cannot be taken for a cancelled service.",
      );
    }

    throw new ApiError(
      400,
      "Attendance cannot be taken for this service.",
    );
  }

  // -------------------------------------
  // Find Attendance Session
  // -------------------------------------

  const session =
    await AttendanceSession.findOne({
      churchId,
      serviceId,
    });

  if (!session) {
    throw new ApiError(
      400,
      "Attendance has not been opened for this service.",
    );
  }

  // -------------------------------------
  // Session must be OPEN
  // -------------------------------------

  if (session.status !== "OPEN") {
    if (
      session.status === "NOT_STARTED"
    ) {
      throw new ApiError(
        400,
        "Attendance has not been opened for this service.",
      );
    }

    if (session.status === "CLOSED") {
      throw new ApiError(
        400,
        "Attendance has been closed for this service.",
      );
    }

    if (
      session.status === "FINALIZED"
    ) {
      throw new ApiError(
        400,
        "Attendance has been finalized for this service.",
      );
    }

    throw new ApiError(
      400,
      "Attendance is not currently open for this service.",
    );
  }

  return {
    service,
    session,
  };
};

// =====================================
// Check In Member
// =====================================
//
// Primary operational attendance flow.
//
// Used by:
// - QR scanner
// - Usher member search
// - Self check-in
// - Manual check-in
// =====================================

const checkInMember = async (
  churchId,
  userId,
  data,
) => {
  const {
    serviceId,
    memberId,
    checkInMethod = "MANUAL",
    notes = "",
  } = data;

  // =====================================
  // Validate Input
  // =====================================

  if (!serviceId || !memberId) {
    throw new ApiError(
      400,
      "Service and member are required.",
    );
  }

  // =====================================
  // Validate Live Attendance State
  // =====================================

  const { service } =
    await validateAttendanceIsOpen(
      churchId,
      serviceId,
    );

  // =====================================
  // Validate Check-in Method
  // =====================================

  const allowedMethods = [
    "MANUAL",
    "QR_CODE",
    "SELF_CHECK_IN",
    "SMS",
  ];

  if (
    !allowedMethods.includes(
      checkInMethod,
    )
  ) {
    throw new ApiError(
      400,
      "Invalid attendance check-in method.",
    );
  }

  // =====================================
  // Find Member
  // =====================================

  const member = await Member.findOne({
    _id: memberId,
    churchId,
    isActive: true,
  });

  if (!member) {
    throw new ApiError(
      404,
      "Member not found.",
    );
  }

  // =====================================
  // Prevent Duplicate Check-in
  // =====================================

  const existingAttendance =
    await Attendance.findOne({
      churchId,
      serviceId,
      memberId,
    });

  if (existingAttendance) {
    return {
      alreadyCheckedIn: true,

      attendance:
        existingAttendance,

      member,
    };
  }

  // =====================================
  // Create Attendance Record
  // =====================================

  const attendance =
    await Attendance.create({
      churchId,

      serviceId,

      memberId,

      personType: "MEMBER",

      status: "PRESENT",

      checkInMethod,

      recordedBy: userId,

      checkedInAt: new Date(),

      notes,
    });

  // =====================================
  // Update Member Last Attendance
  // =====================================

  member.lastAttendance =
    attendance.checkedInAt;

  await member.save();

  // =====================================
  // Update Service Statistics
  // =====================================

  service.totalAttendance =
    (service.totalAttendance || 0) + 1;

  if (
    member.membershipStatus ===
    "FIRST_TIMER"
  ) {
    service.firstTimers =
      (service.firstTimers || 0) + 1;
  }

  if (
    member.membershipStatus ===
    "MEMBER"
  ) {
    service.membersPresent =
      (service.membersPresent || 0) + 1;
  }

  if (
    member.membershipStatus ===
    "WORKER"
  ) {
    service.workersPresent =
      (service.workersPresent || 0) + 1;
  }

  await service.save();

  // =====================================
  // Return Result
  // =====================================

  return {
    alreadyCheckedIn: false,

    attendance,

    member,
  };
};

// =====================================
// Get Live Attendance
// =====================================

const getLiveAttendance = async (
  churchId,
  serviceId,
) => {
  // =====================================
  // Find Service
  // =====================================

  const service =
    await Service.findOne({
      _id: serviceId,
      churchId,
      isActive: true,
    }).lean();

  if (!service) {
    throw new ApiError(
      404,
      "Service not found.",
    );
  }

  // =====================================
  // Find Attendance Session
  // =====================================

  const session =
    await AttendanceSession.findOne({
      churchId,
      serviceId,
    })
      .populate(
        "openedBy",
        "firstName lastName",
      )
      .populate(
        "closedBy",
        "firstName lastName",
      )
      .populate(
        "finalizedBy",
        "firstName lastName",
      )
      .lean();

  if (!session) {
    throw new ApiError(
      404,
      "Attendance session not found.",
    );
  }

  // =====================================
  // Count Active Members
  // =====================================

  const expectedMembers =
    await Member.countDocuments({
      churchId,
      isActive: true,
    });

  // =====================================
  // Get Present Attendance
  // =====================================

  const attendance =
    await Attendance.find({
      churchId,
      serviceId,
      status: "PRESENT",
    })
      .populate(
        "memberId",
        "firstName lastName phone membershipStatus",
      )
      .populate(
        "visitorId",
        "firstName lastName phone email status source",
      )
      .populate(
        "recordedBy",
        "firstName lastName",
      )
      .sort({
        checkedInAt: -1,
      })
      .lean();

  // =====================================
  // Separate Members / Visitors
  // =====================================

  const memberAttendance =
    attendance.filter(
      (record) =>
        record.personType === "MEMBER",
    );

  const visitorAttendance =
    attendance.filter(
      (record) =>
        record.personType === "VISITOR",
    );

  // =====================================
  // Counts
  // =====================================

  const memberCount =
    memberAttendance.length;

  const visitorCount =
    visitorAttendance.length;

  const totalCount =
    memberCount + visitorCount;

  // =====================================
  // Attendance Rate
  // =====================================

  const attendanceRate =
    expectedMembers > 0
      ? Number(
          (
            (memberCount /
              expectedMembers) *
            100
          ).toFixed(1),
        )
      : 0;

  // =====================================
  // Recent Check-ins
  // =====================================

  const recentCheckIns =
    attendance
      .slice(0, 10)
      .map((record) => {
        const isMember =
          record.personType ===
          "MEMBER";

        const person = isMember
          ? record.memberId
          : record.visitorId;

        return {
          _id: record._id,

          personType:
            record.personType,

          person: person
            ? {
                _id: person._id,

                firstName:
                  person.firstName,

                lastName:
                  person.lastName,

                phone: person.phone,

                membershipStatus:
                  person.membershipStatus ||
                  null,

                visitorStatus:
                  person.status ||
                  null,
              }
            : null,

          member: isMember
            ? record.memberId
              ? {
                  _id:
                    record.memberId
                      ._id,

                  firstName:
                    record.memberId
                      .firstName,

                  lastName:
                    record.memberId
                      .lastName,

                  membershipStatus:
                    record.memberId
                      .membershipStatus,
                }
              : null
            : null,

          visitor: !isMember
            ? record.visitorId
              ? {
                  _id:
                    record.visitorId
                      ._id,

                  firstName:
                    record.visitorId
                      .firstName,

                  lastName:
                    record.visitorId
                      .lastName,

                  status:
                    record.visitorId
                      .status,

                  source:
                    record.visitorId
                      .source,
                }
              : null
            : null,

          checkInMethod:
            record.checkInMethod,

          checkedInAt:
            record.checkedInAt,

          recordedBy:
            record.recordedBy
              ? {
                  _id:
                    record.recordedBy
                      ._id,

                  firstName:
                    record.recordedBy
                      .firstName,

                  lastName:
                    record.recordedBy
                      .lastName,
                }
              : null,
        };
      });

  // =====================================
  // Return Live Attendance
  // =====================================

  return {
    session: {
      _id: session._id,

      status: session.status,

      startedAt:
        session.startedAt,

      closedAt:
        session.closedAt,

      finalizedAt:
        session.finalizedAt,

      openedBy:
        session.openedBy,

      closedBy:
        session.closedBy,

      finalizedBy:
        session.finalizedBy,
    },

    service: {
      _id: service._id,

      title: service.title,

      serviceDate:
        service.serviceDate,

      serviceType:
        service.serviceType,

      status:
        service.status,

      startTime:
        service.startTime,

      endTime:
        service.endTime,
    },

    stats: {
      expectedMembers,

      members:
        memberCount,

      visitors:
        visitorCount,

      total:
        totalCount,

      attendanceRate,
    },

    recentCheckIns,
  };
};

// =====================================
// Record Single Attendance
// =====================================
//
// Legacy/admin flow.
// Still subject to the same lifecycle
// restrictions.
// =====================================

const recordAttendance = async (
  churchId,
  userId,
  data,
) => {
  const {
    serviceId,
    memberId,
    status = "PRESENT",
    checkInMethod = "MANUAL",
    notes = "",
  } = data;

  if (!serviceId || !memberId) {
    throw new ApiError(
      400,
      "Service and member are required.",
    );
  }

  // =====================================
  // Validate Attendance State
  // =====================================

  const { service } =
    await validateAttendanceIsOpen(
      churchId,
      serviceId,
    );

  // =====================================
  // Validate Status
  // =====================================

  const allowedStatuses = [
    "PRESENT",
    "ABSENT",
    "EXCUSED",
  ];

  if (
    !allowedStatuses.includes(status)
  ) {
    throw new ApiError(
      400,
      "Invalid attendance status.",
    );
  }

  // =====================================
  // Validate Member
  // =====================================

  const member = await Member.findOne({
    _id: memberId,
    churchId,
    isActive: true,
  });

  if (!member) {
    throw new ApiError(
      404,
      "Member not found.",
    );
  }

  // =====================================
  // Prevent Duplicate
  // =====================================

  const existingAttendance =
    await Attendance.findOne({
      churchId,
      serviceId,
      memberId,
    });

  if (existingAttendance) {
    throw new ApiError(
      400,
      "Attendance already recorded.",
    );
  }

  // =====================================
  // Create Attendance
  // =====================================

  const attendance =
    await Attendance.create({
      churchId,

      serviceId,

      memberId,

      personType: "MEMBER",

      status,

      checkInMethod,

      recordedBy: userId,

      checkedInAt: new Date(),

      notes,
    });

  // =====================================
  // Update Statistics Only For Present
  // =====================================

  if (status === "PRESENT") {
    member.lastAttendance =
      attendance.checkedInAt;

    await member.save();

    service.totalAttendance =
      (service.totalAttendance || 0) + 1;

    if (
      member.membershipStatus ===
      "FIRST_TIMER"
    ) {
      service.firstTimers =
        (service.firstTimers || 0) + 1;
    }

    if (
      member.membershipStatus ===
      "MEMBER"
    ) {
      service.membersPresent =
        (service.membersPresent || 0) + 1;
    }

    if (
      member.membershipStatus ===
      "WORKER"
    ) {
      service.workersPresent =
        (service.workersPresent || 0) + 1;
    }

    await service.save();
  }

  return attendance;
};

// =====================================
// Record Bulk Attendance
// =====================================

const recordBulkAttendance = async (
  churchId,
  userId,
  data,
) => {
  const {
    serviceId,
    attendance,
  } = data;

  if (
    !serviceId ||
    !attendance ||
    !Array.isArray(attendance) ||
    attendance.length === 0
  ) {
    throw new ApiError(
      400,
      "Service and attendance records are required.",
    );
  }

  // =====================================
  // Validate Attendance State
  // =====================================

  const { service } =
    await validateAttendanceIsOpen(
      churchId,
      serviceId,
    );

  const createdAttendance = [];

  // =====================================
  // Process Records
  // =====================================

  for (const record of attendance) {
    const {
      memberId,
      status = "PRESENT",
      checkInMethod = "MANUAL",
      notes = "",
    } = record;

    // -------------------------------------
    // Validate Member
    // -------------------------------------

    const member =
      await Member.findOne({
        _id: memberId,
        churchId,
        isActive: true,
      });

    if (!member) {
      continue;
    }

    // -------------------------------------
    // Prevent Duplicate
    // -------------------------------------

    const exists =
      await Attendance.findOne({
        churchId,
        serviceId,
        memberId,
      });

    if (exists) {
      continue;
    }

    // -------------------------------------
    // Create Record
    // -------------------------------------

    const attendanceRecord =
      await Attendance.create({
        churchId,

        serviceId,

        memberId,

        personType: "MEMBER",

        status,

        checkInMethod,

        recordedBy: userId,

        checkedInAt: new Date(),

        notes,
      });

    createdAttendance.push(
      attendanceRecord,
    );

    // -------------------------------------
    // Update Statistics
    // -------------------------------------

    if (status === "PRESENT") {
      member.lastAttendance =
        attendanceRecord.checkedInAt;

      await member.save();

      service.totalAttendance =
        (service.totalAttendance || 0) +
        1;

      if (
        member.membershipStatus ===
        "FIRST_TIMER"
      ) {
        service.firstTimers =
          (service.firstTimers || 0) +
          1;
      }

      if (
        member.membershipStatus ===
        "MEMBER"
      ) {
        service.membersPresent =
          (service.membersPresent || 0) +
          1;
      }

      if (
        member.membershipStatus ===
        "WORKER"
      ) {
        service.workersPresent =
          (service.workersPresent || 0) +
          1;
      }
    }
  }

  await service.save();

  return {
    created:
      createdAttendance.length,

    attendance:
      createdAttendance,
  };
};

// =====================================
// Get Attendance For Service
// =====================================

const getServiceAttendance = async (
  churchId,
  serviceId,
) => {
  return Attendance.find({
    churchId,
    serviceId,
  })
    .populate(
      "memberId",
      "firstName lastName phone membershipStatus",
    )
    .populate(
      "visitorId",
      "firstName lastName phone email status source",
    )
    .populate(
      "recordedBy",
      "firstName lastName",
    )
    .sort({
      checkedInAt: 1,
    });
};

// =====================================
// Get Attendance For Member
// =====================================

const getMemberAttendance = async (
  churchId,
  memberId,
) => {
  return Attendance.find({
    churchId,
    memberId,
  })
    .populate(
      "serviceId",
      "title serviceDate serviceType",
    )
    .sort({
      checkedInAt: -1,
    });
};

// =====================================
// Update Attendance
// =====================================

const updateAttendance = async (
  churchId,
  attendanceId,
  data,
) => {
  const attendance =
    await Attendance.findOneAndUpdate(
      {
        _id: attendanceId,
        churchId,
      },
      {
        ...data,
      },
      {
        new: true,
        runValidators: true,
      },
    );

  if (!attendance) {
    throw new ApiError(
      404,
      "Attendance record not found.",
    );
  }

  return attendance;
};

// =====================================
// Delete Attendance
// =====================================

const deleteAttendance = async (
  churchId,
  attendanceId,
) => {
  const attendance =
    await Attendance.findOneAndDelete({
      _id: attendanceId,
      churchId,
    });

  if (!attendance) {
    throw new ApiError(
      404,
      "Attendance record not found.",
    );
  }

  return attendance;
};

// =====================================
// Get All Attendance
// =====================================

const getAttendance = async (
  churchId,
) => {
  return Attendance.find({
    churchId,
  })
    .populate(
      "memberId",
      "firstName lastName phone membershipStatus",
    )
    .populate(
      "visitorId",
      "firstName lastName phone email status source",
    )
    .populate(
      "serviceId",
      "title serviceDate serviceType",
    )
    .populate(
      "recordedBy",
      "firstName lastName",
    )
    .sort({
      checkedInAt: -1,
    });
};

// =====================================
// Export
// =====================================

export default {
  checkInMember,

  getLiveAttendance,

  recordAttendance,

  recordBulkAttendance,

  getAttendance,

  getServiceAttendance,

  getMemberAttendance,

  updateAttendance,

  deleteAttendance,
};