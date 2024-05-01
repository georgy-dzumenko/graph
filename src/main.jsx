import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './app/store'

import MainThemeProvider from '@theme/provider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <MainThemeProvider>
                <App />
            </MainThemeProvider>
        </Provider>
    </React.StrictMode>
)
