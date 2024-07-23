import { createBrowserRouter } from "react-router-dom";

import ItemDetail from "pages/ItemDetail";
import Join from "pages/Join";
import Login from "pages/Login";
import Main from "pages/Main";
import NotFound from "pages/NotFound";

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
    path: "*",
    element: <NotFound />,
  },
]);
