import { fireEvent, render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from ".";

describe("Test for landing page", () => {
    it("Should display login and register button", async () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );

        expect(await screen.findByText("Sign In")).toBeTruthy();
        expect(screen.getAllByRole('button')).toHaveLength(3);
        expect(await screen.findAllByText('Register')).toHaveLength(2);
    });

    it('Should navigate to "/login" when login button is clicked', async () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        await act(async () => {
            fireEvent.click(await screen.findByText("Sign In"));
        });
        expect(window.location.pathname).toEqual("/login");
    })

    it('Should navigate to "/register" when register button is clicked', async () => {
        render(
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
        await act(async () => {
            const registerBtns = await screen.findAllByText('Register')

            fireEvent.click(registerBtns[0]);
        });
        expect(window.location.pathname).toEqual("/register");
    })
});