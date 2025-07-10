import {motion} from "framer-motion";
import {ArrowDown, ArrowUp} from "lucide-react";
import React from "react";
import {Line, LineChart, ResponsiveContainer} from "recharts";

const MetricCard = ({ title, value, change, icon: Icon, color, prefix = "", suffix = "", trend = [] }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 relative overflow-hidden"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`} />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8 text-slate-400" />
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        change >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                        {change >= 0 ? '+' : ''}{change}%
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-400">{title}</h3>
                    <p className="text-2xl font-bold text-white">
                        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                    </p>
                    {trend.length > 0 && (
                        <div className="h-8 mt-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trend}>
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={change >= 0 ? "#22c55e" : "#ef4444"}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MetricCard;