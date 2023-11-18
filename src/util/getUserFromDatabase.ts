import type { Users } from "@prisma/client";
import prisma from "./prismaClient";

async function getUserFromDatabase(deviceId: string) {
    const user: Users | null = await prisma.users.findUnique({
        where: { user_id: deviceId },
    });
    return user;
}

export default getUserFromDatabase;
