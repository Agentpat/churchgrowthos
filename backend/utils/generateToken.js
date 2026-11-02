import jwt from "jsonwebtoken";

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,

      churchId: user.churchId,

      role: user.roleId?.name,

      permissions: user.roleId?.permissions || [],
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    },
  );
};

export default generateToken;
