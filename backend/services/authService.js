import bcrypt from "bcryptjs";
import slugify from "slugify";

import Church from "../models/Church.js";
import User from "../models/User.js";
import Role from "../models/Role.js";

import generateToken from "../utils/generateToken.js";
import createDefaultRoles from "../utils/defaultRoles.js";
import ApiError from "../utils/ApiError.js";

// =====================================
// Register Church
// =====================================

const registerChurch = async (data) => {
  const {
    churchName,
    churchEmail,
    churchPhone,
    churchAddress,
    firstName,
    lastName,
    email,
    password,
  } = data;

  // =====================================
  // Validate
  // =====================================

  if (
    !churchName ||
    !churchEmail ||
    !churchPhone ||
    !churchAddress ||
    !firstName ||
    !lastName ||
    !email ||
    !password
  ) {
    throw new ApiError(400, "All fields are required.");
  }

  // =====================================
  // Existing User
  // =====================================

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(400, "User already exists.");
  }

  // =====================================
  // Generate Church Slug
  // =====================================

  const baseSlug = slugify(churchName, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;

  let counter = 1;

  while (
    await Church.findOne({
      slug,
    })
  ) {
    slug = `${baseSlug}-${counter}`;

    counter++;
  }

  // =====================================
  // Create Church
  // =====================================

  const church = await Church.create({
    name: churchName,
    slug,
    email: churchEmail,
    phone: churchPhone,
    address: churchAddress,
  });

  // =====================================
  // Create Default Roles
  // =====================================

  const { administratorRole } =
    await createDefaultRoles(church._id);

  if (!administratorRole) {
    throw new ApiError(
      500,
      "Unable to create administrator role.",
    );
  }

  // =====================================
  // Hash Password
  // =====================================

  const hashedPassword =
    await bcrypt.hash(password, 10);

  // =====================================
  // Create First User
  // =====================================

  const user = await User.create({
    churchId: church._id,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    roleId: administratorRole._id,
  });

  // =====================================
  // Populate User
  // =====================================

  const populatedUser =
    await User.findById(user._id).populate(
      "roleId",
    );

  // =====================================
  // Generate Token
  // =====================================

  const token =
    generateToken(populatedUser);

  // =====================================
  // Response
  // =====================================

  return {
    token,

    church: {
      id: church._id,
      name: church.name,
      slug: church.slug,
      logo: church.logo || "",
    },

    user: {
      id: populatedUser._id,
      firstName: populatedUser.firstName,
      lastName: populatedUser.lastName,
      email: populatedUser.email,
      role: populatedUser.roleId.name,
      churchId: populatedUser.churchId,
    },
  };
};

// =====================================
// Login User
// =====================================

const loginUser = async (data) => {
  const { email, password } = data;

  // =====================================
  // Validate
  // =====================================

  if (!email || !password) {
    throw new ApiError(
      400,
      "Email and password are required.",
    );
  }

  // =====================================
  // Find User
  // =====================================

  const user = await User.findOne({
    email,
  }).populate("roleId");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password.",
    );
  }

  // =====================================
  // Check Active Account
  // =====================================

  if (!user.isActive) {
    throw new ApiError(
      403,
      "Your account has been deactivated.",
    );
  }

  // =====================================
  // Validate Password
  // =====================================

  const isPasswordValid =
    await bcrypt.compare(
      password,
      user.password,
    );

  if (!isPasswordValid) {
    throw new ApiError(
      401,
      "Invalid email or password.",
    );
  }

  // =====================================
  // Repair Missing Role
  // =====================================

  if (!user.roleId) {
    let administratorRole =
      await Role.findOne({
        churchId: user.churchId,
        name: "Administrator",
        isActive: true,
      });

    // =====================================
    // Create Missing Default Roles
    // =====================================

    if (!administratorRole) {
      const result =
        await createDefaultRoles(
          user.churchId,
        );

      administratorRole =
        result.administratorRole;
    }

    // =====================================
    // Safety Check
    // =====================================

    if (!administratorRole) {
      throw new ApiError(
        500,
        "Unable to assign administrator role.",
      );
    }

    // =====================================
    // Assign Role
    // =====================================

    user.roleId =
      administratorRole._id;
  }

  // =====================================
  // Update Last Login
  // =====================================

  user.lastLogin = new Date();

  await user.save();

  // =====================================
  // Populate Role
  // =====================================

  await user.populate("roleId");

  // =====================================
  // Find Church
  // =====================================

  const church = await Church.findById(
    user.churchId,
  );

  if (!church) {
    throw new ApiError(
      404,
      "Church associated with this account was not found.",
    );
  }

  // =====================================
  // Generate Token
  // =====================================

  const token =
    generateToken(user);

  // =====================================
  // Response
  // =====================================

  return {
    token,

    church: {
      id: church._id,
      name: church.name,
      slug: church.slug,
      logo: church.logo || "",
    },

    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.roleId.name,
      churchId: user.churchId,
    },
  };
};

export default {
  registerChurch,
  loginUser,
};