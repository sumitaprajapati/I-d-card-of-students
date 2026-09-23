import React, { useEffect, useState } from 'react';
import { Student, SchoolInfo, CardDesignSettings } from '../types';
import { THEME_CONFIGS } from '../utils/defaults';
import { SchoolEmblem } from './SchoolEmblem';
import { generateStudentQRCode } from '../utils/qr';
import { Droplet, Phone, MapPin, Bus, ShieldCheck } from 'lucide-react';

interface IdCardHorizontalProps {
  student: Student;
  school: SchoolInfo;
  settings: CardDesignSettings;
  side?: 'front' | 'back';
  showCutLines?: boolean;
}

export const IdCardHorizontal: React.FC<IdCardHorizontalProps> = ({
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

  // Card dimensions: 85.6mm x 54mm
  const cutLineClasses = showCutLines
    ? 'border border-dashed border-slate-300'
    : 'border border-slate-200/80 shadow-md print:shadow-none print:border-slate-300';

  if (side === 'back') {
    return (
      <div
        className={`id-card-horizontal relative bg-white rounded-xl overflow-hidden flex flex-col justify-between text-slate-800 ${cutLineClasses} select-none`}
        style={{
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Subtle Watermark */}
        {settings.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
            <SchoolEmblem className="w-36 h-36" logoUrl={school.logoUrl} accentColor={theme.primary} />
          </div>
        )}

        {/* Back Header */}
        <div
          className="px-3 py-1 text-white flex items-center justify-between"
          style={{ backgroundColor: theme.primary }}
        >
          <div className="flex items-center gap-2">
            <SchoolEmblem className="w-4 h-4 shrink-0" logoUrl={school.logoUrl} accentColor={theme.accent} />
            <span className="text-[8.5px] font-bold tracking-tight">{school.schoolNameGujarati}</span>
          </div>
          <span
            className="text-[7.5px] px-1.5 py-0.5 rounded font-bold text-slate-900"
            style={{ backgroundColor: theme.accent }}
          >
            {school.academicYear}
          </span>
        </div>

        {/* Two-Column Back Content */}
        <div className="px-3 py-1.5 grid grid-cols-2 gap-2 text-[8px] flex-1">
          {/* Column 1: Parent & Emergency & Bus */}
          <div className="space-y-1">
            <div>
              <span className="text-slate-500 font-medium">વાલી (Parent):</span>
              <p className="font-semibold text-slate-900 truncate">{student.fatherName}</p>
            </div>
            <div>
              <span className="text-slate-500 font-medium flex items-center gap-0.5">
                <Phone className="w-2.5 h-2.5 text-emerald-600 inline" /> ફોન (Phone):
              </span>
              <p className="font-bold text-slate-900 font-mono tracking-tight">{student.fatherPhone}</p>
            </div>
            {settings.showEmergencyPhone && student.emergencyPhone && (
              <div>
                <span className="text-rose-600 font-medium">ઈમરજન્સી:</span>
                <p className="font-bold text-rose-700 font-mono">{student.emergencyPhone}</p>
              </div>
            )}
            {settings.showBusRoute && student.busRoute && (
              <div className="flex items-center gap-0.5 text-amber-900 truncate">
                <Bus className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                <span className="truncate">{student.busRoute}</span>
              </div>
            )}
          </div>

          {/* Column 2: Address & Rules */}
          <div className="space-y-1 border-l border-slate-200/80 pl-2">
            <div>
              <span className="text-slate-500 font-medium flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-blue-600 inline" /> સરનામું:
              </span>
              <p className="text-[7.5px] text-slate-800 line-clamp-2 leading-tight">{student.address}</p>
            </div>
            <div className="pt-0.5 text-[7px] text-slate-600 space-y-0.5">
              <span className="font-bold text-slate-800 flex items-center gap-0.5">
                <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 inline" /> નિયમો:
              </span>
              <p className="leading-tight">૧. શાળા સમય દરમિયાન ગળામાં ધારણ કરવું.</p>
              <p className="leading-tight">૨. ખોવાઈ જવા પર કાર્યાલયમાં જાણ કરવી.</p>
            </div>
          </div>
        </div>

        {/* Back Footer */}
        <div
          className="px-3 py-1 border-t border-slate-200 flex items-center justify-between text-[7px] text-slate-600"
          style={{ backgroundColor: theme.lightBg }}
        >
          <div className="truncate max-w-[200px]">
            <span className="font-bold text-slate-800">{school.address}</span>
            <span className="ml-1 text-slate-500 font-mono">| {school.phone}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {school.principalSignUrl && (
              <img
                src={school.principalSignUrl}
                alt="Principal Signature"
                className="h-4.5 w-10 object-contain"
              />
            )}
            <span className="text-[6.5px] font-bold text-slate-800 border-t border-slate-400 pt-0.5">
              સહી અને સિક્કો
            </span>
          </div>
        </div>
      </div>
    );
  }

  // FRONT SIDE (Horizontal Card)
  return (
    <div
      className={`id-card-horizontal relative bg-white rounded-xl overflow-hidden flex flex-col justify-between text-slate-900 ${cutLineClasses} select-none`}
      style={{
        boxSizing: 'border-box',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Background Subtle Watermark */}
      {settings.showWatermark && (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <SchoolEmblem className="w-36 h-36" logoUrl={school.logoUrl} accentColor={theme.primary} />
        </div>
      )}

      {/* Top Header */}
      <div
        className="px-2.5 py-1 text-white flex items-center justify-between"
        style={{ backgroundColor: theme.primary }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <SchoolEmblem
            className="w-6 h-6 shrink-0"
            logoUrl={school.logoUrl}
            accentColor={theme.accent}
          />
          <div className="truncate leading-tight">
            <h1 className="text-[9.5px] font-bold tracking-tight truncate text-white">
              {school.schoolNameGujarati}
            </h1>
            {settings.showSchoolEnglishName && school.schoolNameEnglish && (
              <h2 className="text-[6.5px] text-white/80 tracking-tight truncate">
                {school.schoolNameEnglish}
              </h2>
            )}
          </div>
        </div>

        <span
          className="text-[7.5px] font-bold text-slate-950 px-2 py-0.5 rounded-full shrink-0 tracking-wide uppercase"
          style={{ backgroundColor: theme.accent }}
        >
          {school.academicYear}
        </span>
      </div>

      {/* Body: Left Photo, Middle Info, Right QR & Sign */}
      <div className="px-2.5 py-1 flex items-center justify-between gap-2.5 flex-1">
        {/* Left: Photo */}
        <div className="relative shrink-0">
          <div
            className="w-16 h-20 rounded-lg overflow-hidden border-2 shadow-xs bg-slate-100 flex items-center justify-center"
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
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px]">
                ફોટો
              </div>
            )}
          </div>

          {settings.showBloodGroup && student.bloodGroup && (
            <div className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[6.5px] font-bold px-1 py-0.2 rounded-full border border-white flex items-center gap-0.5 shadow-2xs">
              <Droplet className="w-1.5 h-1.5 fill-white" />
              <span>{student.bloodGroup}</span>
            </div>
          )}
        </div>

        {/* Center: Details */}
        <div className="flex-1 min-w-0 leading-tight">
          <h3 className="text-[10.5px] font-bold truncate leading-snug" style={{ color: theme.primary }}>
            {student.fullNameGujarati}
          </h3>
          {student.fullNameEnglish && (
            <p className="text-[7.5px] font-semibold text-slate-600 truncate uppercase tracking-tight mb-1">
              {student.fullNameEnglish}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[8px] bg-slate-50 p-1.5 rounded-lg border border-slate-200/80">
            <div>
              <span className="text-slate-500 font-medium">ધોરણ: </span>
              <span className="font-bold text-slate-900">{student.standard} - {student.division}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">રોલ નં: </span>
              <span className="font-bold text-slate-900 font-mono">{student.rollNo}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">જી.આર. નં: </span>
              <span className="font-bold text-slate-900 font-mono">{student.grNo}</span>
            </div>
            <div>
              <span className="text-slate-500 font-medium">જન્મ તારીખ: </span>
              <span className="font-semibold text-slate-900 font-mono">{student.dob}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 font-medium">મોબાઇલ: </span>
              <span className="font-bold text-slate-900 font-mono">{student.fatherPhone}</span>
            </div>
          </div>
        </div>

        {/* Right: QR Code & Principal Signature */}
        <div className="flex flex-col items-center justify-between h-full py-0.5 shrink-0 w-16">
          {settings.showQrCode && qrCodeUrl ? (
            <img
              src={qrCodeUrl}
              alt="QR Code"
              className="w-10 h-10 rounded border border-slate-200 shadow-2xs"
            />
          ) : (
            <div className="text-[7px] text-slate-400 font-mono">GR: {student.grNo}</div>
          )}

          {settings.showPrincipalSign && (
            <div className="text-center mt-1">
              {school.principalSignUrl ? (
                <img
                  src={school.principalSignUrl}
                  alt="Principal Signature"
                  className="h-4.5 w-12 object-contain mx-auto"
                />
              ) : (
                <div className="h-4.5 w-12 flex items-center justify-center text-[6px] italic text-slate-400">
                  RK Patel
                </div>
              )}
              <div className="border-t border-slate-400 pt-0.5 text-[6px] font-bold text-slate-800 leading-none">
                આચાર્ય / Principal
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Ribbon */}
      <div
        className="px-2.5 py-0.5 text-[6.5px] text-white/90 flex items-center justify-between"
        style={{ backgroundColor: theme.primary }}
      >
        <span className="truncate">{school.address}</span>
        {settings.showDiseCode && school.diseCode && (
          <span className="font-mono text-white/80 shrink-0">DISE: {school.diseCode}</span>
        )}
      </div>
    </div>
  );
};
