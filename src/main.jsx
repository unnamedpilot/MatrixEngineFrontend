import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Header from "./components/Header.jsx";
import { MathJaxContext } from "better-react-mathjax";

const mathJaxConfig = {
    loader: { load: ["input/asciimath", "output/chtml"] },
};

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <MathJaxContext config={mathJaxConfig}>
                <Header />
                <App />
            </MathJaxContext>
        </BrowserRouter>
    </StrictMode>,
)
