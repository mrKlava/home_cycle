import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/authContext'

import { Login, Main, Register } from './pages'

/* Wrapper function to protect routes where user must be authenticated */
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) return <Navigate to="/login" />   // if user is auth -> redirect to /login

  return children
}

/* Wrapper function to protect routes from users authenticated */
const AuthRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)

  if (currentUser) return <Navigate to="/" />       // if user is auth -> redirect to / 

  return children
}

// create all routes and link them with correct Page components
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/main",
    element: <ProtectedRoute><Main /></ProtectedRoute>
  },
  {
    path: "/login",
    element: <AuthRoute><Login /></AuthRoute>
  },
  {
    path: "/register",
    element: <AuthRoute><Register /></AuthRoute>
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])

// create router provider and import it in index.js
const Router = ({ children }) => {
  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  )
}


export default Router