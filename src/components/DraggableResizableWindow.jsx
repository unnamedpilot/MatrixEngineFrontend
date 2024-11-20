import React, { useState, useEffect } from "react";

export default function DraggableResizableWindow({ children, title, onClose }) {
    const [windowState, setWindowState] = useState({
        x: 100, // Initial position
        y: 100,
        width: 400, // Initial size
        height: 300,
        isDragging: false,
        isResizing: false,
        offsetX: 0,
        offsetY: 0,
    });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (windowState.isDragging) {
                setWindowState((prev) => ({
                    ...prev,
                    x: Math.max(0, e.clientX - prev.offsetX),
                    y: Math.max(0, e.clientY - prev.offsetY),
                }));
            }
            if (windowState.isResizing) {
                setWindowState((prev) => ({
                    ...prev,
                    width: Math.max(200, e.clientX - prev.x), // Minimum width
                    height: Math.max(150, e.clientY - prev.y), // Minimum height
                }));
            }
        };

        const handleMouseUp = () => {
            if (windowState.isDragging || windowState.isResizing) {
                setWindowState((prev) => ({
                    ...prev,
                    isDragging: false,
                    isResizing: false,
                }));
            }
        };

        // Attach listeners globally
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [windowState.isDragging, windowState.isResizing]);

    const startDragging = (e) => {
        setWindowState((prev) => ({
            ...prev,
            isDragging: true,
            offsetX: e.clientX - prev.x,
            offsetY: e.clientY - prev.y,
        }));
    };

    const startResizing = (e) => {
        setWindowState((prev) => ({
            ...prev,
            isResizing: true,
        }));
    };

    return (
        <div
            className="fixed bg-white shadow-lg z-50"
            style={{
                top: `${windowState.y}px`,
                left: `${windowState.x}px`,
                width: `${Math.min(windowState.width, window.innerWidth - windowState.x - 20)}px`,
                height: `${Math.min(windowState.height, window.innerHeight - windowState.y - 20)}px`,
                maxWidth: "90%",
                maxHeight: "90%",
            }}
        >
            {/* Header for dragging */}
            <div
                className="bg-purple-500 text-white p-2 cursor-move flex justify-between items-center"
                onMouseDown={startDragging}
            >
                <span>{title || "Window"}</span>
                <button
                    onClick={onClose}
                    className="text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                    title="Close"
                >
                    ✖
                </button>
            </div>

            <div className="p-4 h-full w-full">
                {children}
            </div>

            {/* Resizing Handle */}
            <div
                className="absolute bottom-0 right-0 w-4 h-4 bg-purple-500 cursor-se-resize"
                onMouseDown={startResizing}
            />
        </div>
    );
}
