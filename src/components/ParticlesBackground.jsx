import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
    const [init, setInit] = useState(false);

    // Inicializa el motor de partículas
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine); // Carga las configuraciones necesarias
        }).then(() => {
            setInit(true); // Marca como inicializado
        });
    }, []);

    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "transparent", // Fondo transparente para no bloquear el diseño
                },
            },
            fpsLimit: 60, // Límite de FPS
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse", // Repulsión al pasar el mouse
                    },
                    onClick: {
                        enable: true,
                        mode: "push", // Añadir partículas al hacer clic
                    },
                },
                modes: {
                    repulse: {
                        distance: 100, // Distancia de repulsión
                        duration: 0.4,
                    },
                    push: {
                        quantity: 4,
                    },
                },
            },
            particles: {
                number: {
                    value: 100, // Cantidad de partículas
                    density: {
                        enable: true,
                        area: 800,
                    },
                },
                color: {
                    value: "#a855f7", // Color morado
                },
                shape: {
                    type: "circle",
                },
                opacity: {
                    value: 0.6,
                },
                size: {
                    value: { min: 1, max: 3 },
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out", // Las partículas salen de la pantalla
                    },
                },
            },
            detectRetina: true,
        }),
        []
    );

    if (!init) {
        // Muestra un contenedor vacío hasta que se inicialice
        return <></>;
    }

    return (
        <Particles
            id="tsparticles"
            options={options}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh", // Asegura que ocupe toda la pantalla
                zIndex: -1, // Envía al fondo
            }}
        />
    );
}
