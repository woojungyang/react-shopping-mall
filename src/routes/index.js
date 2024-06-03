import { createBrowserRouter } from "react-router-dom";

import Login from "pages/Login";
import Main from "pages/Main";
import NotFound from "pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
