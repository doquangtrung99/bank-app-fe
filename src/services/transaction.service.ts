import axios from "../configs/axiosAuth"
import { WithDraw, Deposit, Transfer } from "../interfaces"
class TransactionService {
    static async deposit({ accountId, type, amountMoney }: Deposit, userId: string) {
        return await axios.post('transaction/deposit', {
            accountId,
            type,
            amountMoney
        }, {
            headers: {
                'x-client-id': userId
            }
        })
    }

    static async withdraw(
        { accountId, type, amountMoney }: WithDraw, userId: string) {
        return await axios.post('transaction/withdraw', {
            accountId,
            type,
            amountMoney
        }, {
            headers: {
                'x-client-id': userId
            }
        })
    }

    static async transfer(
        {
            sender: { accountId: senderAccountId, type: senderType },
            receiver: { accountNumber: receiverAccountId, type: receiverType },
            amountMoney
        }: Transfer, userId: string) {
        return await axios.post('transaction/transfer', {
            sender: {
                accountId: senderAccountId,
                type: senderType
            },
            receiver: {
                accountNumber: receiverAccountId,
                type: receiverType
            },
            amountMoney
        }, {
            headers: {
                'x-client-id': userId
            }
        })
    }
}

export default TransactionService