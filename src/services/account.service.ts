import axios from '../configs/axiosAuth'

class AccountService {

    static async create(type: ('SAVINGS' | 'CURRENT'), userId: string) {

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