import { Outlet } from "react-router-dom";
import ParticlesBackground from "./ParticlesBackground";

export default function Layout() {
    return (
        <div className="relative">
            {/* Fondo animado */}
            <ParticlesBackground />

            {/* Contenedor principal con padding superior */}
            <div className="relative z-10 pt-16">
                <Outlet />
            </div>
        </div>
    );
}
