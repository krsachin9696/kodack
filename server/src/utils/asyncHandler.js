import logger from "./logger.js";

const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        logger.error('Error: ', error);
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}

export default asyncHandler;