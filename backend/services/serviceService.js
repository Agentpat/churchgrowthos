import Service from "../models/Service.js";
import ApiError from "../utils/ApiError.js";

// Create Service
const createService = async (churchId, userId, data) => {
  const { title, serviceType, serviceDate, startTime } = data;

  if (!title || !serviceType || !serviceDate || !startTime) {
    throw new ApiError(
      400,
      "Title, service type, service date and start time are required.",
    );
  }

  // Prevent duplicate services
  const existingService = await Service.findOne({
    churchId,
    serviceType,
    serviceDate: new Date(serviceDate),
    isActive: true,
  });

  if (existingService) {
    throw new ApiError(
      400,
      "A service of this type already exists on this date.",
    );
  }

  const service = await Service.create({
    ...data,
    churchId,
    createdBy: userId,
  });

  return service;
};

// Get Services
const getServices = async (churchId, queryParams) => {
  const {
    page = 1,
    limit = 20,
    search = "",
    serviceType,
    status,
  } = queryParams;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const filter = {
    churchId,
    isActive: true,
  };

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (serviceType) {
    filter.serviceType = serviceType;
  }

  if (status) {
    filter.status = status;
  }

  const services = await Service.find(filter)
    .sort({
      serviceDate: -1,
      createdAt: -1,
    })
    .skip(skip)
    .limit(limitNumber);

  const total = await Service.countDocuments(filter);

  return {
    services,

    pagination: {
      total,

      page: pageNumber,

      limit: limitNumber,

      pages: Math.ceil(total / limitNumber),
    },
  };
};

// Get Single Service
const getServiceById = async (churchId, serviceId) => {
  const service = await Service.findOne({
    _id: serviceId,
    churchId,
    isActive: true,
  });

  if (!service) {
    throw new ApiError(404, "Service not found.");
  }

  return service;
};

// Update Service
const updateService = async (churchId, serviceId, data) => {
  const service = await Service.findOneAndUpdate(
    {
      _id: serviceId,
      churchId,
      isActive: true,
    },

    {
      $set: data,
    },

    {
      new: true,
      runValidators: true,
    },
  );

  if (!service) {
    throw new ApiError(404, "Service not found.");
  }

  return service;
};

// Soft Delete Service
const deleteService = async (churchId, serviceId) => {
  const service = await Service.findOneAndUpdate(
    {
      _id: serviceId,
      churchId,
      isActive: true,
    },

    {
      isActive: false,
    },

    {
      new: true,
    },
  );

  if (!service) {
    throw new ApiError(404, "Service not found.");
  }

  return service;
};

export default {
  createService,

  getServices,

  getServiceById,

  updateService,

  deleteService,
};
