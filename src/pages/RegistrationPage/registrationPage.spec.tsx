import { fireEvent, render, screen, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect } from "@jest/globals";
import Register from ".";
import axios from '../../configs/axiosAuth';
import { AuthService } from "../../services";

describe("Test for register user", () => {
    it("Should show register form", async () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        expect(screen.queryByText('Submit')).toBeTruthy();
        expect(screen.queryByText('Proof of Identity (png/jpg only):')).toBeTruthy();
        expect(screen.queryByText('Email:')).toBeTruthy();
        expect(screen.queryByText('Password:')).toBeTruthy();
        expect(screen.queryByText('Identification Type:')).toBeTruthy();
        expect(screen.queryByText('Citizen ID/Passport Number:')).toBeTruthy();
        expect(screen.queryByText('Name:')).toBeTruthy();
        expect(screen.queryByText('Mobile Number:')).toBeTruthy();
        expect(screen.queryByText('Country:')).toBeTruthy();
        expect(screen.queryByText("Already have an account")).toBeTruthy();
    });

    it("Should register user successfully", async () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const expectedResponse = {
            id: "userId",
            name: "trung",
            email: "quangtrung941999@gmail.com",
            mobileNumber: "84 0974078473",
            identificationType: "passportNumber",
            identificationNumber: 1234,
            country: "VN",
            accessToken: "1234"
        };
        const registerBtn = screen.queryByText('Submit');
        const loginData = {
            email: 'quangtrung941999@gmail.com',
            password: 'Trung123@'
        }

        jest.spyOn(axios, 'post').mockResolvedValue(expectedResponse);
        await act(async () => {
            fireEvent.click(registerBtn as HTMLElement);
        })
        const res = await AuthService.login(loginData);

        expect(axios.post).toHaveBeenCalledWith('/auth/login', loginData, { signal: undefined });
        expect(screen.queryByText('Submit')).toBeTruthy();
        expect(res).toEqual(expectedResponse);

    });
});