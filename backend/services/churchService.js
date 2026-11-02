import ChurchProfile from "../models/ChurchProfile.js";
import ApiError from "../utils/ApiError.js";

const MAX_LOGO_SIZE = 100 * 1024;

const ALLOWED_LOGO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const validateLogo = (logo) => {
  if (!logo) {
    return;
  }

  if (typeof logo !== "string" || !logo.startsWith("data:image/")) {
    throw new ApiError(400, "Church logo must be an uploaded image.");
  }

  const match = logo.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);

  if (!match) {
    throw new ApiError(400, "Invalid church logo format.");
  }

  const mimeType = match[1];
  const base64Data = match[2];

  if (!ALLOWED_LOGO_TYPES.includes(mimeType)) {
    throw new ApiError(400, "Logo must be a JPG, PNG, WEBP, or GIF image.");
  }

  const imageBuffer = Buffer.from(base64Data, "base64");

  if (imageBuffer.length > MAX_LOGO_SIZE) {
    throw new ApiError(400, "Church logo must not exceed 100 KB.");
  }

  return logo;
};

// =====================================
// Get Church Profile
// =====================================

const getChurchProfile = async (churchId) => {
  const profile = await ChurchProfile.findOne({
    churchId,
  });

  if (!profile) {
    throw new ApiError(404, "Church profile not found.");
  }

  return profile;
};

// =====================================
// Create Church Profile
// =====================================

const createChurchProfile = async (churchId, data) => {
  const existingProfile = await ChurchProfile.findOne({
    churchId,
  });

  if (existingProfile) {
    throw new ApiError(400, "Church profile already exists.");
  }

  const profileData = {
    ...data,
  };

  if (profileData.logo) {
    validateLogo(profileData.logo);
  }

  const profile = await ChurchProfile.create({
    churchId,
    ...profileData,
  });

  return profile;
};

// =====================================
// Update Church Profile
// =====================================

const updateChurchProfile = async (churchId, data) => {
  const updateData = {
    ...data,
  };

  if (Object.prototype.hasOwnProperty.call(updateData, "logo")) {
    if (updateData.logo) {
      validateLogo(updateData.logo);
    }
  }

  const profile = await ChurchProfile.findOneAndUpdate(
    {
      churchId,
    },
    {
      $set: updateData,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!profile) {
    throw new ApiError(404, "Church profile not found.");
  }

  return profile;
};

export default {
  getChurchProfile,
  createChurchProfile,
  updateChurchProfile,
};
