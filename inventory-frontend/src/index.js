import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css';
import App from './App';
import { ContextProvider } from './context/ContextProvider';
import EmployeesPage from './EmployeesPage';
import ProductsPage from './ProductsPage';
import { AuthProvider } from './context/AuthContext';
import Home from './Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: "/employees",
        element: <EmployeesPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ContextProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ContextProvider>
  </AuthProvider>
);

