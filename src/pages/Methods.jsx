import { motion } from "framer-motion";
import { useState } from "react";
import { pageTransition } from "../transitions";
import {
    BeakerIcon,
    CalculatorIcon,
    ChartBarIcon,
    CogIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import LuVisualization from "./Visualization/LuDecompositionVisualization.jsx"

export default function Methods() {
    const [currentDefinition, setCurrentDefinition] = useState("methods"); // Default to general definition
    const [expanded, setExpanded] = useState(null);

    // Categories and definitions data
    const categories = [
        {
            title: "Direct Methods",
            key: "direct",
            methods: [
                "LU Simple",
                "LU Pivoting",
                "Crout",
                "Doolittle",
                "Cholesky",
                "Gauss-Seidel",
                "SOR",
                "Vandermonde",
                "Gaussian Elimination",
                "Partial Pivoting",
                "Total Pivoting",
            ],
            icon: <CogIcon className="h-6 w-6 text-purple-700" />,
        },
        {
            title: "Iterative Methods",
            key: "iterative",
            methods: ["Jacobi", "Gauss-Seidel", "Newton", "Multiple Roots"],
            icon: <CalculatorIcon className="h-6 w-6 text-purple-700" />,
        },
        {
            title: "Interpolation Methods",
            key: "interpolation",
            methods: ["Newton (Divided Differences)", "Lagrange", "Polynomial Interpolation"],
            icon: <ChartBarIcon className="h-6 w-6 text-purple-700" />,
        },
        {
            title: "Root-Finding Methods",
            key: "roots",
            methods: [
                "Incremental Searches",
                "Bisection",
                "False Position",
                "Fixed Point",
                "Secant",
                "Multiple Roots",
            ],
            icon: <MagnifyingGlassIcon className="h-6 w-6 text-purple-700" />,
        },
        {
            title: "Approximation Methods",
            key: "approximation",
            methods: [
                "Approximation in the Context of Splines",
                "Linear Splines",
                "Quadratic Splines",
                "Cubic Splines",
            ],
            icon: <BeakerIcon className="h-6 w-6 text-purple-700" />,
        },
    ];

    const definitions = {
        methods: "Numerical methods are techniques used to approximate solutions to mathematical problems. They are essential when exact solutions are difficult or impossible to find.",
        direct: "Direct methods solve equations or systems without iterations. They are deterministic and provide a solution in a finite number of steps.",
        iterative: "Iterative methods refine an initial guess through successive approximations. They are typically used for larger systems.",
        interpolation: "Interpolation methods find a function that passes through a given set of points, often used to estimate values between known data points.",
        roots: "Root-finding methods are techniques used to find solutions to equations where the function equals zero.",
        approximation: "Approximation methods create simpler functions or solutions that approximate more complex problems, often used for efficiency or feasibility.",
    };

    const handleMouseEnter = (key) => {
        setCurrentDefinition(key); // Update definition on hover
    };

    const handleMouseLeave = () => {
        if (!expanded) setCurrentDefinition("methods");
    };


    const handleDropdownToggle = (key) => {
        if (expanded === key) {
            setExpanded(null);
            setCurrentDefinition("methods"); // Reset to general definition
        } else {
            setExpanded(key);
            setCurrentDefinition(key); // Set to the category definition
        }
    };


    return (
        <motion.div
            className="flex min-h-screen bg-white text-purple-700"
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
        >
            {/* Left: Categories */}
            <div className="w-1/3 p-6 border-r border-gray-300">
                <h1 className="text-4xl font-bold mb-8">Numerical Methods</h1>
                <div className="space-y-6">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            className="border border-purple-300 rounded-lg shadow-lg"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                            onMouseEnter={() => handleMouseEnter(category.key)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div
                                className="flex justify-between items-center bg-purple-100 px-4 py-3 cursor-pointer"
                                onClick={() => handleDropdownToggle(category.key)}
                            >
                                <div className="flex items-center space-x-2">
                                    {category.icon}
                                    <h2 className="text-xl font-semibold">{category.title}</h2>
                                </div>
                                <span>{expanded === category.key ? "▲" : "▼"}</span>
                            </div>
                            {expanded === category.key && (
                                <motion.div
                                    className="p-4 space-y-2"
                                    initial={{opacity: 0, height: 0}}
                                    animate={{opacity: 1, height: "auto"}}
                                    exit={{opacity: 0, height: 0}}
                                    transition={{duration: 0.5}}
                                >
                                    {category.methods.map((method, methodIndex) => (
                                        <motion.div
                                            key={methodIndex}
                                            className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg shadow-sm cursor-pointer transition"
                                            whileHover={{scale: 1.05}}
                                        >
                                            <a
                                                href={`/methods/${method
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")}`}
                                                className="block text-lg"
                                            >
                                                {method}
                                            </a>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Right: Dynamic Definitions */}
            <div className="w-2/3 p-6">
                <motion.div
                    className="p-4 bg-gray-100 rounded shadow-md"
                    key={currentDefinition}
                    initial={{opacity: 0, x: 20}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0, x: 20}}
                    transition={{duration: 0.3}}
                >
                    {/* Definition Heading */}
                    <h2 className="text-2xl font-semibold mb-2">
                        {currentDefinition === "methods"
                            ? "What are Numerical Methods?"
                            : categories.find((cat) => cat.key === currentDefinition)?.title || ""}
                    </h2>

                    {/* Definition Text */}
                    <p className="text-lg mb-6">{definitions[currentDefinition]}</p>

                    {/* Additional Content */}
                    {currentDefinition !== "methods" && (
                        <div className="mt-4 space-y-4">
                            <h3 className="text-xl font-semibold">Illustration:</h3>

                            {currentDefinition === "direct" && (
                                <div className="bg-purple-50 p-4 rounded shadow-md">
                                    <LuVisualization/>
                                </div>
                            )}

                            {/* Placeholder for other categories */}
                            {currentDefinition !== "direct" && (
                                <div className="bg-purple-50 p-4 rounded shadow-md">
                                    <p className="text-center text-gray-700">
                                        Placeholder for {currentDefinition} illustration or interactive content.
                                    </p>
                                </div>
                            )}

                            <div className="flex justify-end space-x-4">
                                <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                                    Learn More
                                </button>
                                <button className="px-4 py-2 bg-purple-200 text-purple-700 rounded hover:bg-purple-300">
                                    Try Examples
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>

        </motion.div>
    );
}
