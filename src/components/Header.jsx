import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BoltIcon } from "@heroicons/react/24/solid"; // Ícono de rayo de Heroicons

export default function Header() {
    const [, setIsMenuOpen] = useState(false);

    return (
        <motion.header
            className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-md text-purple-700 py-4 shadow-md z-50 h-16"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Logo con ícono de rayo */}
                <Link to="/" className="flex items-center space-x-2">
                    <BoltIcon className="h-8 w-8 text-purple-500" /> {/* Ícono de rayo */}
                    <span className="text-2xl font-bold tracking-wide">
            Matrix<span className="text-purple-500">Engine</span>
          </span>
                </Link>

                {/* Navegación */}
                <nav className="flex space-x-6 relative">
                    <Link
                        to="/about"
                        className="text-purple-700 hover:text-purple-500 transition"
                    >
                        Acerca de Nosotros
                    </Link>
                    <div
                        className="relative group"
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        <Link
                            to="/methods"
                            className="text-purple-700 hover:text-purple-500 transition"
                        >
                            Métodos Numéricos
                        </Link>
                    </div>
                </nav>
            </div>
        </motion.header>
    );
}
