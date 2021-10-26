import axios from "axios";
import prismaClient from "../prisma";
import { sign } from "jsonwebtoken";

interface IGithubAccessToken {
    access_token: string;
}
interface IGithubUser {
    id: number;
    login: string;
    name: string;
    avatar_url: string;
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = 'https://github.com/login/oauth/access_token';

        const { data } = await axios.post<IGithubAccessToken>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            headers: {
                "Accept": "application/json"
            }
        });

        const res = await axios.get<IGithubUser>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${data.access_token}`
            }
        });

        const { id, login, avatar_url, name } = res.data;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        });

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    name,
                    login,
                    avatar_url,
                    github_id: id,
                }
            });
        }

        const token = sign(
            {
                user: {
                    id: user.user_id,
                    name: user.name,
                    avatar_url: user.avatar_url
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user.user_id,
                expiresIn: "1d"
            }
        );

        return { token, user };
    }
}

export { AuthenticateUserService };
