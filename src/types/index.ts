export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}

export interface UserBody {
    name: string;
    email: string;
    user_id: string;
    profile_img: string;
    role: Role;
}
