import { AxiosResponse } from 'axios'
import axios from '../configs/axiosAuth'
import { IAccountItem } from '../interfaces'

class AccountService {

    static async create(type: ('SAVINGS' | 'CURRENT'), userId: string): Promise<AxiosResponse<IAccountItem>> {

        return await axios.post("/account/create", { type, userId }, {
            headers: {
                'x-client-id': userId
            }
        })
    }

    static async getAll(type: ('SAVINGS' | 'CURRENT'), userId: string) {

        return await axios.get(`account/${type}`, {
            headers: {
                'x-client-id': userId
            }
        })
    }
}

export default AccountService