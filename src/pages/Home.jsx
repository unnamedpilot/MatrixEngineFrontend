import { motion } from "framer-motion";
import { pageTransition } from "../transitions";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import { VideoCameraIcon } from "@heroicons/react/24/solid";

export default function Home() {
    return (
        <motion.div
            className="text-purple-700 flex flex-col items-center justify-center"
            style={{ height: 'calc(100vh - 64px)' }} // Calcula la altura restando el header
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
        >
            {/* Contenido principal */}
            <main className="text-center">
                {/* Título principal */}
                <h1 className="text-5xl font-bold mb-6">
                    Bienvenido a <span className="text-purple-500">MatrixEngine</span>
                </h1>

                {/* Descripción */}
                <p className="text-lg text-gray-600 mb-8">
                    Soluciones avanzadas para tus problemas numéricos.
                </p>

                {/* Botones */}
                <div className="flex flex-wrap justify-center gap-4">
                    {/* Botón de GitHub */}
                    <a
                        href="https://github.com/tu-repositorio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition"
                    >
                        <CodeBracketIcon className="h-5 w-5" />
                        <span>GitHub del Proyecto</span>
                    </a>

                    {/* Botón de Guía de Usuario */}
                    <a
                        href="/guia-de-usuario"
                        className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
                    >
                        <VideoCameraIcon className="h-5 w-5" />
                        <span>Guía de Usuario</span>
                    </a>
                </div>
            </main>
        </motion.div>
    );
}
