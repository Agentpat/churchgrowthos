import AttendanceSession from "../models/AttendanceSession.js";
import Service from "../models/Service.js";
import ApiError from "../utils/ApiError.js";

// =====================================
// Get Or Create Session
// =====================================

const getOrCreateSession = async (
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

  let session =
    await AttendanceSession.findOne({
      churchId,
      serviceId,
    });

  if (!session) {
    session =
      await AttendanceSession.create({
        churchId,
        serviceId,
        status: "NOT_STARTED",
      });
  }

  return session;
};

// =====================================
// Get Active Session
// =====================================

const getActiveSession = async (
  churchId,
  serviceId,
) => {
  const session =
    await AttendanceSession.findOne({
      churchId,
      serviceId,
    })
      .populate(
        "serviceId",
        "title serviceDate serviceType status startTime endTime",
      )
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
      );

  return session;
};

// =====================================
// Open Attendance Session
// =====================================
//
// IMPORTANT:
//
// Attendance can ONLY be opened when
// the associated service is LIVE.
//
// SCHEDULED services cannot have an
// attendance session opened.
//
// =====================================

const openSession = async (
  churchId,
  serviceId,
  userId,
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

  // =====================================
  // Service Must Be LIVE
  // =====================================

  if (service.status !== "LIVE") {
    if (
      service.status === "SCHEDULED"
    ) {
      throw new ApiError(
        400,
        "Attendance cannot be opened until the service is live.",
      );
    }

    if (
      service.status === "COMPLETED"
    ) {
      throw new ApiError(
        400,
        "Attendance cannot be opened for a completed service.",
      );
    }

    if (
      service.status === "CANCELLED"
    ) {
      throw new ApiError(
        400,
        "Attendance cannot be opened for a cancelled service.",
      );
    }

    throw new ApiError(
      400,
      "Attendance cannot be opened for this service.",
    );
  }

  const session =
    await getOrCreateSession(
      churchId,
      serviceId,
    );

  // =====================================
  // Already Open
  // =====================================

  if (session.status === "OPEN") {
    throw new ApiError(
      400,
      "Attendance is already open for this service.",
    );
  }

  // =====================================
  // Closed Sessions Cannot Reopen
  // =====================================

  if (session.status === "CLOSED") {
    throw new ApiError(
      400,
      "This attendance session has already been closed.",
    );
  }

  // =====================================
  // Finalized Sessions Cannot Reopen
  // =====================================

  if (
    session.status === "FINALIZED"
  ) {
    throw new ApiError(
      400,
      "This attendance session has already been finalized.",
    );
  }

  // =====================================
  // Open Session
  // =====================================

  session.status = "OPEN";

  session.startedAt = new Date();

  session.closedAt = null;

  session.finalizedAt = null;

  session.openedBy = userId;

  session.closedBy = null;

  session.finalizedBy = null;

  await session.save();

  return session;
};

// =====================================
// Close Attendance Session
// =====================================

const closeSession = async (
  churchId,
  serviceId,
  userId,
) => {
  const session =
    await AttendanceSession.findOne({
      churchId,
      serviceId,
    });

  if (!session) {
    throw new ApiError(
      404,
      "Attendance session not found.",
    );
  }

  // =====================================
  // Must Be Open
  // =====================================

  if (session.status !== "OPEN") {
    throw new ApiError(
      400,
      "Only an open attendance session can be closed.",
    );
  }

  // =====================================
  // Close
  // =====================================

  session.status = "CLOSED";

  session.closedAt = new Date();

  session.closedBy = userId;

  await session.save();

  return session;
};

// =====================================
// Finalize Attendance Session
// =====================================

const finalizeSession = async (
  churchId,
  serviceId,
  userId,
) => {
  const session =
    await AttendanceSession.findOne({
      churchId,
      serviceId,
    });

  if (!session) {
    throw new ApiError(
      404,
      "Attendance session not found.",
    );
  }

  // =====================================
  // Must Be Closed
  // =====================================

  if (session.status !== "CLOSED") {
    throw new ApiError(
      400,
      "Attendance must be closed before it can be finalized.",
    );
  }

  // =====================================
  // Finalize
  // =====================================

  session.status = "FINALIZED";

  session.finalizedAt = new Date();

  session.finalizedBy = userId;

  await session.save();

  return session;
};

// =====================================
// Export
// =====================================

export default {
  getOrCreateSession,
  getActiveSession,
  openSession,
  closeSession,
  finalizeSession,
};