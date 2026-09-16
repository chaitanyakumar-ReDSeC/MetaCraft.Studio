import { MetadataState, FieldHelp } from '../types';

export const PLACEHOLDER_DEFAULTS = {
  companyName: 'Chaitanya Kumar Sathivada',
  author: 'Chaitanya Kumar Sathivada',
  legalCopyright: 'Copyright © Chaitanya Kumar Sathivada. All Rights Reserved.',
  productName: 'MetaCraft Studio',
  fileDescription: 'Metadata Generator',
  repositoryUrl: 'https://github.com/example/repository',

  fileVersion: '1.0.0.0',
  fileVersionExample: '1.0.0.0 or (5.12.51.51), 1, 0, 0, 0',
  productVersion: '1.0.0.0',
  productVersionExample: '1.0.0.0 or (5.12.51.51), 1, 0, 0, 0',
  internalName: 'MetaCraft Studio',
  originalFilename: 'MetaCraft Studio.exe',

  legalTrademarks: 'ReDSeC',
  comments: 'Developed by Chaitanya Kumar Sathivada',
  outputFilename: 'MetaCraftStudio_version_info.txt',
};

// Initial state: ALL fields are blank string "" so they display pure placeholders
export const INITIAL_METADATA: MetadataState = {
  companyName: '',
  author: '',
  legalCopyright: '',
  productName: '',
  fileDescription: '',
  repositoryUrl: '',

  fileVersion: '',
  productVersion: '',
  internalName: '',
  originalFilename: '',

  legalTrademarks: '',
  comments: '',

  syncNumericVersions: true,
  fileversTuple: [1, 0, 0, 0],
  prodversTuple: [1, 0, 0, 0],
  mask: '0x3f',
  flags: '0x0',
  os: '0x40004',
  fileType: '0x1',
  subtype: '0x0',
  date: [0, 0],
  stringTableCode: '040904B0',
  translation: [1033, 1200],

  outputFilename: '',
};

// Full sample metadata for "Load Example Preset"
export const SAMPLE_METADATA: MetadataState = {
  companyName: 'Chaitanya Kumar Sathivada',
  author: 'Chaitanya Kumar Sathivada',
  legalCopyright: 'Copyright © Chaitanya Kumar Sathivada. All Rights Reserved.',
  productName: 'MetaCraft Studio',
  fileDescription: 'Metadata Generator',
  repositoryUrl: '',

  fileVersion: '1.0.0.0',
  productVersion: '1.0.0.0',
  internalName: 'MetaCraft Studio',
  originalFilename: 'MetaCraft Studio.exe',

  legalTrademarks: 'ReDSeC',
  comments: 'Developed by Chaitanya Kumar Sathivada',

  syncNumericVersions: true,
  fileversTuple: [1, 0, 0, 0],
  prodversTuple: [1, 0, 0, 0],
  mask: '0x3f',
  flags: '0x0',
  os: '0x40004',
  fileType: '0x1',
  subtype: '0x0',
  date: [0, 0],
  stringTableCode: '040904B0',
  translation: [1033, 1200],

  outputFilename: 'MetaCraftStudio_version_info.txt',
};

export const FIELD_HELP_DATA: Record<string, FieldHelp> = {
  CompanyName: {
    label: 'Company Name',
    description: 'The organization, company, or developer that produced the executable.',
    windowsUsage: 'Displayed on Windows Explorer file properties and UAC security prompts.',
    example: 'Chaitanya Kumar Sathivada',
  },
  Author: {
    label: 'Author',
    description: 'The primary individual creator or software architect.',
    windowsUsage: 'Used in extended file metadata, documentation, and source attribution.',
    example: 'Chaitanya Kumar Sathivada',
  },
  LegalCopyright: {
    label: 'Legal Copyright',
    description: 'Full legal copyright statement asserting intellectual property rights.',
    windowsUsage: 'Displayed prominently on Windows file properties and installer screens.',
    example: 'Copyright © Chaitanya Kumar Sathivada. All Rights Reserved.',
  },
  ProductName: {
    label: 'Product Name',
    description: 'The consumer-facing commercial name of the application or suite.',
    windowsUsage: 'Grouped under Programs & Features, Task Manager, and Start Menu indexing.',
    example: 'MetaCraft Studio',
  },
  FileDescription: {
    label: 'File Description',
    description: 'A concise single-line summary of what the binary executable does.',
    windowsUsage: 'Shown as the primary process description in Windows Task Manager.',
    example: 'Metadata Generator',
  },
  RepositoryURL: {
    label: 'Repository URL',
    description: 'Direct link to the open source or internal source code repository.',
    windowsUsage: 'Allows developers and system auditors to verify software origins.',
    example: 'https://github.com/example/repo',
  },
  FileVersion: {
    label: 'File Version',
    description: 'Version of the binary. Supports dot (5.12.51.51), comma (5, 12, 51, 51), or parenthesized round off values (1.0.0.0).',
    windowsUsage: 'Windows PE FixedFileInfo filevers tuple and StringStruct FileVersion.',
    example: '5.12.51.51 or (1.0.0.0) or 5, 12, 51, 51',
  },
  ProductVersion: {
    label: 'Product Version',
    description: 'Marketing version of the software product suite. Automatically rounded and converted to 4-part tuple.',
    windowsUsage: 'Windows PE FixedFileInfo prodvers tuple and StringStruct ProductVersion.',
    example: '1.0.0.0 or (5.12.51.51) or 1, 0, 0, 0',
  },
  InternalName: {
    label: 'Internal Name',
    description: 'Internal project identifier or original module name.',
    windowsUsage: 'Identifies the module internally even if the physical file is renamed.',
    example: 'MetaCraft Studio',
  },
  OriginalFilename: {
    label: 'Original Filename',
    description: 'The canonical original filename of the compiled executable file.',
    windowsUsage: 'Used by antivirus and diagnostics to detect renamed binaries.',
    example: 'MetaCraft Studio.exe',
  },
  LegalTrademarks: {
    label: 'Legal Trademarks',
    description: 'Registered or recognized trademarks and brand protection marks.',
    windowsUsage: 'Shown in Windows Explorer Details tab under Trademarks.',
    example: 'ReDSeC',
  },
  Comments: {
    label: 'Comments',
    description: 'Additional developer remarks, release channel notes, or build details.',
    windowsUsage: 'Visible in file properties details panel.',
    example: 'Developed by Chaitanya Kumar Sathivada',
  },
};
