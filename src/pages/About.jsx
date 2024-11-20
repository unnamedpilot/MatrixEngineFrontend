import { motion } from "framer-motion";
import { pageTransition } from "../transitions";

export default function About() {
    return (
        <motion.div
            className="p-8 text-purple-700 h-screen flex flex-col justify-start items-start"
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
        >
            <h1 className="text-4xl font-bold">Acerca de Nosotros</h1>
            <p className="mt-4 text-lg">
                Somos MatrixEngine, una plataforma dedicada a soluciones numéricas.
            </p>
        </motion.div>
    );
}
