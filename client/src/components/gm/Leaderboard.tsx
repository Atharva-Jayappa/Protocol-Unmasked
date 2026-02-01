import { motion, AnimatePresence } from 'framer-motion';

interface LeaderboardEntry {
    id: string;
    name: string;
    currentView: string;
    progressPercent: number;
    tasksCompleted: number;
    finishPosition: number | null;
    completedAt: number | null;
    playerCount: number;
    isComplete: boolean;
}

interface LeaderboardProps {
    entries: LeaderboardEntry[];
}

const BANK_SECTIONS = [
    { name: 'ENTRANCE', position: 0, color: '#64748b' },
    { name: 'LOBBY', position: 15, color: '#06b6d4' },
    { name: 'VAULT DOOR', position: 35, color: '#f59e0b' },
    { name: 'VAULT', position: 60, color: '#ec4899' },
    { name: 'ESCAPE', position: 85, color: '#22c55e' },
];

const SQUAD_COLORS = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
    '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#14b8a6',
];

export function Leaderboard({ entries }: LeaderboardProps) {
    return (
        <div className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-cyan-400 tracking-widest mb-6 text-center">
                HEIST PROGRESS
            </h2>

            <div className="relative mb-8">
                <svg viewBox="0 0 800 120" className="w-full h-auto">
                    <defs>
                        <linearGradient id="bankGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#0f172a" />
                        </linearGradient>
                    </defs>

                    <rect x="0" y="50" width="800" height="50" rx="4" fill="url(#bankGradient)" stroke="#334155" strokeWidth="2" />

                    {BANK_SECTIONS.map((section) => (
                        <g key={section.name}>
                            <line
                                x1={section.position * 8}
                                y1="45"
                                x2={section.position * 8}
                                y2="105"
                                stroke={section.color}
                                strokeWidth="2"
                                strokeDasharray="4,2"
                            />
                            <text
                                x={section.position * 8}
                                y="35"
                                fill={section.color}
                                fontSize="10"
                                textAnchor="middle"
                                fontFamily="monospace"
                            >
                                {section.name}
                            </text>
                        </g>
                    ))}

                    <g>
                        <rect x="750" y="40" width="45" height="70" fill="#22c55e" opacity="0.3" rx="4" />
                        <text x="772" y="80" fill="#22c55e" fontSize="10" textAnchor="middle" fontFamily="monospace">
                            EXIT
                        </text>
                    </g>
                </svg>
            </div>

            <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                    {entries.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            layout
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className={`relative overflow-hidden rounded-lg ${
                                entry.isComplete 
                                    ? 'border-2 border-green-400' 
                                    : 'border border-slate-600'
                            }`}
                        >
                            <div className="bg-slate-900/80 p-3 flex items-center gap-4">
                                <div 
                                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                                    style={{ backgroundColor: SQUAD_COLORS[index % SQUAD_COLORS.length] }}
                                >
                                    {entry.finishPosition || (index + 1)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-white tracking-wider">
                                            {entry.name}
                                        </span>
                                        <span className={`text-xs font-mono ${
                                            entry.isComplete ? 'text-green-400' : 'text-slate-400'
                                        }`}>
                                            {entry.isComplete 
                                                ? `#${entry.finishPosition} COMPLETE` 
                                                : entry.currentView.toUpperCase().replace('_', ' ')
                                            }
                                        </span>
                                    </div>

                                    <div className="relative h-6 bg-slate-700 rounded overflow-hidden">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 rounded"
                                            style={{ 
                                                backgroundColor: entry.isComplete 
                                                    ? '#22c55e' 
                                                    : SQUAD_COLORS[index % SQUAD_COLORS.length] 
                                            }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${entry.progressPercent}%` }}
                                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                        />

                                        <motion.div
                                            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg flex items-center justify-center"
                                            initial={{ left: 0 }}
                                            animate={{ left: `calc(${entry.progressPercent}% - 8px)` }}
                                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                        >
                                            <span className="text-[8px]">🏃</span>
                                        </motion.div>

                                        <div className="absolute inset-0 flex items-center px-2">
                                            <span className="text-xs text-white font-mono drop-shadow-lg">
                                                {entry.playerCount} players
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {entry.isComplete && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-2xl"
                                    >
                                        {entry.finishPosition === 1 ? '🏆' : entry.finishPosition === 2 ? '🥈' : entry.finishPosition === 3 ? '🥉' : '✓'}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {entries.length === 0 && (
                <div className="text-center text-slate-500 py-8 font-mono">
                    WAITING FOR SQUADS...
                </div>
            )}
        </div>
    );
}
