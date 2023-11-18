import type { Users } from "@prisma/client";
import prisma from "./prismaClient";
import { UserBody } from "../types";

async function createUser(body: UserBody) {
    const user: Users | null = await prisma.users.create({
        data: body,
    });
}

export default createUser;
