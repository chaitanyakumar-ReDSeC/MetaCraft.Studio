import React, { useState } from 'react';
import { Copy, Check, FileText, Download } from 'lucide-react';

interface CodePreviewProps {
  code: string;
  filename: string;
  onCopy: () => void;
  isCopied: boolean;
  onDownload: () => void;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  filename,
  onCopy,
  isCopied,
  onDownload,
}) => {
  const [wrap, setWrap] = useState(false);

  // Syntax highlighting for Python VSVersionInfo text
  const renderHighlightedCode = () => {
    const lines = code.split('\n');
    return lines.map((line, idx) => {
      // Highlight comments (# ...)
      if (line.trim().startsWith('#')) {
        return (
          <div key={idx} className="table-row">
            <span className="table-cell select-none text-right pr-4 text-zinc-600 text-[11px]">
              {idx + 1}
            </span>
            <span className="table-cell text-zinc-500 italic">{line}</span>
          </div>
        );
      }

      // Format StringStruct or keywords
      let formattedLine: React.ReactNode = line;

      // Colorize known keywords: VSVersionInfo, FixedFileInfo, StringFileInfo, StringTable, StringStruct, VarFileInfo, VarStruct
      const parts = line.split(/(StringStruct|VSVersionInfo|FixedFileInfo|StringFileInfo|StringTable|VarFileInfo|VarStruct|u'[^']*'|'[^']*'|\b0x[0-9a-fA-F]+\b|\b\d+\b)/g);

      formattedLine = parts.map((part, pIdx) => {
        if (!part) return null;
        if (
          part === 'VSVersionInfo' ||
          part === 'FixedFileInfo' ||
          part === 'StringFileInfo' ||
          part === 'StringTable' ||
          part === 'VarFileInfo'
        ) {
          return (
            <span key={pIdx} className="text-[#f87171] font-semibold">
              {part}
            </span>
          );
        }
        if (part === 'StringStruct' || part === 'VarStruct') {
          return (
            <span key={pIdx} className="text-[#e62626] font-medium">
              {part}
            </span>
          );
        }
        if (part.startsWith("u'") || part.startsWith("'")) {
          return (
            <span key={pIdx} className="text-zinc-200">
              {part}
            </span>
          );
        }
        if (part.startsWith('0x') || /^\d+$/.test(part)) {
          return (
            <span key={pIdx} className="text-amber-400 font-mono">
              {part}
            </span>
          );
        }
        if (part.startsWith('#')) {
          return (
            <span key={pIdx} className="text-zinc-500 italic">
              {part}
            </span>
          );
        }
        return <span key={pIdx} className="text-zinc-400">{part}</span>;
      });

      return (
        <div key={idx} className="table-row hover:bg-zinc-800/30">
          <span className="table-cell select-none text-right pr-4 text-zinc-600 text-[11px]">
            {idx + 1}
          </span>
          <span className="table-cell">{formattedLine}</span>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0e12] border border-[#1f2128] rounded-xl overflow-hidden shadow-xl">
      {/* Code Header Bar */}
      <div className="bg-[#121318] border-b border-zinc-800 px-3 py-2 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-[#C20000]" />
          <span className="text-xs font-mono text-zinc-300">
            {filename || 'version_info.txt'}
          </span>
          <span className="text-[10px] bg-zinc-800/80 text-zinc-400 px-1.5 py-0.5 rounded font-mono">
            UTF-8
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="btn-toggle-wrap"
            onClick={() => setWrap(!wrap)}
            className="text-[11px] text-zinc-400 hover:text-white px-2 py-0.5 rounded hover:bg-zinc-800 transition-colors"
          >
            {wrap ? 'No Wrap' : 'Soft Wrap'}
          </button>

          <button
            id="btn-code-copy"
            onClick={onCopy}
            className={`text-xs px-2.5 py-1 rounded flex items-center gap-1.5 transition-colors ${
              isCopied
                ? 'bg-emerald-600 text-white'
                : 'bg-[#1c1d24] hover:bg-zinc-800 text-zinc-200 border border-zinc-700'
            }`}
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div 
        className={`flex-1 p-3 overflow-auto font-mono text-xs leading-relaxed text-left bg-[#090a0d] ${
          wrap ? 'whitespace-pre-wrap' : 'whitespace-pre'
        }`}
      >
        <div className="table w-full border-collapse">
          {renderHighlightedCode()}
        </div>
      </div>
    </div>
  );
};
