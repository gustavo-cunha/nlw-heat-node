import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
    async handle(req: Request, res: Response) {
        const { code } = req.body;

        try {
            const service = new AuthenticateUserService();
            const result = await service.execute(code);
            return res.json({erro: 0, msg: '', result});
        } catch (err) {
            return res.json({erro: 1, msg: err.message});
        }
    }
}

export { AuthenticateUserController }