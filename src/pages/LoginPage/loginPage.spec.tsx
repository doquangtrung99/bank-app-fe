import { fireEvent, render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "@jest/globals";
import Login from ".";
import { AuthService } from "../../services";
import axios from '../../configs/axiosAuth';
import { ILogin } from "../../interfaces";
describe("Test for login user", () => {
    it("Should show login form", async () => {
        const { container } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        expect(await screen.findByText("Email:")).toBeTruthy();
        expect(await screen.findByText("Email:")).toBeTruthy();
        expect(await screen.findByText("Password:")).toBeTruthy();
        expect(await screen.findByText("Submit")).toBeTruthy();
        expect(await screen.findByText("Register account now")).toBeTruthy();
        expect(container.querySelectorAll("input").length).toEqual(2);
    });

    it('Should log in successfully as clicking submit button', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        const expectedResponse = {
            id: "27f98d16-bcc9-4346-97e0-0b4137c8cfea",
            name: "trung",
            identificationType: "passportNumber",
            identificationNumber: 9123,
            email: "quangtrung941999@gmail.com",
            mobileNumber: "84 974078473",
            country: "Viet Nam",
            proofOfIdentity: "image.png",
            accessToken: 'accessToken',
        }

        jest.spyOn(axios, "post").mockResolvedValue(expectedResponse);

        const loginData: ILogin = {
            email: 'quangtrung941999@gmail.com',
            password: 'Trung123@'
        }

        await act(async () => {
            fireEvent.click(await screen.findByText("Submit"));
        })

        const res = await AuthService.login(loginData);
        expect(axios.post).toHaveBeenCalledWith('/auth/login', loginData, { signal: undefined });
        expect(res).toEqual(expectedResponse);

    })

    it('should navigate to register page when click "Register account now" button', async () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        )

        await act(async () => {
            fireEvent.click(await screen.findByText('Register account now'));
        })

        expect(window.location.pathname).toEqual('/register');
    })
});