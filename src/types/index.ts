export interface Student {
  id: string;
  grNo: string; // General Register Number (G.R. No.)
  rollNo: string;
  fullNameGujarati: string;
  fullNameEnglish: string;
  standard: string; // e.g. ધોરણ ૭ / Std 7
  division: string; // e.g. અ / A
  dob: string; // YYYY-MM-DD or DD/MM/YYYY
  bloodGroup: string; // A+, B+, O+, AB+, etc.
  fatherName: string;
  fatherPhone: string;
  emergencyPhone: string;
  address: string;
  busRoute?: string;
  gender: 'male' | 'female';
  photoUrl?: string;
  aadhaarNo?: string;
}

export interface SchoolInfo {
  schoolNameGujarati: string;
  schoolNameEnglish: string;
  trustName: string;
  diseCode: string;
  regNo: string;
  address: string;
  phone: string;
  email: string;
  academicYear: string;
  tagline: string;
  logoUrl: string;
  principalSignUrl: string;
  principalName: string;
}

export type CardOrientation = 'vertical' | 'horizontal';
export type CardSide = 'front' | 'back' | 'both';
export type CardTheme = 'navy' | 'maroon' | 'forest' | 'saffron' | 'royal-purple' | 'slate';

export interface CardDesignSettings {
  orientation: CardOrientation;
  theme: CardTheme;
  showQrCode: boolean;
  showBloodGroup: boolean;
  showEmergencyPhone: boolean;
  showBusRoute: boolean;
  showPrincipalSign: boolean;
  showDiseCode: boolean;
  showAadhaarNo: boolean;
  showSchoolEnglishName: boolean;
  showWatermark: boolean;
  cardLanguage: 'gu' | 'en' | 'bilingual';
}

export type Language = 'gu' | 'en';
