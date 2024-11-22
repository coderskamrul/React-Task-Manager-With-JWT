import { createBrowserRouter, useParams } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import LogIn from "../Pages/LogIn/LogIn";
import SignUp from "../Pages/SignUp/SignUp";
import TaskAdd from "../Pages/Tasks/TaskAdd";
import TaskView from "../Pages/Tasks/TaskView";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import TaskBoard from "../Pages/Dashboard/TaskBoard/TaskBoard";
import Projects from "../Pages/Dashboard/Projects/Projects";



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
    {
      path: "/dashboard",
      element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
      children: [
        {
          path: '',
          element: <Dashboard />
        },
        {
          path: 'tasks',
          element: <div className="p-8"><TaskBoard /></div>
        },
        {
          path: 'projects',
          element: <Projects />,
          loader: () => fetch('http://localhost:5000/projects')
        },
        {
          path: 'projects/tasks/:id',
          element: <div className="p-8"> <TaskBoard /> </div>
        },
      ]
    }
  ]);

export default router;