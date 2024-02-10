
export interface RegisterUser {
    name: string
    email: string
    password: string
    identificationNumber: string
    identificationType: string
    mobileNumber: string
    country: string
    proofOfIdentity: Blob | string | ArrayBuffer | null
}


export interface ProtectedRouteProps {
    children: React.ReactNode;
}


export interface IUser {
    userId: string;
    name: string;
    email: string;
    mobileNumber: string;
    country: string;
    proofOfIdentity: string;
}

export interface IAccountItem {
    accountId: string;
    userId: string;
    type: number;
    balance: number;
}

export interface Props {
    accountList: IAccountItem[];
}

export interface IFormItem {
    as?: React.ComponentType<any>,
    id?: string,
    type: string,
    name: string,
    label: string,
    [key: string]: any;
}

export interface User {
    id: string,
    name: string,
    identification: number,
    email: string,
    mobileNumber: string,
    identificationType: string,
    identificationNumber: number,
    country: string,
    accessToken: string
}


export interface Deposit {
    accountId: string
    type: 'SAVINGS'
    amountMoney: number
}

export interface WithDraw {
    accountId: string
    type: 'CURRENT'
    amountMoney: number
}

export interface Transfer {
    sender: {
        accountId: string
        type: 'SAVINGS'
    }
    receiver: {
        accountNumber: number
        type: 'CURRENT'
    }
    amountMoney: number
}

export interface IFooterItem {
    icon: React.ReactElement<any, any>
    title: string
    content: string
}
