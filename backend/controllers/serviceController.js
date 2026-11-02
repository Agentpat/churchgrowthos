import serviceService from "../services/serviceService.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Create Service
// @route   POST /api/services
// @access  Private
const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.createService(
    req.user.churchId,
    req.user.userId,
    req.body,
  );

  res.status(201).json({
    success: true,
    message: "Service created successfully.",
    data: service,
  });
});

// @desc    Get Services
// @route   GET /api/services
// @access  Private
const getServices = asyncHandler(async (req, res) => {
  const result = await serviceService.getServices(req.user.churchId, req.query);

  res.status(200).json({
    success: true,
    data: result,
  });
});

// @desc    Get Single Service
// @route   GET /api/services/:id
// @access  Private
const getService = asyncHandler(async (req, res) => {
  const service = await serviceService.getServiceById(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,
    data: service,
  });
});

// @desc    Update Service
// @route   PUT /api/services/:id
// @access  Private
const updateService = asyncHandler(async (req, res) => {
  const service = await serviceService.updateService(
    req.user.churchId,
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: "Service updated successfully.",
    data: service,
  });
});

// @desc    Delete Service
// @route   DELETE /api/services/:id
// @access  Private
const deleteService = asyncHandler(async (req, res) => {
  const service = await serviceService.deleteService(
    req.user.churchId,
    req.params.id,
  );

  res.status(200).json({
    success: true,
    message: "Service deleted successfully.",
    data: service,
  });
});

export { createService, getServices, getService, updateService, deleteService };
