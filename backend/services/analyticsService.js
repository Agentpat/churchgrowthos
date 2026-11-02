import mongoose from "mongoose";

import Member from "../models/Member.js";
import Visitor from "../models/Visitor.js";
import Service from "../models/Service.js";
import Attendance from "../models/Attendance.js";
import FollowUp from "../models/FollowUp.js";
import Offering from "../models/Offering.js";
import Expense from "../models/Expense.js";

// Dashboard analytics
const getDashboardAnalytics = async (churchId) => {
  const churchObjectId = new mongoose.Types.ObjectId(churchId);

  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  // =========================
  // MEMBERS
  // =========================

  const totalMembers = await Member.countDocuments({
    churchId,
    isActive: true,
  });

  const newMembersThisMonth = await Member.countDocuments({
    churchId,
    isActive: true,
    createdAt: {
      $gte: startOfMonth,
    },
  });

  // =========================
  // VISITORS
  // =========================

  const totalVisitors = await Visitor.countDocuments({
    churchId,
    isActive: true,
  });

  const convertedVisitors = await Visitor.countDocuments({
    churchId,
    convertedToMember: true,
    isActive: true,
  });

  const visitorConversionRate =
    totalVisitors === 0
      ? 0
      : Number(((convertedVisitors / totalVisitors) * 100).toFixed(2));

  // =========================
  // SERVICES
  // =========================

  const totalServices = await Service.countDocuments({
    churchId,
    isActive: true,
  });

  // =========================
  // ATTENDANCE SUMMARY
  // =========================

  const totalAttendanceRecords = await Attendance.countDocuments({
    churchId,
    status: "PRESENT",
  });

  const attendanceAggregation = await Attendance.aggregate([
    {
      $match: {
        churchId: churchObjectId,
        status: "PRESENT",
      },
    },
    {
      $group: {
        _id: "$serviceId",
        attendanceCount: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: null,
        averageAttendance: {
          $avg: "$attendanceCount",
        },
        totalAttendance: {
          $sum: "$attendanceCount",
        },
        servicesWithAttendance: {
          $sum: 1,
        },
      },
    },
  ]);

  const attendanceData = attendanceAggregation[0] || {
    averageAttendance: 0,
    totalAttendance: 0,
    servicesWithAttendance: 0,
  };

  // =========================
  // ATTENDANCE TREND
  // =========================

  const attendanceTrend = await Attendance.aggregate([
    {
      $match: {
        churchId: churchObjectId,
        status: "PRESENT",
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
      },
    },
    {
      $unwind: "$service",
    },
    {
      $group: {
        _id: {
          week: {
            $week: "$service.serviceDate",
          },
          year: {
            $year: "$service.serviceDate",
          },
        },
        attendance: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.week": 1,
      },
    },
  ]);

  const formattedAttendanceTrend = attendanceTrend.map((item) => ({
    label: `Week ${item._id.week}`,
    value: item.attendance,
  }));

  let attendanceGrowth = 0;

  if (formattedAttendanceTrend.length >= 2) {
    const previous =
      formattedAttendanceTrend[formattedAttendanceTrend.length - 2].value;

    const current =
      formattedAttendanceTrend[formattedAttendanceTrend.length - 1].value;

    if (previous > 0) {
      attendanceGrowth = Number(
        (((current - previous) / previous) * 100).toFixed(1),
      );
    }
  }

  // =========================
  // MEMBER ENGAGEMENT
  // =========================

  const activeMemberIds = await Attendance.distinct("memberId", {
    churchId,
    status: "PRESENT",
    checkedInAt: {
      $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    },
  });

  const activeMembers = activeMemberIds.length;

  const inactiveMembers = await Member.countDocuments({
    churchId,
    isActive: true,
    _id: {
      $nin: activeMemberIds,
    },
  });

  const engagementRate =
    totalMembers === 0
      ? 0
      : Number(((activeMembers / totalMembers) * 100).toFixed(1));

  // =========================
  // INSIGHTS
  // =========================

  const strongestService = await Attendance.aggregate([
    {
      $match: {
        churchId: churchObjectId,
        status: "PRESENT",
      },
    },
    {
      $lookup: {
        from: "services",
        localField: "serviceId",
        foreignField: "_id",
        as: "service",
      },
    },
    {
      $unwind: "$service",
    },
    {
      $group: {
        _id: "$service._id",
        title: {
          $first: "$service.title",
        },
        attendance: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        attendance: -1,
      },
    },
    {
      $limit: 1,
    },
  ]);

  const firstTimersPendingFollowUp = await Visitor.countDocuments({
    churchId,
    convertedToMember: false,
    isActive: true,
  });

  // =========================
  // FOLLOW UPS
  // =========================

  const pendingFollowUps = await FollowUp.countDocuments({
    churchId,
    status: "PENDING",
    isActive: true,
  });

  const completedFollowUps = await FollowUp.countDocuments({
    churchId,
    status: "SENT",
    isActive: true,
  });

  const totalFollowUps = pendingFollowUps + completedFollowUps;

  const followUpCompletionRate =
    totalFollowUps === 0
      ? 0
      : Number(((completedFollowUps / totalFollowUps) * 100).toFixed(1));

  // =========================
  // CHURCH HEALTH SCORE
  // =========================

  const attendanceScore =
    totalMembers === 0
      ? 0
      : Math.min(
          100,
          Math.round((attendanceData.averageAttendance / totalMembers) * 100),
        );

  const engagementScore = engagementRate;

  const visitorScore = visitorConversionRate;

  const followUpScore = followUpCompletionRate;

  const growthScore = Math.max(0, Math.min(100, 50 + attendanceGrowth));

  const overallHealthScore = Math.round(
    (attendanceScore +
      engagementScore +
      visitorScore +
      followUpScore +
      growthScore) /
      5,
  );

  let healthStatus = "Needs Attention";

  if (overallHealthScore >= 80) {
    healthStatus = "Healthy";
  } else if (overallHealthScore >= 60) {
    healthStatus = "Growing";
  } else if (overallHealthScore >= 40) {
    healthStatus = "Recovering";
  }

  const strengths = [];

  if (attendanceScore >= 80) strengths.push("Attendance is healthy");

  if (engagementScore >= 80) strengths.push("Members are actively engaged");

  if (visitorScore >= 70) strengths.push("Visitors are converting well");

  if (followUpScore >= 80) strengths.push("Excellent follow-up culture");

  if (growthScore >= 70) strengths.push("Attendance is growing steadily");

  const recommendations = [];

  if (attendanceScore < 60)
    recommendations.push("Encourage members to attend services consistently.");

  if (engagementScore < 60) recommendations.push("Reconnect inactive members.");

  if (visitorScore < 60)
    recommendations.push("Improve first-time visitor conversion.");

  if (followUpScore < 70)
    recommendations.push("Complete outstanding follow-ups.");

  if (growthScore < 50)
    recommendations.push("Increase outreach and evangelism efforts.");

  // =========================
  // FINANCE
  // =========================

  const financeAggregation = await Offering.aggregate([
    {
      $match: {
        churchId: churchObjectId,
        isActive: true,
      },
    },
    {
      $group: {
        _id: null,
        totalIncome: {
          $sum: "$amount",
        },
        transactions: {
          $sum: 1,
        },
      },
    },
  ]);

  const financeData = financeAggregation[0] || {
    totalIncome: 0,
    transactions: 0,
  };

  const expenseAggregation = await Expense.aggregate([
    {
      $match: {
        churchId: churchObjectId,
        isActive: true,
      },
    },
    {
      $group: {
        _id: null,
        totalExpenses: {
          $sum: "$amount",
        },
        transactions: {
          $sum: 1,
        },
      },
    },
  ]);

  const expenseData = expenseAggregation[0] || {
    totalExpenses: 0,
    transactions: 0,
  };

  // =========================
  // RESPONSE
  // =========================

  return {
    members: {
      total: totalMembers,
      newThisMonth: newMembersThisMonth,
    },

    engagement: {
      totalMembers,
      activeMembers,
      inactiveMembers,
      engagementRate,
      newMembers: newMembersThisMonth,
    },

    visitors: {
      total: totalVisitors,
      converted: convertedVisitors,
      conversionRate: visitorConversionRate,
    },

    services: {
      total: totalServices,
    },

    attendance: {
      records: totalAttendanceRecords,
      average: Math.round(attendanceData.averageAttendance || 0),
      total: attendanceData.totalAttendance || 0,
      trend: formattedAttendanceTrend,
      growth: attendanceGrowth,
    },

    insights: {
      strongestService: strongestService[0] || null,
      firstTimersPendingFollowUp,
      inactiveMembers,
    },

    followUps: {
      pending: pendingFollowUps,
      completed: completedFollowUps,
      completionRate: followUpCompletionRate,
    },

    churchHealth: {
      score: overallHealthScore,
      status: healthStatus,
      attendanceScore,
      engagementScore,
      visitorScore,
      followUpScore,
      growthScore,
      strengths,
      recommendations,
    },

    finance: {
      income: financeData.totalIncome,
      expenses: expenseData.totalExpenses,
      balance: financeData.totalIncome - expenseData.totalExpenses,
      incomeTransactions: financeData.transactions,
      expenseTransactions: expenseData.transactions,
    },
  };
};

export default {
  getDashboardAnalytics,
};
