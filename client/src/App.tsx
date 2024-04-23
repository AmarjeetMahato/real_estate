
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";
import Home from "./pages/HomePage/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SinglePage from "./pages/singlePage/SinglePage";
import {Layout} from "./pages/Layout/Layout";
import Profile from "./pages/ProfilePage/Profile";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>,
        },
        {
          path: "/list",
          element: <ListPage />,
          // loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage/>,
          // loader: singlePageLoader,
        },
        {
          path:"/profile",
          element:<Profile/>
        },

        {
          path: "/login",
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>,
        },
      ],
    },
    {
      path: "/",
      // element: <RequireAuth />,
      children: [
        {
          // path: "/profile",
          // element: <Profile />,
          // loader: profilePageLoader
        },
        {
          path: "/profile/update",
          // element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          // element: <NewPostPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;