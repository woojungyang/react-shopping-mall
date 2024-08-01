import { createBrowserRouter } from "react-router-dom";

import Cart from "pages/Cart";
import FindMember from "pages/FindMember";
import ItemDetail from "pages/ItemDetail";
import Join from "pages/Join";
import Login from "pages/Login";
import Main from "pages/Main";
import MyOrder from "pages/MyOrder";
import NotFound from "pages/NotFound";
import Payment from "pages/Payment";
import Search from "pages/Search";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/find",
    element: <FindMember />,
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
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/mypage/order",
    element: <MyOrder />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
