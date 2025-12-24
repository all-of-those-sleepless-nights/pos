import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import PublicLayout from "../layouts/public-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [{ path: "/", Component: Home }],
  },
]);
