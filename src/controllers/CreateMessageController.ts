import { Request, Response } from "express";
import {CreateMessageService} from "../services/CreateMessageService";

class CreateMessageController {
    async handle(req: Request, res: Response) {
        const { text } = req.body;
        const user_id = req.user_id;

        try {
            const service = new CreateMessageService();
            const result = await service.execute(text, user_id);
            return res.json({erro: 0, msg: '', result});
        } catch (err) {
            return res.json({erro: 1, msg: err.message});
        }
    }
}

export { CreateMessageController }
