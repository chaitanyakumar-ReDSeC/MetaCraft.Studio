import React from 'react';
import { Copy, Download, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ActionBarProps {
  onGenerateDownload: () => void;
  onCopy: () => void;
  isCopied: boolean;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  onGenerateDownload,
  onCopy,
  isCopied,
}) => {
  return (
    <div className="flex items-center justify-end gap-3 pt-3 select-none">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        id="btn-action-copy"
        onClick={onCopy}
        className={`px-4 py-2 border rounded-lg text-xs sm:text-sm font-medium transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
          isCopied
            ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500'
            : 'bg-[#14151b] hover:bg-[#1f2129] text-zinc-200 hover:text-white border-[#2b2d38] hover:border-zinc-600'
        }`}
        title="Copy the full VSVersionInfo text to clipboard"
      >
        {isCopied ? (
          <>
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Copied .txt</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-zinc-400" />
            <span>Copy .txt</span>
          </>
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        id="btn-generate-txt-file"
        onClick={onGenerateDownload}
        className="px-5 py-2 bg-[#C20000] hover:bg-[#a50000] text-white font-semibold rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-[#C20000]/30 flex items-center gap-2 cursor-pointer"
        title="Download the generated version_info.txt file"
      >
        <Download className="w-4 h-4 text-white" />
        <span>Generate .txt File</span>
      </motion.button>
    </div>
  );
};
