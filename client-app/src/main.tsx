import React from 'react'
import ReactDOM from 'react-dom/client'

import './app/layout/styles.css'
import { StoreContext, store } from './app/stores/store'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/route'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'

import "./assets/demo/demo.css";
import "./assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import "./assets/scss/black-dashboard-react.scss";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <React.StrictMode>
        <StoreContext.Provider value={store}>
          <RouterProvider router={router} />
        </StoreContext.Provider>
      </React.StrictMode>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
)
