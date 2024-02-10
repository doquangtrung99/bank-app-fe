import { createBrowserRouter } from "react-router-dom";
import {
  Account,
  Home,
  LandingPage,
  Login,
  Register,
  Transaction,
} from "../pages";
import App from "../App";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: '/home',
            element: <ProtectedRoute> <Home /> </ProtectedRoute>
          },
          {
            path: '/accounts',
            element: <ProtectedRoute> <Account /> </ProtectedRoute>
          },
          {
            path: '/transaction',
            element: <ProtectedRoute> <Transaction /> </ProtectedRoute>
          },
          {
            path: '*',
            element: <div>NOT FOUND</div>
          }

        ]
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
]);
