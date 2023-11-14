import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomError from '../interfaces/customError';

const errorHandlerMiddleware = () => {
    return (error: CustomError, res: Response) => {
        const defaultError = {
            statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Something went wrong, try again later",
        };

        if (error.name === "ValidationError") {
            defaultError.statusCode = StatusCodes.BAD_REQUEST;
            defaultError.message = Object.values(error.errors)
                .map((item: any) => item.message)
                .join(", ");
        } else if (error.code && error.code === 11000) {
            defaultError.statusCode = StatusCodes.BAD_REQUEST;
            defaultError.message = `${Object.keys(
                error.keyValue
            )} field has to be unique`;
        } else {
            defaultError.message = error.errors;
        }

        res.status(defaultError.statusCode).json({
            error: defaultError,
        });
    };
};

export default errorHandlerMiddleware;
