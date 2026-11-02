import ApiError from "../utils/ApiError.js";

const authorize = (...requiredPermissions) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Authentication required.");
    }

    console.log("");
    console.log("========== PERMISSION CHECK ==========");
    console.log("USER ID:", req.user.userId);
    console.log("CHURCH ID:", req.user.churchId);
    console.log("ROLE:", req.user.role);
    console.log("USER PERMISSIONS:", req.user.permissions);
    console.log("REQUIRED PERMISSIONS:", requiredPermissions);
    console.log("REQUEST:", req.method, req.originalUrl);
    console.log("======================================");
    console.log("");

    const userPermissions = req.user.permissions || [];

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ApiError(
        403,
        "You do not have permission to perform this action.",
      );
    }

    next();
  };
};

export default authorize;
