import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import { Home } from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { MyCard } from './pages/myCard/MyCard';
import CreateCard from './pages/createCard/CreateCard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/myCards", element: <MyCard /> },
      { path: "/createCard", element: <CreateCard /> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
