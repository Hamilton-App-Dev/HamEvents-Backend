import { Request, Response } from "express";
import createUser from "../util/createUser";
import getUserFromDatabase from "../util/getUserFromDatabase";
import { Role } from "../types";

async function createUserRoute(req: Request, res: Response) {
    // get the http body
    const { deviceId }: { deviceId: string } = req.body;

    if (!deviceId) {
        return res.status(400).json({ message: "Incorrect body format" });
    }
    // create a userbody by adding random default stuff
    const defaultParams = {
        name: "",
        email: "",
        profile_img: "",
        role: Role.USER,
    };
    const userParams = { user_id: deviceId, ...defaultParams };
    // make post request
    try {
        await createUser(userParams);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Could not create user" });
    }
    return res.status(200).json({ message: "Create user success!" });
    // // handle errors
}

export default createUserRoute;
