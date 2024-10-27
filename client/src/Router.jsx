import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { useAuthContext } from './hooks'

import { AppLayout } from './layouts'

import { LoginPage, HomePage, RegisterPage, MainPage, ProfilePage, BikesPage } from './pages'

/**
 * Wrapper function to protect routes where user must be authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuthContext()

  if (!currentUser) return <Navigate to="/login" />   // if user is auth -> redirect to /login

  return children
}

/**
 * Wrapper function to protect routes from users authenticated
 */
const AuthRoute = ({ children }) => {
  const { currentUser } = useAuthContext()

  if (currentUser) return <Navigate to="/app" />       // if user is auth -> redirect to / 

  return children
}

/**
 * Rout Controller
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <HomePage />
      </AuthRoute>
    )
  },
  {
    path: "/login",
    element: (
      <AuthRoute>
        <LoginPage />
      </AuthRoute>
    )
  },
  {
    path: "/register",
    element: (
      <AuthRoute>
        <RegisterPage />
      </AuthRoute>
    )
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
      {
        path: "bikes",
        element: <BikesPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/home' />
  }
])

/**
 * ### Application Router
 */
const Router = ({ children }) => {
  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  )
}

export default Router