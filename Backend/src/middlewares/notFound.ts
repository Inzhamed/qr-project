import { Request, Response, NextFunction } from 'express';

const notFoundMiddleware = () => {
    return (res: Response) => {
        res.status(400).json({ message: "Route doesn't exist" });
    };
};

export default notFoundMiddleware;
