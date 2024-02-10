import { IAccountItem } from "../interfaces";

export const ACCOUNT_TYPE = {
    SAVINGS: 0,
    CURRENT: 1,
};

type Keys = keyof typeof ACCOUNT_TYPE;
export type AccountType = (typeof ACCOUNT_TYPE)[Keys];


export const MockData: IAccountItem[] = [
    {
        accountId: "1",
        balance: 100,
        type: 0,
        userId: "123123",
    },
    {
        accountId: "2",
        balance: 100,
        type: 0,
        userId: "123123",
    },
    {
        accountId: "3",
        balance: 100,
        type: 0,
        userId: "123123",
    },
    {
        accountId: "4",
        balance: 100,
        type: 0,
        userId: "123123",
    },
];
