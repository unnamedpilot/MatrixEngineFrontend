import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Methods from "./pages/Methods";
import LuSimple from "./pages/LuSimple.jsx";
import IncrementalSearches from "./pages/IncrementalSearch.jsx";
import "katex/dist/katex.min.css";
import Bisection from "./pages/Bisection.jsx";
import FalsePosition from "./pages/FalsePosition.jsx";
import MultipleRoots from "./pages/MultipleRoots.jsx";
import NewtonMethod from "./pages/NewtonRaphson.jsx";
import FixedPoint from "./pages/FixedPoint.jsx";
import SecantMethod from "./pages/Secant.jsx";
import LuPartial from "./pages/LuPartial.jsx";
import Crout from "./pages/Crout.jsx";
import Doolittle from "./pages/doLittle.jsx";
import Cholesky from "./pages/Cholesky.jsx";
import GaussSeidel from "./pages/GaussSeidel.jsx";
import Vandermonde from "./pages/Vandermonde.jsx";
import GaussianElimination from "./pages/GaussianElimination.jsx";
import PartialPivoting from "./pages/PartialPivoting.jsx";


export default function App() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="methods" element={<Methods />} />
                    <Route path="methods/lu-simple" element={<LuSimple />} />
                    <Route path="methods/incremental-searches" element={<IncrementalSearches />} />
                    <Route path="methods/bisection" element={<Bisection />} />
                    <Route path="methods/false-position" element={<FalsePosition />} />
                    <Route path="methods/multiple-roots" element={<MultipleRoots />} />
                    <Route path="methods/newton" element={<NewtonMethod />} />
                    <Route path="methods/fixed-point" element={<FixedPoint />} />
                    <Route path="methods/secant" element={<SecantMethod />} />
                    <Route path="methods/lu-pivoting" element={<LuPartial />} />
                    <Route path="methods/crout" element={<Crout />} />
                    <Route path="methods/doolittle" element={<Doolittle />} />
                    <Route path="methods/cholesky" element={<Cholesky />} />
                    <Route path="methods/gauss-seidel" element={<GaussSeidel />} />
                    <Route path="methods/vandermonde" element={<Vandermonde />} />
                    <Route path="methods/gaussian-elimination" element={<GaussianElimination />} />
                    <Route path="methods/partial-pivoting" element={<PartialPivoting />} />

                </Route>
            </Routes>
        </AnimatePresence>
    );
}
