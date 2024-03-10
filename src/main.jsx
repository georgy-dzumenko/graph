import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MainThemeProvider from './theme/provider.jsx'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <MainThemeProvider>
                <App />
            </MainThemeProvider>
        </Provider>
    </React.StrictMode>
)
