import { AxiosResponse } from "axios";
import axios from "../configs/axiosAuth"
import { RegisterUser } from "../interfaces"

interface ValidateResponse {
    userId: string,
    username: string,
    email: string,
    role: string,
    iat: number,
    exp: number
}

interface ILogin {
    email: string,
    password: string
}

interface IRefreshToken {
    accessToken: string
}
class AuthService {

    static async login({ email, password }: ILogin, signal?: AbortSignal) {
        return await axios.post("/auth/login", { email, password }, { signal })
    }

    static async register(registerData: RegisterUser, signal?: AbortSignal) {
        return await axios.post("/auth/register", { ...registerData }, { signal })
    }

    static async validateToken(token: string, userId: string, signal?: AbortSignal): Promise<AxiosResponse<ValidateResponse>> {
        return await axios.post("/auth/validate", { token },
            {
                signal,
                headers: {
                    'x-client-id': userId
                }
            })
    };

    static async refreshToken(token: string, userId: string, signal?: AbortSignal): Promise<AxiosResponse<IRefreshToken>> {
        return await axios.post("/auth/refreshToken", {},
            {
                signal,
                headers: {
                    "Authorization": token,
                    'x-client-id': userId
                }
            })
    };

}

export default AuthService