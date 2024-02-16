import { fireEvent, render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import * as hooks from "../../hooks/useGlobal";
import * as triggers from '../../hooks/useTrigger';
import Transaction from ".";
import axios from '../../configs/axiosAuth'
import { TransactionService } from "../../services";
import { Deposit, Transfer, WithDraw } from "../../interfaces";

describe("Test for Transaction", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render all the components with no accounts", async () => {

        jest.spyOn(hooks, 'default').mockReturnValue({
            user: {
                currentAccounts: {},
                savingsAccount: {}
            },
            setUser: jest.fn()
        })

        render(
            <BrowserRouter>
                <Transaction />
            </BrowserRouter>
        );
        expect(screen.findByText("Back to accounts page")).toBeTruthy();
        expect(screen.findByText("Current Account")).toBeTruthy();
        expect(screen.findByText("Savings Account")).toBeTruthy();
        expect(screen.findByText("Actions")).toBeTruthy();
        expect(screen.queryByTestId('withdraw')).toBeNull();
        expect(screen.queryByTestId('deposit')).toBeNull();
        expect(screen.queryByTestId('transfer')).toBeNull();
    });

    it("should nagivate to account page when click to 'Back to accounts page' button", async () => {
        render(
            <BrowserRouter>
                <Transaction />
            </BrowserRouter>
        )
        const backBtn = screen.queryByText("Back to accounts page");

        await act(async () => {
            fireEvent.click(backBtn as HTMLElement);
        })

        expect(window.location.pathname).toEqual('/accounts');
        expect(backBtn).toBeTruthy();
    });

    it("should render buttons for deposit and withdraw and transfer", async () => {

        jest.spyOn(hooks, 'default').mockReturnValue({
            user: {
                currentAccounts: {
                    accountNumber: 123
                },
                savingsAccounts: {
                    accountNumber: 456
                }
            },
            setUser: jest.fn()
        })

        render(
            <BrowserRouter>
                <Transaction />
            </BrowserRouter>
        );

        expect(screen.queryByTestId('withdraw')?.textContent).toBe('Withdraw');
        expect(screen.queryByTestId('deposit')?.textContent).toBe('Deposit');
        expect(screen.queryByTestId('transfer')?.textContent).toBe('Transfer');
    })

    it("should show withdraw modal when click to withdraw button and / should submit form sucessfully as click to form's withdraw button", async () => {

        jest.spyOn(hooks, 'default').mockReturnValue({
            user: {
                currentAccounts: {
                    accountId: 'accountIdCurrent',
                    amountMoney: 1000,
                    accountNumber: 123
                },
                savingsAccounts: {
                    accountNumber: 456
                }
            },
            setUser: jest.fn()
        })

        render(
            <BrowserRouter>
                <Transaction />
            </BrowserRouter>
        );

        const withDrawButton = screen.queryByTestId('withdraw');
        await act(async () => {
            fireEvent.click(withDrawButton as HTMLElement);
        })

        const withdrawForm = screen.queryByTestId('form-withdraw');
        expect(withdrawForm).toBeTruthy();
        expect(screen.queryByTestId('form-deposit')).toBeFalsy();
        expect(screen.queryByTestId('form-transfer')).toBeFalsy();
        expect(withDrawButton?.textContent).toBeTruthy();

        // handle case click submit button in withdraw form
        const userId = '123trung';
        const expectedData = { accountId: 'accountIdCurrent', type: 'CURRENT', amountMoney: 700 };
        const withdrawData: WithDraw = { accountId: 'accountIdCurrent', type: 'CURRENT', amountMoney: 300 };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(expectedData);

        const res = await TransactionService.withdraw(withdrawData, userId);
        await act(async () => {
            fireEvent.click(withdrawForm?.querySelector('button') as HTMLElement);
        })
        expect(axios.post).toHaveBeenCalledWith('transaction/withdraw', withdrawData, { headers: { 'x-client-id': userId } });
        expect(res).toEqual(expectedData);
    })

    it("should show deposit modal when click to withdraw button and / should submit form sucessfully as click to form's deposit button", async () => {

        jest.spyOn(hooks, 'default').mockReturnValue({
            user: {
                currentAccounts: {
                    accountNumber: 123
                },
                savingsAccounts: {
                    accountNumber: 456,
                    accountId: 'accountIdSavings',
                    amountMoney: 1000,
                }
            },
            setUser: jest.fn()
        })

        render(
            <BrowserRouter>
                <Transaction />
            </BrowserRouter>
        );

        const depositButton = screen.queryByTestId('deposit');
        await act(async () => {
            fireEvent.click(depositButton as HTMLElement);
        })

        const depositForm = screen.queryByTestId('form-deposit');

        expect(depositForm).toBeTruthy();
        expect(screen.queryByTestId('form-withdraw')).toBeFalsy();
        expect(screen.queryByTestId('form-transfer')).toBeFalsy();
        expect(depositButton?.textContent).toBeTruthy();

        // handle case click submit button in deposit form
        const userId = '123trung';
        const expectedData = { accountId: 'accountIdSavings', type: 'SAVINGS', amountMoney: 1300 };
        const depositData: Deposit = { accountId: 'accountIdSavings', type: 'SAVINGS', amountMoney: 300 };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(expectedData);

        const res = await TransactionService.deposit(depositData, userId);
        await act(async () => {
            fireEvent.click(depositForm?.querySelector('button') as HTMLElement);
        })
        expect(axios.post).toHaveBeenCalledWith('transaction/deposit', depositData, { headers: { 'x-client-id': userId } });
        expect(res).toEqual(expectedData);
    })

    it("should show transfer modal when click to transfer button and / should submit form sucessfully as click to form's transfer button", async () => {

        jest.spyOn(hooks, 'default').mockReturnValue({
            user: {
                currentAccounts: {
                    accountNumber: 123
                },
                savingsAccounts: {
                    accountNumber: 456
                }
            },
            setUser: jest.fn()
        })

        render(
            <BrowserRouter>
                <Transaction />
            </BrowserRouter>
        );

        const transfertButton = screen.queryByTestId('transfer');
        await act(async () => {
            fireEvent.click(transfertButton as HTMLElement);
        })

        const transferForm = screen.queryByTestId('form-transfer');
        expect(screen.queryByTestId('form-withdraw')).toBeFalsy();
        expect(screen.queryByTestId('form-deposit')).toBeFalsy();
        expect(transferForm).toBeTruthy();
        expect(transfertButton?.textContent).toBeTruthy();

        // handle case click submit button in deposit form

        jest.spyOn(triggers, 'default').mockReturnValue({
            trigger: jest.fn(),
            loading: false,
            data: null
        })

        const userId = '123trung';
        const expectedData = "Transfer successfully";
        const transferData: Transfer = {
            sender: {
                accountId: 'accountIdSavings',
                type: 'SAVINGS'
            },
            receiver: {
                accountNumber: 123,
                type: 'CURRENT'
            },
            amountMoney: 300
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(expectedData);

        const res = await TransactionService.transfer(transferData, userId);
        await act(async () => {
            fireEvent.click(transferForm?.querySelector('button') as HTMLElement);
        })
        expect(axios.post).toHaveBeenCalledWith('transaction/transfer', transferData, { headers: { 'x-client-id': userId } });
        expect(res).toEqual(expectedData);
    })
});