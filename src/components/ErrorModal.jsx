import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, X } from 'lucide-react';

const ErrorModal = ({ isOpen, onClose, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="relative p-6 text-center">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="mx-auto mb-4 bg-red-500/20 w-16 h-16 rounded-full flex items-center justify-center border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                                <XCircle size={32} className="text-red-500 drop-shadow-md" />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Acceso Denegado</h3>
                            <p className="text-white/80 mb-6">{message || "Las credenciales son incorrectas."}</p>

                            <button
                                onClick={onClose}
                                className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-red-500/25"
                            >
                                Intentar de Nuevo
                            </button>
                        </div>

                        {/* Elegant bottom accent line */}
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-70"></div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ErrorModal;
