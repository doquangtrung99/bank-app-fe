import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalComponent from './components/GlobalComponent.tsx'
import { RouterProvider } from "react-router-dom";
import { router } from './routes'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalComponent>
      <RouterProvider router={router} />
    </GlobalComponent>
  </React.StrictMode>,
)
