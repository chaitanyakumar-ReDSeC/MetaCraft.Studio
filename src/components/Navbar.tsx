import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  onLoadSample: () => void;
  onClear: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoadSample,
  onClear,
}) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-[#0d0e12] border-b border-[#1f2128] sticky top-0 z-40 shadow-md select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Name - Beside MetaCraft Studio directly with no container box */}
        <div className="flex items-center gap-3">
          <img
            src="https://raw.githubusercontent.com/chaitanyakumar-ReDSeC/asset-vault/main/repositories/MetaCraft.Studio/imgs/MetaCraft.Studio.png"
            alt="MetaCraft Studio Logo"
            referrerPolicy="no-referrer"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain shrink-0 select-none"
          />
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white leading-none">
            MetaCraft Studio
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            id="btn-nav-load-sample"
            onClick={onLoadSample}
            className="text-xs text-zinc-300 hover:text-white bg-[#14151b] hover:bg-[#1f2129] border border-zinc-800 hover:border-zinc-700 px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer font-medium"
            title="Populate core fields (Company, Author, Copyright, Versions) with sample data"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C20000]" />
            <span>Load Sample Data</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            id="btn-nav-clear"
            onClick={onClear}
            className="text-xs text-zinc-300 hover:text-white bg-[#14151b] hover:bg-[#1f2129] border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer font-medium"
            title="Clear all custom input fields"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-400" />
            <span>Clear Fields</span>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};
