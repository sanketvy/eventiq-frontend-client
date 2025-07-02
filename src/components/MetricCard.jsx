import {motion} from "framer-motion";
import {ArrowDown, ArrowUp} from "lucide-react";
import React from "react";

const MetricCard = ({ title, value, change, icon: Icon, color, suffix = '', prefix = '' }) => (
    <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300"
    >
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                {Math.abs(change)}%
            </div>
        </div>
        <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">
                {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </h3>
            <p className="text-slate-400 text-sm">{title}</p>
        </div>
    </motion.div>
);

export default MetricCard;