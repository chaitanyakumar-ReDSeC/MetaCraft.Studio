export interface MetadataState {
  // Core Identity
  companyName: string;
  author: string;
  legalCopyright: string;
  productName: string;
  fileDescription: string;
  repositoryUrl: string;

  // Binary & Versioning
  fileVersion: string;
  productVersion: string;
  internalName: string;
  originalFilename: string;

  // Optional Details
  legalTrademarks: string;
  comments: string;

  // Advanced FixedFileInfo & Translation
  syncNumericVersions: boolean;
  fileversTuple: [number, number, number, number];
  prodversTuple: [number, number, number, number];
  mask: string;
  flags: string;
  os: string;
  fileType: string;
  subtype: string;
  date: [number, number];
  stringTableCode: string;
  translation: [number, number];

  // Output filename customizer
  outputFilename: string;
}

export interface FieldHelp {
  label: string;
  description: string;
  windowsUsage: string;
  example: string;
}
