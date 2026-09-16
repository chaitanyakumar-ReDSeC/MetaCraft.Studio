import React, { useState, useMemo } from 'react';
import { MetadataState } from './types';
import { INITIAL_METADATA } from './data/constants';
import { Navbar } from './components/Navbar';
import { MetadataForm } from './components/MetadataForm';
import { VisualCard } from './components/VisualCard';
import { CodePreview } from './components/CodePreview';
import { ActionBar } from './components/ActionBar';
import { FieldTooltip } from './components/FieldTooltip';
import { 
  generateVersionInfoText, 
  downloadVersionInfoFile,
  getEffectiveOutputFilename 
} from './utils/versionFormatter';
import { Eye, Code2, Columns2, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [metadata, setMetadata] = useState<MetadataState>(INITIAL_METADATA);
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'split'>('visual');
  const [activeHelpKey, setActiveHelpKey] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Live generated VSVersionInfo text formatted in real time
  const generatedCode = useMemo(() => {
    return generateVersionInfoText(metadata);
  }, [metadata]);

  const effectiveFilename = useMemo(() => {
    return getEffectiveOutputFilename(metadata);
  }, [metadata]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setIsCopied(true);
      showToast('VSVersionInfo .txt copied to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(() => {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = generatedCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setIsCopied(true);
      showToast('VSVersionInfo .txt copied to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    downloadVersionInfoFile(effectiveFilename, generatedCode);
    showToast(`Downloaded ${effectiveFilename}`, 'success');
  };

  const handleClear = () => {
    setMetadata(INITIAL_METADATA);
    showToast('All custom fields cleared to placeholders', 'info');
  };

  const handleLoadSample = () => {
    // Load ONLY Company Name, Author, LegalCopyright, FileVersion, Product Version
    setMetadata((prev) => ({
      ...prev,
      companyName: 'Chaitanya Kumar Sathivada',
      author: 'Chaitanya Kumar Sathivada',
      legalCopyright: 'Copyright © Chaitanya Kumar Sathivada. All Rights Reserved.',
      fileVersion: '1.0.0.0',
      productVersion: '1.0.0.0',
      fileversTuple: [1, 0, 0, 0],
      prodversTuple: [1, 0, 0, 0],
    }));
    showToast('Loaded sample Company, Author, Copyright, and Versions', 'info');
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col selection:bg-[#C20000] selection:text-white font-sans">
      {/* Toast Notification with AnimatePresence */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-20 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-2xl text-xs font-medium border ${
              toastMessage.type === 'success'
                ? 'bg-[#101b14] text-emerald-300 border-emerald-800/80 shadow-emerald-950/60'
                : 'bg-[#17141f] text-zinc-200 border-zinc-700 shadow-black/80'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#C20000]" />
            )}
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proper Web Application Navbar (Copy & Download removed) */}
      <Navbar
        onLoadSample={handleLoadSample}
        onClear={handleClear}
      />

      {/* Main Web Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 w-full flex-1 flex flex-col">
        {/* Two-Column Form & Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 flex-1 items-stretch">
          {/* Left Column: Form Fields */}
          <div className="flex flex-col min-h-[550px] lg:min-h-0">
            <MetadataForm
              metadata={metadata}
              onChange={setMetadata}
              onOpenHelp={(key) => setActiveHelpKey(key)}
            />
          </div>

          {/* Right Column: Visual Card / Live Text Preview */}
          <div className="flex flex-col min-h-[550px] lg:min-h-0">
            {/* View Switcher Header Bar */}
            <div className="flex items-center justify-between pb-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  Metadata Visual Card
                </h2>
                <span className="text-[11px] font-normal text-zinc-400 hidden sm:inline">
                  (Live Real-time Preview)
                </span>
              </div>

              {/* View Mode Switcher */}
              <div className="flex items-center bg-[#14151b] border border-[#272832] rounded-lg p-0.5 text-xs">
                <button
                  type="button"
                  id="btn-view-visual"
                  onClick={() => setActiveTab('visual')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'visual'
                      ? 'bg-[#C20000] text-white shadow-xs font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Properties Overview Visual Card"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visual Card</span>
                </button>

                <button
                  type="button"
                  id="btn-view-code"
                  onClick={() => setActiveTab('code')}
                  className={`px-3 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'code'
                      ? 'bg-[#C20000] text-white shadow-xs font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Live VSVersionInfo .txt Code"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>.txt Code</span>
                </button>

                <button
                  type="button"
                  id="btn-view-split"
                  onClick={() => setActiveTab('split')}
                  className={`hidden sm:flex px-2.5 py-1 rounded-md font-medium transition-colors items-center gap-1.5 cursor-pointer ${
                    activeTab === 'split'
                      ? 'bg-[#C20000] text-white shadow-xs font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Split side-by-side view"
                >
                  <Columns2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dynamic Preview Container with Tab Transitions */}
            <div className="flex-1 min-h-[460px] flex flex-col">
              <AnimatePresence mode="wait">
                {activeTab === 'visual' && (
                  <motion.div 
                    key="tab-visual"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="h-full flex flex-col"
                  >
                    <VisualCard metadata={metadata} />
                  </motion.div>
                )}

                {activeTab === 'code' && (
                  <motion.div 
                    key="tab-code"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="h-full flex flex-col"
                  >
                    <CodePreview
                      code={generatedCode}
                      filename={effectiveFilename}
                      onCopy={handleCopy}
                      isCopied={isCopied}
                      onDownload={handleDownload}
                    />
                  </motion.div>
                )}

                {activeTab === 'split' && (
                  <motion.div 
                    key="tab-split"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full"
                  >
                    <div className="h-full">
                      <VisualCard metadata={metadata} />
                    </div>
                    <div className="h-full">
                      <CodePreview
                        code={generatedCode}
                        filename={effectiveFilename}
                        onCopy={handleCopy}
                        isCopied={isCopied}
                        onDownload={handleDownload}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Action Bar */}
            <ActionBar
              onGenerateDownload={handleDownload}
              onCopy={handleCopy}
              isCopied={isCopied}
            />
          </div>
        </div>
      </main>

      {/* Clean Subtle Footer */}
      <footer className="w-full border-t border-[#1a1b22] bg-[#090a0d] py-3 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Color scheme: Black, White, and Red (<span className="text-[#e62626] font-mono">#C20000</span>)
          </span>
          <span>
            Windows PE <span className="font-mono text-zinc-400">VSVersionInfo</span> Data Generator
          </span>
        </div>
      </footer>

      {/* Field Help Tooltip Modal */}
      <FieldTooltip
        fieldKey={activeHelpKey || ''}
        isOpen={Boolean(activeHelpKey)}
        onClose={() => setActiveHelpKey(null)}
      />
    </div>
  );
}
