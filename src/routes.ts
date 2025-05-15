import { createBrowserRouter } from "react-router";
import Root from "./layout/root";
import TrackingPage from "./pages/TrackingPage";
import HomePage from "./pages/HomePage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import Orders from "./pages/OrdersPage";
import Products from "./pages/ProductsPage";
import Onboarding from "./pages/OnBoardingPage";
import CustomersPage from "./pages/CustomersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Settings from "./pages/Settings";
import EarningsPage from "./pages/EarningPage";
import Login from "./pages/Login";
import Register from "./pages/register";
import Auth from "./layout/auth";

export let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/orders",
        Component: Orders,
      },
      {
        path: "/order/:id?",
        Component: OrderDetailsPage,
      },
      {
        path: "/product/:id?",
        Component: ProductDetailsPage,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/customers",
        Component: CustomersPage,
      },
      {
        path: "/track/:id",
        Component: TrackingPage,
      },
      {
        path: "/settings",
        Component: Settings,
      },
      {
        path: "/earning",
        Component: EarningsPage,
      },

      {
        path: "*",
        Component: PageNotFoundPage,
      },
    ],
  },
  {
    path: "/",
    Component: Auth,
    children: [
      {
        path: "/onboarding",
        Component: Onboarding,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
