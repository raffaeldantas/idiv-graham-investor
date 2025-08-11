export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
}

export interface AuthToken {
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
    tokenType: string;
}