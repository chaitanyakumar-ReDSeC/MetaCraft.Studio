import React from 'react';
import { MetadataState } from '../types';
import { PLACEHOLDER_DEFAULTS } from '../data/constants';
import { 
  parseVersionTuple, 
  formatNormalizedVersion, 
  ensureExeExtension, 
  ensureTxtExtension,
  getEffectiveOutputFilename 
} from '../utils/versionFormatter';
import { motion } from 'motion/react';
import { FileOutput } from 'lucide-react';

interface MetadataFormProps {
  metadata: MetadataState;
  onChange: (updated: MetadataState) => void;
  onOpenHelp: (fieldKey: string) => void;
}

export const MetadataForm: React.FC<MetadataFormProps> = ({
  metadata,
  onChange,
  onOpenHelp,
}) => {
  const handleFieldChange = (field: keyof MetadataState, value: any) => {
    const updated = { ...metadata, [field]: value };

    // Auto-sync numeric tuples with rounding
    if (updated.syncNumericVersions) {
      if (field === 'fileVersion') {
        updated.fileversTuple = parseVersionTuple(value || PLACEHOLDER_DEFAULTS.fileVersion);
      } else if (field === 'productVersion') {
        updated.prodversTuple = parseVersionTuple(value || PLACEHOLDER_DEFAULTS.productVersion);
      }
    }

    onChange(updated);
  };

  const handleOriginalFilenameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !val.toLowerCase().endsWith('.exe')) {
      handleFieldChange('originalFilename', `${val}.exe`);
    }
  };

  const handleOutputFilenameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value.trim();
    if (val && !val.toLowerCase().endsWith('.txt')) {
      handleFieldChange('outputFilename', `${val}.txt`);
    }
  };

  const effectiveAutoFilename = getEffectiveOutputFilename(metadata);

  const renderInputRow = (
    label: string,
    fieldKey: keyof MetadataState,
    helpKey: string,
    placeholder: string,
    isMandatory = false,
    isVersionField = false,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  ) => {
    const rawValue = (metadata[fieldKey] as string) || '';

    return (
      <div className="group flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <label 
            htmlFor={`input-${String(fieldKey)}`}
            className="w-38 sm:w-44 shrink-0 text-xs sm:text-[13px] font-medium text-zinc-300 group-hover:text-white transition-colors flex items-center"
          >
            <span>{label}</span>
            {isMandatory && (
              <span className="text-[#e62626] font-bold ml-1 text-sm leading-none" title="Mandatory Field">
                *
              </span>
            )}
            <span className="text-zinc-500 ml-0.5">:</span>
          </label>
          <div className="flex-1 relative">
            <input
              id={`input-${String(fieldKey)}`}
              type="text"
              value={rawValue}
              onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
              onBlur={onBlur}
              placeholder={placeholder}
              className="w-full bg-[#121318] border border-[#272832] focus:border-[#C20000] focus:ring-1 focus:ring-[#C20000] rounded-md px-3 py-1.5 text-xs sm:text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none transition-all shadow-inner"
            />
          </div>
          <button
            type="button"
            id={`btn-help-${String(fieldKey)}`}
            onClick={() => onOpenHelp(helpKey)}
            className="w-6 h-6 shrink-0 rounded bg-[#171820] border border-zinc-800 hover:border-[#C20000] hover:text-[#C20000] text-zinc-400 flex items-center justify-center text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            title={`Help and Windows PE info for ${label}`}
            aria-label={`Help for ${label}`}
          >
            ?
          </button>
        </div>

        {/* Normalized version display underneath - PE tuple removed as requested */}
        {isVersionField && (
          <div className="pl-38 sm:pl-44 text-[11px] text-zinc-400 flex items-center gap-1.5 flex-wrap">
            <span className="text-zinc-500">Normalized:</span>
            <span className="font-mono text-[#e62626] font-medium">
              {formatNormalizedVersion(rawValue || '1.0.0.0')}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-[#0d0e12] border border-[#1f2128] rounded-xl p-4 sm:p-5 shadow-xl"
    >
      {/* Top Red Header Pill */}
      <div 
        id="metadata-fields-header-pill"
        className="w-full py-2 bg-[#C20000] text-white text-center font-bold text-xs sm:text-sm tracking-wide rounded-lg shadow-md shadow-[#C20000]/25 mb-4 select-none"
      >
        Metadata Fields
      </div>

      <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-left">
        {/* Section 1: Core Identity */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-xs font-bold text-[#e62626] uppercase tracking-wider">
              Core Identity
            </h3>
            <span className="text-[10px] text-zinc-500">
              <span className="text-[#e62626] font-bold">*</span> Mandatory fields
            </span>
          </div>
          <div className="space-y-2.5">
            {renderInputRow('Company Name', 'companyName', 'CompanyName', 'Enter Company Name...', true)}
            {renderInputRow('Author', 'author', 'Author', 'Enter Author Name...', true)}
            {renderInputRow('Legal Copyright', 'legalCopyright', 'LegalCopyright', 'Enter Legal Copyright...', true)}
            {renderInputRow('Product Name', 'productName', 'ProductName', 'Enter Product Name...', true)}
            {renderInputRow('File Description', 'fileDescription', 'FileDescription', 'Enter File Description...', true)}
            {renderInputRow('Repository URL', 'repositoryUrl', 'RepositoryURL', 'Enter Repository URL...', false)}
          </div>
        </div>

        {/* Section 2: Binary & Versioning */}
        <div>
          <h3 className="text-xs font-bold text-[#e62626] uppercase tracking-wider mb-2.5">
            Binary &amp; Versioning
          </h3>
          <div className="space-y-2.5">
            {renderInputRow('File Version', 'fileVersion', 'FileVersion', '1.0.0.0', true, true)}
            {renderInputRow('Product Version', 'productVersion', 'ProductVersion', '1.0.0.0', true, true)}
            {renderInputRow('Internal Name', 'internalName', 'InternalName', 'Enter Internal Name...', true)}
            {renderInputRow('Original Filename', 'originalFilename', 'OriginalFilename', 'Enter Original Filename...', true, false, handleOriginalFilenameBlur)}
          </div>
        </div>

        {/* Section 3: Additional Information */}
        <div>
          <h3 className="text-xs font-bold text-[#e62626] uppercase tracking-wider mb-2.5">
            Additional Information
          </h3>
          <div className="space-y-2.5">
            {renderInputRow('Legal Trademarks', 'legalTrademarks', 'LegalTrademarks', 'Enter Legal Trademarks...', false)}
            {renderInputRow('Comments', 'comments', 'Comments', 'Enter Comments...', false)}
          </div>
        </div>

        {/* Section 4: Output File Name Configuration */}
        <div className="pt-2 border-t border-zinc-800/80">
          <div className="p-3 bg-[#0a0b0e] border border-[#21232d] rounded-lg space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <label 
                htmlFor="input-outputFilename"
                className="w-38 sm:w-44 shrink-0 text-zinc-300 font-medium flex items-center gap-1.5"
              >
                <FileOutput className="w-3.5 h-3.5 text-[#C20000]" />
                <span>Output Filename:</span>
              </label>
              <div className="flex-1 relative">
                <input
                  id="input-outputFilename"
                  type="text"
                  value={metadata.outputFilename}
                  onChange={(e) => handleFieldChange('outputFilename', e.target.value)}
                  onBlur={handleOutputFilenameBlur}
                  placeholder="Enter Output Filename (Optional)..."
                  className="w-full bg-[#121318] border border-zinc-800 focus:border-[#C20000] focus:ring-1 focus:ring-[#C20000] rounded px-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-600 font-mono outline-none"
                />
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 pl-38 sm:pl-44">
              {metadata.outputFilename.trim() ? (
                <span>
                  Using custom filename: <span className="text-[#e62626] font-mono">{ensureTxtExtension(metadata.outputFilename)}</span>
                </span>
              ) : (
                <span>
                  Auto-derived from App name: <span className="text-zinc-300 font-mono">{effectiveAutoFilename}</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
