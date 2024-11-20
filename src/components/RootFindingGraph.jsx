import React from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function RootFindingGraph({ results }) {
    if (!results) {
        return <p className="text-center text-gray-500">No data to display.</p>;
    }

    // Prepare data for the graph
    const iterations = results.iteraciones.map((iter) => iter.iteracion);
    const x0Values = results.iteraciones.map((iter) => iter.x0);
    const x1Values = results.iteraciones.map((iter) => iter.x1);
    const fX0Values = results.iteraciones.map((iter) => iter.f_x0);
    const fX1Values = results.iteraciones.map((iter) => iter.f_x1);

    const data = {
        labels: iterations,
        datasets: [
            {
                label: "x0",
                data: x0Values,
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                tension: 0.4,
            },
            {
                label: "x1",
                data: x1Values,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
            {
                label: "f(x0)",
                data: fX0Values,
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
            },
            {
                label: "f(x1)",
                data: fX1Values,
                borderColor: "rgb(255, 206, 86)",
                backgroundColor: "rgba(255, 206, 86, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true, // Enables responsiveness
        maintainAspectRatio: false, // Ensures it fills the container
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Root-Finding Iterations",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Iteration",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Values",
                },
            },
        },
    };

    return (
        <div className="h-full w-full">
            <Line data={data} options={options} />
        </div>
    );
}
