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
import Users from "../Pages/Dashboard/Users/Users";
import TaskDnd from "../Pages/Dashboard/TaskBoard/TaskDnd";
import TestTask from "../Pages/Dashboard/TaskBoard/TestTask";



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
        {
          // npm install react react-dom @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
          path: 'taskdnd',
          element: <TestTask />,
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
          element: <div className="p-2"><TaskBoard /></div>
        },
        {
          path: 'projects',
          element: <Projects />,
        },
        {
          path: 'projects/tasks/:id',
          element: <div className="p-2"> <TaskBoard /> </div>
        },
        {
          path: 'users',
          element: <Users />,
        },
      ]
    }
  ]);

export default router;