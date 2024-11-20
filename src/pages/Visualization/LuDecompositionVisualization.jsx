import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LuVisualization() {
    const [step, setStep] = useState(0);

    // Automatically transition through the steps
    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prevStep) => (prevStep + 1) % 3); // Cycle through 3 steps
        }, 3000); // 3 seconds per step

        return () => clearInterval(interval);
    }, []);

    const matrixSize = 4;
    const cellSize = "50px";

    const createMatrix = (highlight) => {
        return Array.from({ length: matrixSize }).map((_, row) =>
            Array.from({ length: matrixSize }).map((_, col) => {
                const isLower = row >= col;
                const isUpper = row <= col;
                const bgColor =
                    highlight === "L"
                        ? isLower
                            ? "bg-green-200"
                            : "bg-gray-100"
                        : highlight === "U"
                            ? isUpper
                                ? "bg-blue-200"
                                : "bg-gray-100"
                            : "bg-purple-200";

                return (
                    <div
                        key={`${row}-${col}`}
                        className={`border border-purple-500 ${bgColor}`}
                        style={{ width: cellSize, height: cellSize }}
                    ></div>
                );
            })
        );
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-4">LU Decomposition</h2>

            <div className="relative flex justify-center items-center space-x-4">
                {/* Matrix A */}
                {step === 0 && (
                    <motion.div
                        className="grid grid-cols-4 gap-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1 }}
                    >
                        {createMatrix("A").flat()}
                    </motion.div>
                )}

                {/* Split into L and U */}
                {step === 1 && (
                    <>
                        <motion.div
                            className="grid grid-cols-4 gap-0"
                            initial={{ x: 0, opacity: 0 }}
                            animate={{ x: "-150px", opacity: 1 }}
                            exit={{ x: 0, opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {createMatrix("L").flat()}
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-4 gap-0"
                            initial={{ x: 0, opacity: 0 }}
                            animate={{ x: "150px", opacity: 1 }}
                            exit={{ x: 0, opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {createMatrix("U").flat()}
                        </motion.div>
                    </>
                )}

                {/* Combine back to A */}
                {step === 2 && (
                    <motion.div
                        className="grid grid-cols-4 gap-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 1 }}
                    >
                        {createMatrix("A").flat()}
                    </motion.div>
                )}
            </div>

            {/* Dynamic Labels */}
            <div className="mt-4 text-lg font-semibold">
                {step === 0 && "Matrix A"}
                {step === 1 && (
                    <div className="flex space-x-4">
                        <span>Matrix L</span>
                        <span>Matrix U</span>
                    </div>
                )}
                {step === 2 && "Matrix A"}
            </div>
        </div>
    );
}
