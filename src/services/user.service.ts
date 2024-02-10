import axios from '../configs/axiosAuth'
class UserSerivce {
    static async getOne(userId: string) {

        return await axios.get(`/user/${userId}`)
    }
}

export default UserSerivce