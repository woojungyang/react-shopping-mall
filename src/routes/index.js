import { createBrowserRouter } from "react-router-dom";

import Cart from "pages/Cart";
import Category from "pages/Category";
import Event from "pages/Event";
import FindMember from "pages/FindMember";
import Heart from "pages/Heart";
import ItemDetail from "pages/ItemDetail";
import Join from "pages/Join";
import Login from "pages/Login";
import LookBook from "pages/LookBook";
import Main from "pages/Main";
import MyOrder from "pages/MyOrder";
import MyPage from "pages/MyPage";
import NotFound from "pages/NotFound";
import OrderDetail from "pages/OrderDetail";
import Payment from "pages/Payment";
import Search from "pages/Search";

import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/items/:id",
    element: <ItemDetail />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/event",
    element: <Event />,
  },
  {
    path: "/lookbook",
    element: <LookBook />,
  },
  {
    path: "/login",
    element: <GuestRoute element={<Login />} />,
  },
  {
    path: "/join",
    element: <GuestRoute element={<Join />} />,
  },
  {
    path: "/find",
    element: <GuestRoute element={<FindMember />} />,
  },
  {
    path: "/payment",
    element: <ProtectedRoute element={<Payment />} />,
  },
  {
    path: "/mypage",
    element: <ProtectedRoute element={<MyPage />} />,
  },
  {
    path: "/my-order/my-order-list",
    element: <ProtectedRoute element={<MyOrder />} />,
  },
  {
    path: "/my-order/my-order-list/:id",
    element: <ProtectedRoute element={<OrderDetail />} />,
  },
  {
    path: "/mypage/heart",
    element: <ProtectedRoute element={<Heart />} />,
  },
  {
    path: "/category/:id",
    element: <Category />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
