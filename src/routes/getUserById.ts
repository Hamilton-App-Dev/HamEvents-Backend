import { Request, Response } from "express";
import getUserFromDatabase from "../util/getUserFromDatabase";

async function getUserById(req: Request, res: Response) {
    // get id from url params
    const { deviceId } = req.params;
    // get it from database
    const user = await getUserFromDatabase(deviceId);
    // handle error and etc
    if (!user) {
        return res.status(404).json({ message: "User not found" }).send();
    }
    console.log(user);
    return res.status(200).json({ user: user });
}

export default getUserById;
