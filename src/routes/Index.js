import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <BrowserRouter>
        <Router></Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
    </BrowserRouter>
  )
}
