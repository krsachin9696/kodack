import { ApiError } from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
    // If the error is an instance of ApiError, use its properties
    if (err instanceof ApiError) {
        return res.status(err.statusCode || 500).json({
            success: err.success || false,
            message: err.message || "Something went wrong",
            errors: err.errors || [],
            stack: process.env.NODE_ENV === 'production' ? null : err.stack, // hide stack in production
        });
    }

    // For other types of errors, send a generic error response
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        errors: [err.message],
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { errorHandler };
