import React, { useState, useRef } from 'react';
import { SchoolInfo } from '../types';
import { SchoolEmblem } from './SchoolEmblem';
import { SignaturePad } from './SignaturePad';
import { Building2, Upload, PenTool, Check, X, RotateCcw, HelpCircle } from 'lucide-react';

interface SchoolSettingsModalProps {
  school: SchoolInfo;
  onSave: (updatedSchool: SchoolInfo) => void;
  onClose: () => void;
  lang?: 'gu' | 'en';
}

export const SchoolSettingsModal: React.FC<SchoolSettingsModalProps> = ({
  school,
  onSave,
  onClose,
  lang = 'gu',
}) => {
  const [formData, setFormData] = useState<SchoolInfo>({ ...school });
  const [isSignPadOpen, setIsSignPadOpen] = useState(false);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, logoUrl: event.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleResetLogo = () => {
    setFormData((prev) => ({ ...prev, logoUrl: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'gu' ? 'શાળાની સામાન્ય વિગતો (School Settings)' : 'School Information & Branding'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'gu' ? 'આ વિગતો તમામ આઈડી કાર્ડ પર પ્રિન્ટ થશે' : 'These details will appear across all printed ID cards'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Logo & Signature Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {/* School Logo */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                {lang === 'gu' ? 'શાળાનો લોગો (School Logo):' : 'School Logo:'}
              </span>
              <div className="flex items-center gap-3">
                <SchoolEmblem
                  className="w-16 h-16 shrink-0"
                  logoUrl={formData.logoUrl}
                  accentColor="#F59E0B"
                />
                <div className="space-y-1.5">
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    {lang === 'gu' ? 'નવો લોગો અપલોડ' : 'Upload Logo'}
                  </button>
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  {formData.logoUrl && (
                    <button
                      type="button"
                      onClick={handleResetLogo}
                      className="block text-[11px] text-rose-600 hover:underline"
                    >
                      {lang === 'gu' ? 'મૂળ પ્રતીક સેટ કરો' : 'Reset to Emblem'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Principal Signature */}
            <div>
              <span className="block text-xs font-semibold text-slate-700 mb-2">
                {lang === 'gu' ? 'આચાર્યશ્રીની સહી (Principal Sign):' : 'Principal Signature:'}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-14 bg-white border border-slate-200 rounded-lg flex items-center justify-center p-1 shadow-2xs">
                  {formData.principalSignUrl ? (
                    <img
                      src={formData.principalSignUrl}
                      alt="Signature"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">ડિફોલ્ટ સહી</span>
                  )}
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setIsSignPadOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    {lang === 'gu' ? 'સહી દોરો / બદલો' : 'Draw Sign'}
                  </button>
                  {formData.principalSignUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, principalSignUrl: '' }))}
                      className="block text-[11px] text-slate-500 hover:underline"
                    >
                      {lang === 'gu' ? 'સહી હટાવો' : 'Clear Sign'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* School Name in Gujarati & English */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'શાળાનું નામ (ગુજરાતીમાં) *' : 'School Name (Gujarati) *'}
              </label>
              <input
                type="text"
                required
                value={formData.schoolNameGujarati}
                onChange={(e) => setFormData({ ...formData, schoolNameGujarati: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'શાળાનું નામ (English) *' : 'School Name (English) *'}
              </label>
              <input
                type="text"
                required
                value={formData.schoolNameEnglish}
                onChange={(e) => setFormData({ ...formData, schoolNameEnglish: e.target.value.toUpperCase() })}
                className="w-full px-3 py-1.5 text-sm uppercase bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Trust Name & DISE Code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'ટ્રસ્ટ / સંચાલક મંડળનું નામ' : 'Trust / Society Name'}
              </label>
              <input
                type="text"
                value={formData.trustName}
                onChange={(e) => setFormData({ ...formData, trustName: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'DISE કોડ / રજીસ્ટ્રેશન નંબર' : 'DISE Code / Registration No'}
              </label>
              <input
                type="text"
                value={formData.diseCode}
                onChange={(e) => setFormData({ ...formData, diseCode: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Academic Year & Principal Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'શૈક્ષણિક વર્ષ (Academic Year)' : 'Academic Year'}
              </label>
              <input
                type="text"
                value={formData.academicYear}
                placeholder="2026 - 2027"
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'આચાર્યશ્રીનું નામ' : 'Principal Name'}
              </label>
              <input
                type="text"
                value={formData.principalName}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* School Address & Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'શાળાનું સરનામું (Address)' : 'School Address'}
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'સંપર્ક નંબર (Phone)' : 'Phone Number'}
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
            >
              {lang === 'gu' ? 'રદ કરો' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              <Check className="w-4 h-4" />
              {lang === 'gu' ? 'વિગતો સાચવો' : 'Save Details'}
            </button>
          </div>
        </form>
      </div>

      {/* Signature Canvas Pad Modal */}
      {isSignPadOpen && (
        <SignaturePad
          initialSignature={formData.principalSignUrl}
          onSave={(signData) => setFormData((p) => ({ ...p, principalSignUrl: signData }))}
          onClose={() => setIsSignPadOpen(false)}
          lang={lang}
        />
      )}
    </div>
  );
};
