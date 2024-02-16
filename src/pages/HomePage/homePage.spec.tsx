import { fireEvent, render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from ".";
describe("Test for home page", () => {
    it("allows the user to navigate to '/accounts' path", async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        expect(await screen.findByText("BankingApp")).toBeTruthy();
        expect(await screen.findByText("Account")).toBeTruthy();
        expect(await screen.findByText("Transaction")).toBeTruthy();
        expect(await screen.findByText("Logout")).toBeTruthy();

        await act(async () => {
            fireEvent.click(await screen.findByText("Account"));
        });
        expect(window.location.pathname).toEqual("/accounts");
    });

    it("allows the user to navigate to '/transaction' path", async () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        expect(await screen.findByText("BankingApp")).toBeTruthy();
        expect(await screen.findByText("Account")).toBeTruthy();
        expect(await screen.findByText("Transaction")).toBeTruthy();
        expect(await screen.findByText("Logout")).toBeTruthy();

        await act(async () => {
            fireEvent.click(await screen.findByText("Transaction"));
        });
        expect(window.location.pathname).toEqual("/transaction");
    });
});