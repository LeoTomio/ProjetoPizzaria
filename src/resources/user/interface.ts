interface PayLoad {
    sub: string
}


interface UserRequest {
    name: string;
    email: string;
    password: string;
}

interface AuthRequest {
    email: string;
    password: string
}

export { PayLoad, UserRequest, AuthRequest }