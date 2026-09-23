import React, { useEffect, useState } from 'react';
import { Student, SchoolInfo, CardDesignSettings } from '../types';
import { THEME_CONFIGS } from '../utils/defaults';
import { SchoolEmblem } from './SchoolEmblem';
import { generateStudentQRCode } from '../utils/qr';
import { Droplet, Phone, MapPin, Bus, ShieldCheck } from 'lucide-react';

interface IdCardVerticalProps {
  student: Student;
  school: SchoolInfo;
  settings: CardDesignSettings;
  side?: 'front' | 'back';
  showCutLines?: boolean;
}

export const IdCardVertical: React.FC<IdCardVerticalProps> = ({
  student,
  school,
  settings,
  side = 'front',
  showCutLines = false,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const theme = THEME_CONFIGS[settings.theme] || THEME_CONFIGS.navy;

  useEffect(() => {
    let isMounted = true;
    if (settings.showQrCode) {
      generateStudentQRCode(student, school).then((url) => {
        if (isMounted) setQrCodeUrl(url);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [student, school, settings.showQrCode]);

  // Card exact dimensions: 54mm x 85.6mm (CR80 standard)
  const cutLineClasses = showCutLines
    ? 'border border-dashed border-slate-300'
    : 'border border-slate-200/80 shadow-md print:shadow-none print:border-slate-300';

  if (side === 'back') {
    return (
      <div
        className={`id-card-vertical relative bg-white rounded-xl overflow-hidden flex flex-col justify-between text-slate-800 ${cutLineClasses} select-none`}
        style={{
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Subtle background crest watermark */}
        {settings.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <SchoolEmblem className="w-36 h-36" logoUrl={school.logoUrl} accentColor={theme.primary} />
          </div>
        )}

        {/* Back Header Banner */}
        <div
          className="px-2.5 py-1.5 text-white flex items-center justify-between"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <SchoolEmblem className="w-5 h-5 shrink-0" logoUrl={school.logoUrl} accentColor={theme.accent} />
            <div className="truncate text-left leading-tight">
              <p className="text-[9px] font-bold tracking-tight truncate">{school.schoolNameGujarati}</p>
              <p className="text-[7px] text-white/80 tracking-tight truncate">{school.schoolNameEnglish}</p>
            </div>
          </div>
          <span
            className="text-[7.5px] px-1.5 py-0.5 rounded font-bold text-slate-900 shrink-0"
            style={{ backgroundColor: theme.accent }}
          >
            {school.academicYear}
          </span>
        </div>

        {/* Card Body - Details & Instructions */}
        <div className="p-2 space-y-1.5 text-[8.5px] flex-1 leading-snug">
          {/* Father / Guardian info */}
          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium text-[8px]">પિતા / વાલી (Parent):</span>
              <span className="font-semibold text-slate-900 truncate max-w-[120px]">{student.fatherName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium text-[8px] flex items-center gap-0.5">
                <Phone className="w-2.5 h-2.5 text-emerald-600 inline" /> સંપર્ક (Phone):
              </span>
              <span className="font-bold text-slate-900 font-mono tracking-tight text-[8px]">{student.fatherPhone}</span>
            </div>
            {settings.showEmergencyPhone && student.emergencyPhone && (
              <div className="flex items-center justify-between">
                <span className="text-rose-600 font-medium text-[8px] flex items-center gap-0.5">
                  ઈમરજન્સી (Emergency):
                </span>
                <span className="font-bold text-rose-700 font-mono tracking-tight text-[8px]">{student.emergencyPhone}</span>
              </div>
            )}
          </div>

          {/* Residence Address */}
          <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-200/60">
            <span className="text-slate-500 font-medium text-[8px] flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5 text-blue-600 inline" /> સરનામું (Address):
            </span>
            <p className="text-slate-800 text-[8px] mt-0.5 leading-tight line-clamp-2">{student.address}</p>
          </div>

          {/* Bus Route if enabled */}
          {settings.showBusRoute && student.busRoute && (
            <div className="flex items-center justify-between bg-amber-50/60 px-1.5 py-1 rounded border border-amber-200/60 text-[8px]">
              <span className="text-amber-800 font-medium flex items-center gap-0.5">
                <Bus className="w-2.5 h-2.5 text-amber-600 inline" /> વાહન / બસ:
              </span>
              <span className="font-semibold text-amber-950 truncate max-w-[125px]">{student.busRoute}</span>
            </div>
          )}

          {/* Guidelines / Rules */}
          <div className="pt-0.5 space-y-0.5 text-[7.5px] text-slate-600">
            <p className="font-bold text-slate-800 text-[8px] flex items-center gap-0.5">
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 inline" /> નિયમો / Instructions:
            </p>
            <p className="leading-tight">૧. શાળા સમય દરમિયાન આ કાર્ડ પહેરવું ફરજિયાત છે.</p>
            <p className="leading-tight">૨. કાર્ડ ખોવાઈ જતાં તુરંત કાર્યાલયમાં જાણ કરવી.</p>
            <p className="leading-tight">૩. જો આ કાર્ડ મળે તો શાળાના સરનામે પહોંચાડવું.</p>
          </div>
        </div>

        {/* Back Footer with School Address & Seal */}
        <div
          className="border-t border-slate-200 p-1.5 flex items-center justify-between text-[7px] text-slate-600"
          style={{ backgroundColor: theme.lightBg }}
        >
          <div className="max-w-[120px] leading-tight">
            <p className="font-bold text-slate-800 truncate">{school.schoolNameGujarati}</p>
            <p className="truncate text-slate-500 text-[6.5px]">{school.address}</p>
            <p className="text-slate-700 text-[6.5px] font-mono">ફોન: {school.phone}</p>
          </div>

          <div className="text-center shrink-0">
            {school.principalSignUrl ? (
              <img
                src={school.principalSignUrl}
                alt="Principal Signature"
                className="h-5 w-12 object-contain mx-auto"
              />
            ) : (
              <div className="h-5 flex items-center justify-center text-[7px] italic text-slate-400">
                સહી / Sign
              </div>
            )}
            <p className="text-[6.5px] font-bold text-slate-800 border-t border-slate-400/80 pt-0.5 leading-none">
              સહી અને સિક્કો
            </p>
          </div>
        </div>
      </div>
    );
  }

  // FRONT SIDE (Standard Vertical Card)
  return (
    <div
      className={`id-card-vertical relative bg-white rounded-xl overflow-hidden flex flex-col justify-between text-slate-900 ${cutLineClasses} select-none`}
      style={{
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Background Subtle Watermark */}
      {settings.showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <SchoolEmblem className="w-40 h-40" logoUrl={school.logoUrl} accentColor={theme.primary} />
        </div>
      )}

      {/* Top Header Section */}
      <div
        className="px-2 pt-2 pb-1.5 text-center text-white relative shadow-xs"
        style={{ backgroundColor: theme.primary }}
      >
        {/* Trust Name */}
        {school.trustName && (
          <p className="text-[6.5px] text-amber-200 font-medium tracking-tight truncate leading-none mb-0.5">
            {school.trustName}
          </p>
        )}

        {/* Logo and School Name */}
        <div className="flex items-center justify-center gap-1.5">
          <SchoolEmblem
            className="w-7 h-7"
            logoUrl={school.logoUrl}
            accentColor={theme.accent}
          />
          <div className="text-center leading-tight">
            <h1 className="text-[10px] font-bold tracking-tight text-white leading-tight">
              {school.schoolNameGujarati}
            </h1>
            {settings.showSchoolEnglishName && school.schoolNameEnglish && (
              <h2 className="text-[6.5px] text-white/85 font-medium tracking-tight truncate">
                {school.schoolNameEnglish}
              </h2>
            )}
          </div>
        </div>

        {/* DISE Code / Reg No */}
        {settings.showDiseCode && school.diseCode && (
          <div className="mt-0.5 text-[6px] text-white/75 font-mono">
            DISE NO: {school.diseCode}
          </div>
        )}

        {/* Card Title Ribbon Banner */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[7px] font-bold text-slate-950 uppercase tracking-wider shadow-xs whitespace-nowrap"
          style={{ backgroundColor: theme.accent }}
        >
          વિદ્યાર્થી ઓળખપત્ર · {school.academicYear}
        </div>
      </div>

      {/* Main Student Section */}
      <div className="pt-3 px-2 pb-1 flex flex-col items-center flex-1 justify-between">
        {/* Student Photo */}
        <div className="relative mt-0.5 mb-1">
          <div
            className="w-18 h-22 rounded-lg overflow-hidden border-2 shadow-sm bg-slate-100 flex items-center justify-center"
            style={{ borderColor: theme.primary }}
          >
            {student.photoUrl ? (
              <img
                src={student.photoUrl}
                alt={student.fullNameGujarati}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                <span className="text-[10px] font-medium">ફોટો</span>
              </div>
            )}
          </div>

          {/* Blood group overlay badge */}
          {settings.showBloodGroup && student.bloodGroup && (
            <div className="absolute -bottom-1.5 -right-1 bg-red-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 border border-white">
              <Droplet className="w-2 h-2 fill-white" />
              <span>{student.bloodGroup}</span>
            </div>
          )}
        </div>

        {/* Student Name */}
        <div className="text-center w-full px-1">
          <h3
            className="text-[10px] font-bold leading-tight truncate"
            style={{ color: theme.primary }}
          >
            {student.fullNameGujarati}
          </h3>
          {student.fullNameEnglish && (
            <p className="text-[7.5px] font-semibold text-slate-600 tracking-tight truncate leading-tight uppercase">
              {student.fullNameEnglish}
            </p>
          )}
        </div>

        {/* Student Info Grid */}
        <div className="w-full bg-slate-50/90 rounded-lg p-1.5 border border-slate-200/80 my-1 space-y-0.5 text-[8px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">ધોરણ (Class):</span>
            <span className="font-bold text-slate-900">{student.standard} - {student.division}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">રોલ નં. (Roll No):</span>
            <span className="font-bold text-slate-900 font-mono">{student.rollNo}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500 font-medium">જી.આર. નં.:</span>
            <span className="font-bold text-slate-900 font-mono">{student.grNo}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">જન્મ તારીખ (DOB):</span>
            <span className="font-semibold text-slate-900 font-mono">{student.dob}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">મોબાઇલ (Phone):</span>
            <span className="font-bold text-slate-900 font-mono tracking-tight">{student.fatherPhone}</span>
          </div>
        </div>

        {/* Bottom Signature & QR Code Row */}
        <div className="w-full flex items-end justify-between px-1 pt-0.5">
          {/* QR Code */}
          {settings.showQrCode && qrCodeUrl ? (
            <div className="flex flex-col items-center">
              <img
                src={qrCodeUrl}
                alt="Student QR Code"
                className="w-10 h-10 rounded border border-slate-200 shadow-2xs"
              />
              <span className="text-[5.5px] text-slate-400 font-mono">SCAN ID</span>
            </div>
          ) : (
            <div className="text-[6.5px] font-mono text-slate-400">
              GR: {student.grNo}
            </div>
          )}

          {/* Principal Signature */}
          {settings.showPrincipalSign && (
            <div className="text-center">
              {school.principalSignUrl ? (
                <img
                  src={school.principalSignUrl}
                  alt="Principal Signature"
                  className="h-6 w-14 object-contain mx-auto"
                />
              ) : (
                <div className="h-6 w-14 flex items-center justify-center text-[7px] italic text-slate-400">
                  RK Patel
                </div>
              )}
              <div className="border-t border-slate-400 pt-0.5 text-[6.5px] font-bold text-slate-800 leading-none">
                આચાર્ય / Principal
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Color Accent Strip */}
      <div
        className="h-1.5 w-full shrink-0"
        style={{ backgroundColor: theme.primary }}
      />
    </div>
  );
};
