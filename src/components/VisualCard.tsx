import React from 'react';
import { MetadataState } from '../types';
import { 
  formatNormalizedVersion, 
  ensureExeExtension,
  getEffectiveOutputFilename 
} from '../utils/versionFormatter';
import { motion } from 'motion/react';

interface VisualCardProps {
  metadata: MetadataState;
}

export const VisualCard: React.FC<VisualCardProps> = ({ metadata }) => {
  const getDisplayValue = (val?: string) => {
    if (!val || val.trim() === '') {
      return { text: '[Not Set]', isUnset: true };
    }
    return { text: val, isUnset: false };
  };

  const getVersionDisplay = (val?: string) => {
    if (!val || val.trim() === '') {
      return { text: '[Not Set]', isUnset: true };
    }
    const norm = formatNormalizedVersion(val);
    return { 
      text: norm, 
      isUnset: false 
    };
  };

  const getOriginalFilenameDisplay = (val?: string) => {
    if (!val || val.trim() === '') {
      return { text: '[Not Set]', isUnset: true };
    }
    return { text: ensureExeExtension(val), isUnset: false };
  };

  interface PropertyItem {
    key: string;
    text: string;
    isUnset: boolean;
    isAlwaysActive?: boolean;
    isMandatory?: boolean;
  }

  const effectiveOutput = getEffectiveOutputFilename(metadata);

  const properties: PropertyItem[] = [
    { key: 'Output File:', text: effectiveOutput, isUnset: false, isAlwaysActive: true },
    { key: 'Product Name:', ...getDisplayValue(metadata.productName), isMandatory: true },
    { key: 'File Description:', ...getDisplayValue(metadata.fileDescription), isMandatory: true },
    { key: 'Company Name:', ...getDisplayValue(metadata.companyName), isMandatory: true },
    { key: 'Author:', ...getDisplayValue(metadata.author), isMandatory: true },
    { key: 'File Version:', ...getVersionDisplay(metadata.fileVersion), isMandatory: true },
    { key: 'Product Version:', ...getVersionDisplay(metadata.productVersion), isMandatory: true },
    { key: 'Original Filename:', ...getOriginalFilenameDisplay(metadata.originalFilename), isMandatory: true },
    { key: 'Internal Name:', ...getDisplayValue(metadata.internalName), isMandatory: true },
    { key: 'Legal Copyright:', ...getDisplayValue(metadata.legalCopyright), isMandatory: true },
    { key: 'Repository URL:', ...getDisplayValue(metadata.repositoryUrl) },
    { key: 'Legal Trademarks:', ...getDisplayValue(metadata.legalTrademarks) },
    { key: 'Comments:', ...getDisplayValue(metadata.comments) },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-[#0d0e12] border border-[#1f2128] rounded-xl p-4 sm:p-5 shadow-xl"
    >
      {/* Red Capsule Header */}
      <div 
        id="properties-overview-pill"
        className="w-full py-2 bg-[#C20000] text-white text-center font-bold text-xs sm:text-sm tracking-wide rounded-lg shadow-md shadow-[#C20000]/25 mb-4 select-none"
      >
        Properties Overview
      </div>

      {/* Properties List */}
      <div 
        id="properties-list-container"
        className="flex-1 overflow-y-auto pr-2 space-y-3 text-left text-xs sm:text-[13px]"
      >
        {properties.map((item, index) => {
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.015 }}
              className="flex items-baseline gap-3 py-0.5 border-b border-zinc-900/40 last:border-0"
            >
              <span className="w-34 sm:w-38 shrink-0 font-medium text-[#e62626] flex items-center">
                <span>{item.key}</span>
                {item.isMandatory && (
                  <span className="text-[#e62626] text-xs ml-0.5" title="Mandatory Field">*</span>
                )}
              </span>
              <span 
                className={`flex-1 break-words font-normal leading-relaxed ${
                  item.isUnset && !item.isAlwaysActive ? 'text-zinc-500 italic' : 'text-zinc-100'
                }`}
              >
                {item.text}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
