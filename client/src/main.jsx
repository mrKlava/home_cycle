import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthContextProvider } from './context'

import Router from './Router'

import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
/* pass router to app and wrap with contexts */
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<Router />
		</AuthContextProvider>
	</React.StrictMode>
)