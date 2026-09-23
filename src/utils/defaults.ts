import { SchoolInfo, Student, CardDesignSettings } from '../types';

export const DEFAULT_SCHOOL: SchoolInfo = {
  schoolNameGujarati: 'શ્રી સરસ્વતી વિદ્યા મંદિર',
  schoolNameEnglish: 'SHREE SARASWATI VIDYA MANDIR',
  trustName: 'શ્રી સરસ્વતી કેળવણી મંડળ ટ્રસ્ટ સંચાલિત',
  diseCode: '24070501234',
  regNo: 'GSEB/REG/2012/894',
  address: 'આશ્રમ રોડ, ઉસ્માનપુરા, અમદાવાદ - ૩૮૦૦૧૩, ગુજરાત',
  phone: '+91 98765 43210',
  email: 'info@ssvmschool.edu.in',
  academicYear: '2026 - 2027',
  tagline: 'સા વિદ્યા યા વિમુક્તયે (વિદ્યા એ જ સાચી મુક્તિ છે)',
  logoUrl: '', // will fallback to our rich SVG crest
  principalSignUrl: '',
  principalName: 'ડૉ. રમેશભાઈ કે. પટેલ (આચાર્ય)',
};

export const DEFAULT_DESIGN_SETTINGS: CardDesignSettings = {
  orientation: 'vertical',
  theme: 'navy',
  showQrCode: true,
  showBloodGroup: true,
  showEmergencyPhone: true,
  showBusRoute: true,
  showPrincipalSign: true,
  showDiseCode: true,
  showAadhaarNo: false,
  showSchoolEnglishName: true,
  showWatermark: true,
  cardLanguage: 'bilingual',
};

// Built-in student vector avatars (data URL SVGs)
export const BOY_STUDENT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="160" height="190"><rect width="160" height="190" fill="%23E0F2FE"/><circle cx="80" cy="65" r="38" fill="%23FBBF24"/><path d="M48 55 C48 30 112 30 112 55 C112 40 100 28 80 28 C60 28 48 40 48 55 Z" fill="%231E293B"/><circle cx="68" cy="64" r="4" fill="%231E293B"/><circle cx="92" cy="64" r="4" fill="%231E293B"/><path d="M72 78 Q80 86 88 78" stroke="%23B45309" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M80 66 L80 72" stroke="%23B45309" stroke-width="2" stroke-linecap="round"/><path d="M40 190 C40 125 120 125 120 190 Z" fill="%23FFFFFF"/><path d="M60 115 L80 135 L100 115 L92 110 L80 122 L68 110 Z" fill="%231E40AF"/><path d="M76 135 L84 135 L82 175 L78 175 Z" fill="%23DC2626"/><polygon points="76,175 84,175 80,185" fill="%23DC2626"/></svg>`;

export const GIRL_STUDENT_AVATAR = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 190" width="160" height="190"><rect width="160" height="190" fill="%23FCE7F3"/><circle cx="80" cy="65" r="38" fill="%23FBBF24"/><path d="M42 62 C40 28 120 28 118 62 C118 40 102 30 80 30 C58 30 42 40 42 62 Z" fill="%231E293B"/><path d="M38 65 C32 80 32 105 38 120 C42 120 44 110 44 100" stroke="%231E293B" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M122 65 C128 80 128 105 122 120 C118 120 116 110 116 100" stroke="%231E293B" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="38" cy="118" r="4" fill="%23EF4444"/><circle cx="122" cy="118" r="4" fill="%23EF4444"/><circle cx="68" cy="64" r="4" fill="%231E293B"/><circle cx="92" cy="64" r="4" fill="%231E293B"/><circle cx="80" cy="54" r="2" fill="%23DC2626"/><path d="M72 78 Q80 86 88 78" stroke="%23B45309" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M40 190 C40 125 120 125 120 190 Z" fill="%23FFFFFF"/><path d="M58 115 L80 135 L102 115 L92 108 L80 122 L68 108 Z" fill="%23991B1B"/><path d="M76 135 L84 135 L82 175 L78 175 Z" fill="%230284C7"/><polygon points="76,175 84,175 80,185" fill="%230284C7"/></svg>`;

export const SAMPLE_STUDENTS: Student[] = [
  {
    id: 'std-1',
    grNo: 'GR-4821',
    rollNo: '14',
    fullNameGujarati: 'પટેલ આરવ ભાવેશભાઈ',
    fullNameEnglish: 'PATEL AARAV BHAVESHBHAI',
    standard: 'ધોરણ ૭ (Class 7)',
    division: 'અ (A)',
    dob: '15/08/2013',
    bloodGroup: 'B+',
    fatherName: 'ભાવેશભાઈ પટેલ',
    fatherPhone: '+91 98250 12345',
    emergencyPhone: '+91 98250 99887',
    address: 'બી-૪૨, શિવમ રેસિડેન્સી, નિકોલ, અમદાવાદ - ૩૮૨૩૫૦',
    busRoute: 'રૂટ નં. ૫ (ચાંદખેડા-નિકોલ)',
    gender: 'male',
    photoUrl: BOY_STUDENT_AVATAR,
    aadhaarNo: '7845 1290 3341',
  },
  {
    id: 'std-2',
    grNo: 'GR-4822',
    rollNo: '21',
    fullNameGujarati: 'શાહ દીયા નીલેશકુમાર',
    fullNameEnglish: 'SHAH DIYA NILESHKUMAR',
    standard: 'ધોરણ ૮ (Class 8)',
    division: 'બ (B)',
    dob: '22/11/2012',
    bloodGroup: 'O+',
    fatherName: 'નીલેશકુમાર શાહ',
    fatherPhone: '+91 98791 45678',
    emergencyPhone: '+91 98791 11223',
    address: '૧૨, પંચામૃત સોસાયટી, બોપલ, અમદાવાદ - ૩૮૦૦૫૮',
    busRoute: 'રૂટ નં. ૨ (બોપલ એક્સપ્રેસ)',
    gender: 'female',
    photoUrl: GIRL_STUDENT_AVATAR,
    aadhaarNo: '6211 4983 2095',
  },
  {
    id: 'std-3',
    grNo: 'GR-4823',
    rollNo: '08',
    fullNameGujarati: 'પ્રજાપતિ હેત વિજયભાઈ',
    fullNameEnglish: 'PRAJAPATI HET VIJAYBHAI',
    standard: 'ધોરણ ૬ (Class 6)',
    division: 'અ (A)',
    dob: '05/03/2014',
    bloodGroup: 'A+',
    fatherName: 'વિજયભાઈ પ્રજાપતિ',
    fatherPhone: '+91 99042 87654',
    emergencyPhone: '+91 99042 33445',
    address: '૪૫/એ, દર્શન ફ્લેટ્સ, ઘાટલોડિયા, અમદાવાદ - ૩૮૦૦૬૧',
    busRoute: 'રૂટ નં. ૮ (ઘાટલોડિયા લોકલ)',
    gender: 'male',
    photoUrl: BOY_STUDENT_AVATAR,
    aadhaarNo: '9045 2819 7623',
  },
  {
    id: 'std-4',
    grNo: 'GR-4824',
    rollNo: '33',
    fullNameGujarati: 'જોષી અનન્યા મનોજભાઈ',
    fullNameEnglish: 'JOSHI ANANYA MANOJBHAI',
    standard: 'ધોરણ ૯ (Class 9)',
    division: 'ક (C)',
    dob: '10/06/2011',
    bloodGroup: 'AB+',
    fatherName: 'મનોજભાઈ જોષી',
    fatherPhone: '+91 97234 54321',
    emergencyPhone: '+91 97234 66778',
    address: '૮, સુવર્ણવિલા બંગ્લોઝ, સેટેલાઇટ, અમદાવાદ - ૩૮૦૦૧૫',
    busRoute: 'રૂટ નં. ૧ (સેટેલાઇટ-વસ્ત્રાપુર)',
    gender: 'female',
    photoUrl: GIRL_STUDENT_AVATAR,
    aadhaarNo: '4452 9012 3761',
  },
  {
    id: 'std-5',
    grNo: 'GR-4825',
    rollNo: '03',
    fullNameGujarati: 'રાઠોડ જયરાજ પ્રદીપસિંહ',
    fullNameEnglish: 'RATHOD JAYRAJ PRADIPSINH',
    standard: 'ધોરણ ૧૦ (Class 10)',
    division: 'અ (A)',
    dob: '19/01/2010',
    bloodGroup: 'O+',
    fatherName: 'પ્રદીપસિંહ રાઠોડ',
    fatherPhone: '+91 94280 67890',
    emergencyPhone: '+91 94280 12121',
    address: '૧૭, શક્તિનગર, પાલડી, અમદાવાદ - ૩૮૦૦૦૭',
    busRoute: 'સ્વયં વાહન (Self/Walk)',
    gender: 'male',
    photoUrl: BOY_STUDENT_AVATAR,
    aadhaarNo: '5812 7749 6103',
  },
  {
    id: 'std-6',
    grNo: 'GR-4826',
    rollNo: '19',
    fullNameGujarati: 'મેહતા કાવ્યા તુષારભાઈ',
    fullNameEnglish: 'MEHTA KAVYA TUSHARBHAI',
    standard: 'ધોરણ ૫ (Class 5)',
    division: 'બ (B)',
    dob: '14/09/2015',
    bloodGroup: 'A-',
    fatherName: 'તુષારભાઈ મેહતા',
    fatherPhone: '+91 96011 23456',
    emergencyPhone: '+91 96011 99001',
    address: 'સી-૩૦૩, હાર્મોની હાઇટ્સ, ગોતા, અમદાવાદ - ૩૮૨૪૮૧',
    busRoute: 'રૂટ નં. ૪ (ગોતા-એસજી હાઇવે)',
    gender: 'female',
    photoUrl: GIRL_STUDENT_AVATAR,
    aadhaarNo: '3190 6482 1574',
  },
];

export const THEME_CONFIGS: Record<
  string,
  {
    id: string;
    nameGu: string;
    nameEn: string;
    primary: string;
    secondary: string;
    accent: string;
    lightBg: string;
    border: string;
    gradient: string;
  }
> = {
  navy: {
    id: 'navy',
    nameGu: 'રોયલ નેવી બ્લૂ (Royal Navy)',
    nameEn: 'Royal Navy Blue',
    primary: '#1E3A8A', // blue-900
    secondary: '#1D4ED8', // blue-700
    accent: '#F59E0B', // amber-500
    lightBg: '#EFF6FF',
    border: '#BFDBFE',
    gradient: 'from-blue-900 via-blue-800 to-indigo-950',
  },
  maroon: {
    id: 'maroon',
    nameGu: 'વૈદિક મરૂન / લાલ (Vedic Maroon)',
    nameEn: 'Vedic Maroon Red',
    primary: '#881337', // rose-900
    secondary: '#BE123C', // rose-700
    accent: '#EAB308', // yellow-500
    lightBg: '#FFF1F2',
    border: '#FECDD3',
    gradient: 'from-rose-950 via-red-900 to-rose-900',
  },
  forest: {
    id: 'forest',
    nameGu: 'એમરાલ્ડ ગ્રીન (Emerald Forest)',
    nameEn: 'Emerald Forest Green',
    primary: '#064E3B', // emerald-900
    secondary: '#047857', // emerald-700
    accent: '#FBBF24', // amber-400
    lightBg: '#ECFDF5',
    border: '#A7F3D0',
    gradient: 'from-emerald-950 via-emerald-900 to-teal-950',
  },
  saffron: {
    id: 'saffron',
    nameGu: 'ગોલ્ડન કેસરી (Golden Saffron)',
    nameEn: 'Golden Saffron',
    primary: '#7C2D12', // orange-950
    secondary: '#C2410C', // orange-700
    accent: '#F97316', // orange-500
    lightBg: '#FFF7ED',
    border: '#FED7AA',
    gradient: 'from-orange-950 via-amber-900 to-amber-950',
  },
  'royal-purple': {
    id: 'royal-purple',
    nameGu: 'શાહી પર્પલ (Royal Violet)',
    nameEn: 'Royal Violet',
    primary: '#4C1D95', // violet-900
    secondary: '#6D28D9', // violet-700
    accent: '#F43F5E', // rose-500
    lightBg: '#F5F3FF',
    border: '#DDD6FE',
    gradient: 'from-violet-950 via-purple-900 to-indigo-950',
  },
  slate: {
    id: 'slate',
    nameGu: 'ક્લાસિક ગ્રેફાઇટ (Classic Slate)',
    nameEn: 'Classic Graphite Slate',
    primary: '#0F172A', // slate-900
    secondary: '#334155', // slate-700
    accent: '#0284C7', // sky-600
    lightBg: '#F8FAFC',
    border: '#CBD5E1',
    gradient: 'from-slate-950 via-slate-900 to-slate-800',
  },
};
