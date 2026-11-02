import dotenv from "dotenv";

dotenv.config();

import connectDB from "../config/db.js";
import Role from "../models/Role.js";
import permissions from "../config/permissions.js";

// =====================================
// System Role Definitions
// =====================================

const roleDefinitions = {
  // =====================================
  // Administrator
  // =====================================

  Administrator: {
    description: "Full access to the entire Church Growth Operating System.",

    permissions: Object.values(permissions),
  },

  // =====================================
  // Pastor
  // =====================================

  Pastor: {
    description: "Church leadership with oversight of members and ministry.",

    permissions: [
      permissions.DASHBOARD_VIEW,

      // =================================
      // Members
      // =================================

      permissions.MEMBERS_VIEW,
      permissions.MEMBERS_CREATE,
      permissions.MEMBERS_UPDATE,

      // =================================
      // Visitors
      // =================================

      permissions.VISITORS_VIEW,
      permissions.VISITORS_CREATE,
      permissions.VISITORS_UPDATE,
      permissions.VISITORS_CONVERT,

      // =================================
      // Follow Ups
      // =================================

      permissions.FOLLOWUPS_VIEW,
      permissions.FOLLOWUPS_CREATE,
      permissions.FOLLOWUPS_UPDATE,

      // =================================
      // Attendance
      // =================================

      permissions.ATTENDANCE_VIEW,

      // =================================
      // Groups
      // =================================

      permissions.GROUPS_VIEW,

      // =================================
      // Staff
      // =================================

      permissions.STAFF_VIEW,
      permissions.STAFF_CREATE,
      permissions.STAFF_UPDATE,

      // =================================
      // Notes
      // =================================

      permissions.NOTES_VIEW,
      permissions.NOTES_CREATE,
      permissions.NOTES_UPDATE,

      // =================================
      // Activities
      // =================================

      permissions.ACTIVITIES_VIEW,

      // =================================
      // Analytics
      // =================================

      permissions.ANALYTICS_VIEW,

      // =================================
      // Reports
      // =================================

      permissions.REPORTS_VIEW,

      // =================================
      // Finance
      // =================================

      permissions.FINANCE_VIEW,
      permissions.FINANCE_CREATE,
      permissions.FINANCE_UPDATE,
    ],
  },

  // =====================================
  // Reception
  // =====================================

  Reception: {
    description: "Handles visitor registration and follow-up.",

    permissions: [
      permissions.DASHBOARD_VIEW,

      permissions.VISITORS_VIEW,
      permissions.VISITORS_CREATE,
      permissions.VISITORS_UPDATE,

      permissions.FOLLOWUPS_VIEW,
      permissions.FOLLOWUPS_CREATE,
      permissions.FOLLOWUPS_UPDATE,

      permissions.ATTENDANCE_VIEW,
      permissions.ATTENDANCE_CREATE,
    ],
  },

  // =====================================
  // Finance
  // =====================================

  Finance: {
    description: "Responsible for church giving and financial records.",

    permissions: [
      permissions.DASHBOARD_VIEW,

      permissions.FINANCE_VIEW,
      permissions.FINANCE_CREATE,
      permissions.FINANCE_UPDATE,
      permissions.FINANCE_DELETE,
      permissions.FINANCE_EXPORT,

      permissions.REPORTS_VIEW,
      permissions.REPORTS_EXPORT,
    ],
  },

  // =====================================
  // Attendance
  // =====================================

  Attendance: {
    description: "Responsible for attendance management.",

    permissions: [
      permissions.DASHBOARD_VIEW,

      permissions.ATTENDANCE_VIEW,
      permissions.ATTENDANCE_CREATE,
      permissions.ATTENDANCE_UPDATE,

      permissions.VISITORS_VIEW,
    ],
  },
};

// =====================================
// Sync System Roles
// =====================================

const syncDefaultRoles = async () => {
  try {
    await connectDB();

    console.log("");

    console.log("=====================================");

    console.log("SYNCING SYSTEM ROLES");

    console.log("=====================================");

    console.log("");

    // =================================
    // Process Each Role
    // =================================

    for (const [roleName, definition] of Object.entries(roleDefinitions)) {
      const result = await Role.updateMany(
        {
          name: roleName,

          isSystemRole: true,
        },

        {
          $set: {
            description: definition.description,

            permissions: definition.permissions,
          },
        },
      );

      console.log(`${roleName}: ${result.modifiedCount} role(s) updated.`);
    }

    console.log("");

    console.log("=====================================");

    console.log("ROLE SYNC COMPLETED");

    console.log("=====================================");

    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("");

    console.error("ROLE SYNC FAILED:");

    console.error(error);

    console.error("");

    process.exit(1);
  }
};

syncDefaultRoles();
