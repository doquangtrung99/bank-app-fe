import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Account, { AccountType } from ".";
import * as hook from '../../hooks/useGlobal'
import { act } from "@testing-library/react";
import { AccountService } from "../../services";
import { IAccountItem } from "../../interfaces";
import axios from '../../configs/axiosAuth'
describe("Test for Account page", () => {

    afterEach(() => {
        jest.clearAllMocks();
    })

    it("Render all the components when there is no account created", async () => {

        jest.spyOn(hook, 'default').mockReturnValue({
            user: {
                currentAccounts: {},
                savingsAccounts: {}
            },
            setUser: jest.fn()
        })

        render(
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        );

        expect(screen.queryByText("Back to home page")).toBeTruthy();
        expect(screen.queryByText("Current Account Number")).toBeTruthy();
        expect(screen.queryByText("Savings Account Number")).toBeTruthy();
        expect(screen.queryByTestId("btn-create-current-account")).toBeTruthy();
        expect(screen.queryByTestId("btn-create-savings-account")).toBeTruthy();
    });

    it("Render all the components when there is either current account or savings account created", async () => {

        jest.spyOn(hook, 'default').mockReturnValue({
            user: {
                currentAccounts: {},
                savingsAccounts: {
                    accountNumber: 123
                }
            },
            setUser: jest.fn()
        })

        render(
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        );
        expect(screen.queryByTestId("btn-create-current-account")).toBeTruthy();
        expect(screen.queryByTestId("btn-create-savings-account")).toBeNull();
    });

    it("Render all the components when there is both account created", async () => {
        jest.spyOn(hook, 'default').mockReturnValue({
            user: {
                currentAccounts: {
                    accountNumber: 456
                },
                savingsAccounts: {
                    accountNumber: 123
                }
            },
            setUser: jest.fn()
        })
        render(
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        );

        expect(screen.queryByTestId("btn-create-current-account")).toBeNull();
        expect(screen.queryByTestId("btn-create-savings-account")).toBeNull();
    });

    it("when having savings account should display transfer button to navigate to transaction page ", async () => {
        jest.spyOn(hook, 'default').mockReturnValue({
            user: {
                currentAccounts: {},
                savingsAccounts: {
                    accountNumber: 123
                }
            },
            setUser: jest.fn()
        })
        render(
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        );

        expect(screen.queryByTestId("btn-create-savings-account")).toBeNull();
        expect(screen.queryByText("Transfer")).toBeTruthy();
    });

    it("when click to transfer button should navigate to transaction page", async () => {
        jest.spyOn(hook, 'default').mockReturnValue({
            user: {
                currentAccounts: {},
                savingsAccounts: {
                    accountNumber: 123
                }
            },
            setUser: jest.fn()
        })
        render(
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        );

        const transferButton = screen.queryByText("Transfer")
        await act(async () => {
            fireEvent.click(transferButton as HTMLElement);
        })
        expect(window.location.pathname).toEqual('/transaction');
        expect(screen.queryByTestId("btn-create-savings-account")).toBeNull();
        expect(transferButton).toBeTruthy();
    });

    it('should create current account successfully', async () => {
        jest.spyOn(hook, 'default').mockReturnValue({
            user: {
                currentAccounts: {},
                savingsAccounts: {}
            },
            setUser: jest.fn()
        })
        render(
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        );

        const createdData: IAccountItem = {
            id: "123",
            accountNumber: 1234,
            userId: "userId",
            type: AccountType.CURRENT,
            balance: 1234,
        }
        const createCurrentAccountButton = screen.queryByTestId("btn-create-current-account")

        jest.spyOn(axios, 'post').mockResolvedValue(createdData);

        await act(async () => {
            fireEvent.click(createCurrentAccountButton as HTMLElement);
        })

        const res = await AccountService.create(AccountType.CURRENT, "userId");

        expect(axios.post).toHaveBeenCalledWith(
            '/account/create',
            { type: AccountType.CURRENT, userId: 'userId' },
            { headers: { 'x-client-id': 'userId' } }
        );
        expect(createCurrentAccountButton).toBeTruthy();
        expect(res).toEqual(createdData);
    })

    it('should create savings account successfully', async () => {
        jest.spyOn(hook, 'default').mockReturnValue({
            user: {
                currentAccounts: {},
                savingsAccounts: {},
            },
            setUser: jest.fn()
        })
        render(
            <BrowserRouter>
                <Account />
            </BrowserRouter>
        );

        const createdData: IAccountItem = {
            id: "123456",
            accountNumber: 123456,
            userId: "userId",
            type: AccountType.SAVINGS,
            balance: 1234,
        }

        const createSavingsAccountButton = screen.queryByTestId("btn-create-savings-account")
        jest.spyOn(axios, 'post').mockResolvedValue(createdData);
        await act(async () => {
            fireEvent.click(createSavingsAccountButton as HTMLElement);
        })
        const res = await AccountService.create(AccountType.SAVINGS, "userId");

        expect(axios.post).toHaveBeenCalledWith(
            '/account/create',
            { type: AccountType.SAVINGS, userId: 'userId' },
            { headers: { 'x-client-id': 'userId' } }
        );
        expect(createSavingsAccountButton).toBeTruthy();
        expect(res).toEqual(createdData);
    })
});