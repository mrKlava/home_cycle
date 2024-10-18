// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'

// import './index.scss'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthContextProvider } from './context/authContext'
import { UsersContextProvider } from './context/usersContext'

import Router from './Router'

import './index.scss'


const root = ReactDOM.createRoot(document.getElementById('root'))
/* pass router to app and wrap with contexts */
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<UsersContextProvider>
				<Router />
			</UsersContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)