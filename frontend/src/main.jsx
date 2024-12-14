import { Provider } from "./components/ui/provider.jsx"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ColorModeProvider } from "./components/ui/color-mode"
import { defaultSystem } from "@chakra-ui/react"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Provider theme={defaultSystem}>
                <ColorModeProvider>
                    <App />
                </ColorModeProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
)
