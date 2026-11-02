import authService from "../services/authService.js";
import asyncHandler from "../utils/asyncHandler.js";


const register = asyncHandler(async (req, res) => {

    const result = await authService.registerChurch(req.body);

    return res.status(201).json({
        success: true,
        message: "Church registered successfully.",
        data: result,
    });

});

const login = asyncHandler(async (req, res) => {

    const result = await authService.loginUser(
        req.body
    );


    return res.status(200).json({

        success: true,

        message: "Login successful.",

        data: result,

    });

});

export {
    register,
    login,
};