interface DecodedToken {
    id: number;
    username: string;
    email: string;
    role: string;
    accountStatus: string;
    firstName: string;
    lastName: string;
    lastLoginDate: number;
}
interface DecodedRefreshToken {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    lastLoginDate: number;
    accessToken?: string;
}
export declare function decodeAccessToken(token: string): DecodedToken | null;
export declare function decodeRefreshToken(token: string): DecodedRefreshToken | null;
export {};
