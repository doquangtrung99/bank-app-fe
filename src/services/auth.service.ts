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
class AuthService {

    static async login({ email, password }: ILogin, signal: AbortSignal) {
        return await axios.post("/auth/login", {
            email,
            password
        }, {
            signal
        })
    }

    static async register({ name, email, password, identificationNumber, identificationType, mobileNumber, country, proofOfIdentity }: RegisterUser) {
        return await axios.post("/auth/register", {
            name,
            email,
            country,
            password,
            mobileNumber,
            identificationNumber,
            identificationType,
            proofOfIdentity
        })
    }

    static async validateToken(token: string): Promise<AxiosResponse<ValidateResponse>> {
        return await axios.post("/auth/validate", { token });
    }

    refreshToken() {

    }

}

export default AuthService