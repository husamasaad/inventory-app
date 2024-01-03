# Inventory Management App

## Overview

This Inventory Management App was developed as part of an internship assignment. It is designed to assist users in managing their inventory with basic operations such as adding, updating, and deleting products. The app also includes a stats page to display key inventory metrics.

## Features

- **Product Management:**
  - Add new products with details like name, quantity, and category.
  - Update existing product information.
  - Delete products when they are no longer in the inventory.

- **Employee Management:**
  - Employees have names, roles, and salaries.
  - Only users with roles 'owner' or 'admin' can sign in and perform CRUD operations on products.
  - Only 'owners' can perform CRUD operations on the employees' page.

- **JWT Authentication:**
  - The app uses JWT (JSON Web Token) for user authentication.
  - Only users with valid tokens and roles 'owner' or 'admin' can access product-related functionalities.

## Technologies Used

- **Frontend:**
  - React.js
  - React Router

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT for authentication

## Author

 - My website : [Husam Asaad Hassan](https://husam-asaad.vercel.app/)

