import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import { useAuthContext } from './hooks'

import { AppLayout, HomeLayout } from './layouts'

import { LoginPage, HomePage, RegisterPage, MainPage, ProfilePage, InterventionsPage, InterventionPage, BikesPage, BikePage, InvoicesPage, InvoicePage, BikeNewPage } from './pages';

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
        <HomeLayout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
    ]
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
        path: "profile/:id",
        element: <ProfilePage />
      },
      {
        path: "bikes",
        children: [
          {
            index: true,
            element: <BikesPage />
          },
          {
            path: "new",
            element: <BikeNewPage />
          },
          {
            path: ":id",
            element: <BikePage />
          }
        ]
      },
      {
        path: "interventions",
        children: [
          {
            index: true,
            element: <InterventionsPage />
          },
          {
            path: ":id",
            element: <InterventionPage />
          }
        ]
      },
      {
        path: "invoices",
        children: [
          {
            index: true,
            element: <InvoicesPage />
          },
          {
            path: ":id",
            element: <InvoicePage />
          }
        ]
      },
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' />
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