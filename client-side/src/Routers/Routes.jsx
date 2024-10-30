import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import TaskAdd from "../Pages/Tasks/TaskAdd";
import TaskView from "../Pages/Tasks/TaskView";
import PrivateRouter from "./PrivateRouter";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <LogIn></LogIn>
        },
        {
            path: '/signin',
            element: <SignUp></SignUp>
        },
        {
            path: '/task-create',
            element: <TaskAdd></TaskAdd>
        },
        {
            path: '/tasks',
            element: <PrivateRouter> <TaskView></TaskView> </PrivateRouter>
        },
      ]
    },
  ]);

export default router;