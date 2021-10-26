import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IJWTPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ erro: 1, msg: "Token is invalid." });
    }

    const [, token] = authToken.split(' ');

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IJWTPayload;
        req.user_id = sub;

        return next();

    } catch (error) {
        return res.status(401).json({ erro: 1, msg: "Token is expired" });
    }
}
