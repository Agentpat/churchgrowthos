import Role from "../models/Role.js";
import permissions from "../config/permissions.js";

// =====================================
// Create Default Roles
// =====================================

const createDefaultRoles = async (churchId) => {
  const roles = [
    // =====================================
    // Administrator
    // =====================================

    {
      name: "Administrator",

      description: "Full access to the entire Church Growth Operating System.",

      isSystemRole: true,

      permissions: Object.values(permissions),
    },

    // =====================================
    // Pastor
    // =====================================

    {
      name: "Pastor",

      description: "Church leadership with oversight of members and ministry.",

      isSystemRole: true,

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

    {
      name: "Reception",

      description: "Handles visitor registration and follow-up.",

      isSystemRole: true,

      permissions: [
        permissions.DASHBOARD_VIEW,

        // Visitors
        permissions.VISITORS_VIEW,
        permissions.VISITORS_CREATE,
        permissions.VISITORS_UPDATE,

        // Follow Ups
        permissions.FOLLOWUPS_VIEW,
        permissions.FOLLOWUPS_CREATE,
        permissions.FOLLOWUPS_UPDATE,

        // Attendance
        permissions.ATTENDANCE_VIEW,
        permissions.ATTENDANCE_CREATE,
      ],
    },

    // =====================================
    // Finance
    // =====================================

    {
      name: "Finance",

      description: "Responsible for church giving and financial records.",

      isSystemRole: true,

      permissions: [
        permissions.DASHBOARD_VIEW,

        // Finance
        permissions.FINANCE_VIEW,
        permissions.FINANCE_CREATE,
        permissions.FINANCE_UPDATE,
        permissions.FINANCE_DELETE,
        permissions.FINANCE_EXPORT,

        // Reports
        permissions.REPORTS_VIEW,
        permissions.REPORTS_EXPORT,
      ],
    },

    // =====================================
    // Attendance
    // =====================================

    {
      name: "Attendance",

      description: "Responsible for attendance management.",

      isSystemRole: true,

      permissions: [
        permissions.DASHBOARD_VIEW,

        // Attendance
        permissions.ATTENDANCE_VIEW,
        permissions.ATTENDANCE_CREATE,
        permissions.ATTENDANCE_UPDATE,

        // Visitors
        permissions.VISITORS_VIEW,
      ],
    },
  ];

  // =====================================
  // Create Roles
  // =====================================

  const createdRoles = await Role.insertMany(
    roles.map((role) => ({
      churchId,
      ...role,
    })),
  );

  // =====================================
  // Find Administrator
  // =====================================

  const administratorRole = createdRoles.find(
    (role) => role.name === "Administrator",
  );

  // =====================================
  // Return
  // =====================================

  return {
    administratorRole,

    roles: createdRoles,
  };
};

export default createDefaultRoles;
