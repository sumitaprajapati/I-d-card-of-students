import QRCode from 'qrcode';
import { Student, SchoolInfo } from '../types';

export async function generateStudentQRCode(student: Student, school: SchoolInfo): Promise<string> {
  try {
    const textData = [
      `STUDENT ID: ${student.grNo}`,
      `NAME: ${student.fullNameEnglish || student.fullNameGujarati}`,
      `CLASS: ${student.standard} - ${student.division}`,
      `ROLL NO: ${student.rollNo}`,
      `DOB: ${student.dob}`,
      `BLOOD: ${student.bloodGroup}`,
      `PARENT PH: ${student.fatherPhone}`,
      `EMERGENCY: ${student.emergencyPhone}`,
      `SCHOOL: ${school.schoolNameEnglish || school.schoolNameGujarati}`,
    ].join('\n');

    const qrDataUrl = await QRCode.toDataURL(textData, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
    return qrDataUrl;
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}
