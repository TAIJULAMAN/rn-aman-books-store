export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: Date;
}

export interface AuthResponse {
    user: User;
    token: string;
}
