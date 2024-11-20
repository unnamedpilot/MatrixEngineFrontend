import { motion } from "framer-motion";
import { pageTransition } from "../transitions";
import { CodeBracketIcon, VideoCameraIcon, DocumentTextIcon, CalculatorIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <motion.div
            className="text-purple-700 flex flex-col items-center justify-center"
            style={{ height: 'calc(100vh - 64px)' }}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
        >
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

                    {/* Botón de Evaluar Funciones */}
                    <Link
                        to="/evaluate-functions"
                        className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        <CalculatorIcon className="h-5 w-5" />
                        <span>Evaluar Funciones</span>
                    </Link>

                    {/* Botón de Desmos */}
                    <Link
                        to="/desmos"
                        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                        <ChartBarIcon className="h-5 w-5" />
                        <span>Visualizar con Desmos</span>
                    </Link>

                    {/* Botones para descargar PDFs */}
                    <a
                        href="/pdfs/documento1.pdf"
                        download
                        className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                        <DocumentTextIcon className="h-5 w-5" />
                        <span>Descargar PDF 1</span>
                    </a>
                    <a
                        href="/pdfs/documento2.pdf"
                        download
                        className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
                    >
                        <DocumentTextIcon className="h-5 w-5" />
                        <span>Descargar PDF 2</span>
                    </a>
                </div>
            </main>
        </motion.div>
    );
}
