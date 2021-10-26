import prismaClient from "../prisma";

class ProfileUserService {

    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                user_id: user_id
            }
        });

        return user;
    }
}

export { ProfileUserService }
