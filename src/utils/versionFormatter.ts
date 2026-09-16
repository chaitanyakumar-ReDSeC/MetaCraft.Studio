import { MetadataState } from '../types';
import { PLACEHOLDER_DEFAULTS } from '../data/constants';

/**
 * Parses any version string format into a 4-number tuple (major, minor, patch, build).
 * Handles:
 * - Dot separation: "5.12.51.51", "1.0.0.0"
 * - Comma separation: "5, 12, 51, 51", "1, 0, 0, 0"
 * - Parentheses / brackets: "(5.12.51.51)", "(1.0.0.0)", "(5, 12, 51, 51)"
 * - Short versions round-off / zero padding: "1" -> (1,0,0,0), "5.12" -> (5,12,0,0)
 * - Empty string -> falls back to [1, 0, 0, 0]
 */
export function parseVersionTuple(verStr?: string): [number, number, number, number] {
  if (!verStr || typeof verStr !== 'string' || verStr.trim() === '') {
    return [1, 0, 0, 0];
  }

  // Remove parentheses, brackets, and quotes
  const cleaned = verStr.replace(/[()[\]'"u]/g, '').trim();
  // Split on either commas, dots, spaces, or hyphens
  const tokens = cleaned.split(/[,.\s-]+/).filter((t) => t.length > 0);

  const nums = tokens.map((token) => {
    const parsed = parseInt(token.replace(/\D/g, ''), 10);
    return isNaN(parsed) ? 0 : Math.max(0, Math.min(65535, parsed));
  });

  // Round off / pad with zeros to exactly 4 integers
  const p0 = nums.length > 0 && Number.isFinite(nums[0]) ? nums[0] : 1;
  const p1 = nums.length > 1 && Number.isFinite(nums[1]) ? nums[1] : 0;
  const p2 = nums.length > 2 && Number.isFinite(nums[2]) ? nums[2] : 0;
  const p3 = nums.length > 3 && Number.isFinite(nums[3]) ? nums[3] : 0;

  return [p0, p1, p2, p3];
}

/**
 * Returns the normalized 4-part dot string (e.g. "5.12.51.51" or "1.0.0.0")
 * for the StringStruct.
 */
export function formatNormalizedVersion(verStr?: string, fallback = '1.0.0.0'): string {
  if (!verStr || verStr.trim() === '') {
    return fallback;
  }
  const tuple = parseVersionTuple(verStr);
  return `${tuple[0]}.${tuple[1]}.${tuple[2]}.${tuple[3]}`;
}

/**
 * Helper to ensure filename ends with .exe
 */
export function ensureExeExtension(filename?: string): string {
  if (!filename || filename.trim() === '') return '';
  const trimmed = filename.trim();
  return trimmed.toLowerCase().endsWith('.exe') ? trimmed : `${trimmed}.exe`;
}

/**
 * Helper to ensure filename ends with .txt
 */
export function ensureTxtExtension(filename?: string): string {
  if (!filename || filename.trim() === '') return '';
  const trimmed = filename.trim();
  return trimmed.toLowerCase().endsWith('.txt') ? trimmed : `${trimmed}.txt`;
}

/**
 * Calculates the effective output filename:
 * Uses custom outputFilename if configured (with .txt appended),
 * else automatically fetches the App Name (productName or internalName) and appends _version_info.txt.
 */
export function getEffectiveOutputFilename(state: MetadataState): string {
  if (state.outputFilename && state.outputFilename.trim().length > 0) {
    return ensureTxtExtension(state.outputFilename);
  }
  const appName = state.productName.trim() || state.internalName.trim();
  if (appName) {
    const cleanName = appName.replace(/[^a-zA-Z0-9_-]/g, '');
    return `${cleanName || 'App'}_version_info.txt`;
  }
  return 'MetaCraftStudio_version_info.txt';
}

export function escapePythonString(str: string): string {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '')
    .replace(/\n/g, '\\n');
}

export function generateVersionInfoText(state: MetadataState): string {
  // Version tuples
  const filevers = state.syncNumericVersions
    ? parseVersionTuple(state.fileVersion || PLACEHOLDER_DEFAULTS.fileVersion)
    : state.fileversTuple;

  const prodvers = state.syncNumericVersions
    ? parseVersionTuple(state.productVersion || PLACEHOLDER_DEFAULTS.productVersion)
    : state.prodversTuple;

  const fileversStr = `(${filevers[0]}, ${filevers[1]}, ${filevers[2]}, ${filevers[3]})`;
  const prodversStr = `(${prodvers[0]}, ${prodvers[1]}, ${prodvers[2]}, ${prodvers[3]})`;

  const dateStr = `(${state.date[0]}, ${state.date[1]})`;
  const translationStr = `[${state.translation[0]}, ${state.translation[1]}]`;

  // Normalized versions for StringStruct
  const fileVersionStr = state.fileVersion
    ? formatNormalizedVersion(state.fileVersion)
    : PLACEHOLDER_DEFAULTS.fileVersion;

  const productVersionStr = state.productVersion
    ? formatNormalizedVersion(state.productVersion)
    : PLACEHOLDER_DEFAULTS.productVersion;

  // Ensure .exe extension on originalFilename
  const originalFilenameStr = ensureExeExtension(state.originalFilename);

  return `# UTF-8
#
VSVersionInfo(
  ffi=FixedFileInfo(
    filevers=${fileversStr}, # Version number (comma separated)
    prodvers=${prodversStr}, # Product version (comma separated)
    mask=${state.mask || '0x3f'},
    flags=${state.flags || '0x0'},
    OS=${state.os || '0x40004'},
    fileType=${state.fileType || '0x1'},
    subtype=${state.subtype || '0x0'},
    date=${dateStr}
    ),
  kids=[
    StringFileInfo(
      [
      StringTable(
        u'${state.stringTableCode || '040904B0'}',
        [StringStruct(u'CompanyName', u'${escapePythonString(state.companyName)}'),
        StringStruct(u'Author', u'${escapePythonString(state.author)}'),
        StringStruct(u'RepositoryURL', u'${escapePythonString(state.repositoryUrl)}'),
        StringStruct(u'FileDescription', u'${escapePythonString(state.fileDescription)}'),
        StringStruct(u'FileVersion', u'${escapePythonString(fileVersionStr)}'),
        StringStruct(u'InternalName', u'${escapePythonString(state.internalName)}'),
        StringStruct(u'LegalCopyright', u'${escapePythonString(state.legalCopyright)}'),
        StringStruct(u'LegalTrademarks', u'${escapePythonString(state.legalTrademarks)}'),
        StringStruct(u'OriginalFilename', u'${escapePythonString(originalFilenameStr)}'),
        StringStruct(u'ProductName', u'${escapePythonString(state.productName)}'),
        StringStruct(u'ProductVersion', u'${escapePythonString(productVersionStr)}'),
        StringStruct(u'Comments', u'${escapePythonString(state.comments)}')])
      ]), 
    VarFileInfo([VarStruct(u'Translation', ${translationStr})])
  ]
)
`;
}

export function downloadVersionInfoFile(filename: string, content: string): void {
  const cleanFilename = ensureTxtExtension(filename) || 'version_info.txt';
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = cleanFilename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
