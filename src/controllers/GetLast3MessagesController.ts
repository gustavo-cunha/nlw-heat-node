import { Request, Response } from "express";
import {GetLast3MessagesService} from "../services/GetLast3MessagesService";

class GetLast3MessagesController {
    async handle(req: Request, res: Response) {
        try {
            const service = new GetLast3MessagesService();
            const result = await service.execute();
            return res.json({erro: 0, msg: '', result});
        } catch (err) {
            return res.json({erro: 1, msg: err.message});
        }
    }
}

export { GetLast3MessagesController }
