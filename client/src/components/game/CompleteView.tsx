import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';

export function CompleteView() {
    const heistResult = useGameStore((state) => state.heistResult);
    
    const isWinner = heistResult?.isWinner ?? false;
    const position = heistResult?.position ?? 1;
    const totalSquads = heistResult?.totalSquads ?? 1;
    const tasksCompleted = heistResult?.tasksCompleted ?? 3;

    const getPositionSuffix = (pos: number) => {
        if (pos === 1) return 'st';
        if (pos === 2) return 'nd';
        if (pos === 3) return 'rd';
        return 'th';
    };

    const getTaskDescription = (tasks: number) => {
        switch (tasks) {
            case 0: return 'Still in formation phase';
            case 1: return 'Completed Signal Jammer';
            case 2: return 'Completed Tumbler Lock';
            case 3: return 'Completed Getaway';
            default: return '';
        }
    };

    if (isWinner) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-slate-900 cyber-grid flex flex-col items-center justify-center p-4 relative overflow-hidden"
            >
                {Array.from({ length: 50 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute w-3 h-3 rounded-full ${
                            i % 4 === 0 ? 'bg-yellow-400' : 
                            i % 4 === 1 ? 'bg-cyan-400' : 
                            i % 4 === 2 ? 'bg-green-400' : 'bg-pink-400'
                        }`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 1, 0],
                            y: [0, -150 - Math.random() * 150],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 2.5 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="text-center z-10"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="text-8xl mb-6"
                    >
                        🏆
                    </motion.div>

                    <motion.h1
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(234, 179, 8, 0.8)',
                                '0 0 60px rgba(234, 179, 8, 1)',
                                '0 0 20px rgba(234, 179, 8, 0.8)',
                            ],
                        }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-5xl md:text-6xl font-bold text-yellow-400 tracking-widest mb-4"
                    >
                        HEIST COMPLETE
                    </motion.h1>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-28 h-28 border-4 border-yellow-400 rounded-full mx-auto mb-6 flex items-center justify-center bg-yellow-400/20"
                    >
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl font-bold text-yellow-400"
                        >
                            #1
                        </motion.span>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-green-400 text-2xl mb-2 font-bold tracking-wider"
                    >
                        FIRST PLACE EXTRACTION
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="text-cyan-400 text-lg"
                    >
                        Your squad escaped before all others!
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="text-slate-400 text-sm mt-4"
                    >
                        {totalSquads} squad{totalSquads > 1 ? 's' : ''} in this heist
                    </motion.p>
                </motion.div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute w-64 h-64 border-2 border-yellow-400/30 rounded-full"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 2.5 + i, opacity: [0.5, 0] }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: i * 0.5,
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-slate-900 cyber-grid flex flex-col items-center justify-center p-4 relative overflow-hidden"
        >
            {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-red-500/50"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.5, 0],
                        y: [0, -50],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}

            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-center z-10"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="text-6xl mb-6"
                >
                    {position === 2 ? '🥈' : position === 3 ? '🥉' : '🚨'}
                </motion.div>

                <motion.h1
                    animate={{
                        textShadow: [
                            '0 0 10px rgba(239, 68, 68, 0.6)',
                            '0 0 30px rgba(239, 68, 68, 0.8)',
                            '0 0 10px rgba(239, 68, 68, 0.6)',
                        ],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-4xl md:text-5xl font-bold text-red-400 tracking-widest mb-4"
                >
                    HEIST FAILURE
                </motion.h1>

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="w-24 h-24 border-4 border-slate-500 rounded-full mx-auto mb-6 flex items-center justify-center bg-slate-800"
                >
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl font-bold text-slate-400"
                    >
                        #{position}
                    </motion.span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-slate-300 text-xl mb-2"
                >
                    {position}{getPositionSuffix(position)} PLACE
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-cyan-400 text-lg mb-4"
                >
                    {getTaskDescription(tasksCompleted)}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 max-w-xs mx-auto"
                >
                    <p className="text-slate-500 text-sm mb-2">PERFORMANCE</p>
                    <div className="flex justify-between items-center">
                        <span className="text-slate-400">Position</span>
                        <span className="text-white font-bold">{position} / {totalSquads}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-slate-400">Tasks</span>
                        <span className="text-white font-bold">{tasksCompleted} / 3</span>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3 }}
                    className="text-slate-500 text-sm mt-6"
                >
                    Another squad beat you to the exit
                </motion.p>
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute w-64 h-64 border-2 border-red-400/20 rounded-full"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 2 + i, opacity: [0.3, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 0.7,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}
