import { useState, useEffect } from 'react';
import { User, Lock, ArrowRight, Loader, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorModal from './ErrorModal';
import bgImage from '../assets/messi-world-cup.jpg';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false); // State for toggle

    const VALID_USER = "ADRIANO";
    const VALID_PASS = "12345";

    // Trigger onLogin after success animation
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                if (onLogin) onLogin();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, onLogin]);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            if (username === VALID_USER && password === VALID_PASS) {
                setIsSuccess(true);
            } else {
                setShowError(true);
                setPassword('');
            }
            setIsLoading(false);
        }, 1500);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Mock change password logic
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsChangingPassword(false);
            // In a real app, you would show a success message here
        }, 1500);
    };

    // Success View
    if (isSuccess) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 relative overflow-hidden font-sans">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-gray-900 to-black animate-bg-shift"></div>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="z-10 bg-white/5 backdrop-blur-2xl p-12 rounded-[2rem] border border-white/10 text-center shadow-[0_0_50px_rgba(79,70,229,0.3)]"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30"
                    >
                        <ShieldCheck size={48} className="text-green-400" />
                    </motion.div>
                    <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Bienvenido</h1>
                    <h2 className="text-2xl font-light text-indigo-200 mb-6">{VALID_USER}</h2>
                    <p className="text-white/60">Autenticación Exitosa</p>
                </motion.div>
            </div>
        )
    }

    // Login View
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-950 relative overflow-hidden font-sans selection:bg-indigo-500/30">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt="Background"
                    className="w-full h-full object-cover animate-bg-shift"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
            </div>

            {/* Animated Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-float pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] animate-float-reverse pointer-events-none mix-blend-screen"></div>
            <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-pulse pointer-events-none mix-blend-screen"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 pointer-events-none"></div>

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-[420px] p-6"
            >
                <div className="glass rounded-3xl p-8 sm:p-10 border border-white/10 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] bg-gradient-to-b from-white/10 to-transparent">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block p-3 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-4 border border-white/5 shadow-inner"
                        >
                            <Lock className="w-8 h-8 text-indigo-400" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                            {isChangingPassword ? "Cambiar Contraseña" : "Bienvenido de nuevo"}
                        </h2>
                        <p className="text-indigo-200/60 text-sm">
                            {isChangingPassword ? "Ingresa tu nueva contraseña" : "Inicia sesión para continuar"}
                        </p>
                    </div>

                    {/* Change Password Form */}
                    {isChangingPassword ? (
                        <form onSubmit={handleChangePassword} className="space-y-6">
                            {/* Old Password */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider ml-1">Contraseña Actual</label>
                                <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-indigo-500/20 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all shadow-inner focus:bg-black/40"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider ml-1">Nueva Contraseña</label>
                                <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-indigo-500/20 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all shadow-inner focus:bg-black/40"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading}
                                type="submit"
                                className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:via-violet-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out blur-md"></div>
                                <div className="relative flex items-center">
                                    {isLoading ? (
                                        <Loader className="animate-spin h-5 w-5" />
                                    ) : (
                                        <>
                                            <span className="mr-2 tracking-wide">Actualizar</span>
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </motion.button>
                            <button
                                type="button"
                                onClick={() => setIsChangingPassword(false)}
                                className="w-full text-center text-sm text-indigo-300/60 hover:text-indigo-300 transition-colors mt-4"
                            >
                                Volver al Inicio de Sesión
                            </button>
                        </form>
                    ) : (
                        // Login Form
                        <form onSubmit={handleLogin} className="space-y-6">

                            {/* Username Input */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider ml-1">Usuario</label>
                                <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-indigo-500/20 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all shadow-inner focus:bg-black/40"
                                        placeholder="Ingrese usuario"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2 group">
                                <label className="text-xs font-semibold text-indigo-200/70 uppercase tracking-wider ml-1">Contraseña</label>
                                <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-indigo-300/50 group-focus-within:text-indigo-400 transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-4 bg-black/20 border border-indigo-500/20 rounded-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all shadow-inner focus:bg-black/40"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isLoading}
                                type="submit"
                                className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:via-violet-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out blur-md"></div>
                                <div className="relative flex items-center">
                                    {isLoading ? (
                                        <Loader className="animate-spin h-5 w-5" />
                                    ) : (
                                        <>
                                            <span className="mr-2 tracking-wide">Iniciar Sesión</span>
                                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </motion.button>

                            <button
                                type="button"
                                onClick={() => setIsChangingPassword(true)}
                                className="w-full text-center text-sm text-indigo-300/60 hover:text-indigo-300 transition-colors mt-4"
                            >
                                ¿Olvidaste tu contraseña? / Cambiar Contraseña
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>

            <ErrorModal
                isOpen={showError}
                onClose={() => setShowError(false)}
                message="Usuario o Contraseña inválidos."
            />
        </div>
    );
};

export default Login;
