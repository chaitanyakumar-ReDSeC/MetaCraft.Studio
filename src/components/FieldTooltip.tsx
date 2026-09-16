import React from 'react';
import { HelpCircle, X, Info } from 'lucide-react';
import { FIELD_HELP_DATA } from '../data/constants';

interface FieldTooltipProps {
  fieldKey: string;
  isOpen: boolean;
  onClose: () => void;
}

export const FieldTooltip: React.FC<FieldTooltipProps> = ({ fieldKey, isOpen, onClose }) => {
  if (!isOpen) return null;
  const help = FIELD_HELP_DATA[fieldKey] || {
    label: fieldKey,
    description: 'Windows PE VSVersionInfo metadata field.',
    windowsUsage: 'Used by the Windows operating system to display file characteristics and properties.',
    example: '',
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#121318] border border-zinc-800 rounded-xl shadow-2xl p-5 text-left text-zinc-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="btn-close-tooltip"
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-md hover:bg-zinc-800 transition-colors"
          aria-label="Close Help"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded bg-[#C20000]/20 border border-[#C20000]/40 flex items-center justify-center text-[#C20000]">
            <HelpCircle className="w-3.5 h-3.5" />
          </div>
          <h4 className="text-base font-semibold text-white">{help.label}</h4>
          <span className="text-[11px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
            {fieldKey}
          </span>
        </div>

        <p className="text-sm text-zinc-300 mb-4 leading-relaxed">
          {help.description}
        </p>

        <div className="space-y-2.5 text-xs bg-[#0b0c10] border border-zinc-800/80 rounded-lg p-3">
          <div>
            <span className="font-medium text-[#C20000] block mb-0.5">Windows PE Placement:</span>
            <span className="text-zinc-300 leading-normal">{help.windowsUsage}</span>
          </div>

          {help.example && (
            <div>
              <span className="font-medium text-zinc-400 block mb-0.5">Recommended Example:</span>
              <code className="text-zinc-200 font-mono text-[11px] bg-[#16171d] px-2 py-1 rounded block overflow-x-auto border border-zinc-800">
                {help.example}
              </code>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs font-medium px-3.5 py-1.5 bg-[#C20000] hover:bg-[#a60000] text-white rounded-md transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
