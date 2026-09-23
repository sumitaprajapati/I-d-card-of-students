import React, { useState } from 'react';
import { Student } from '../types';
import { BOY_STUDENT_AVATAR, GIRL_STUDENT_AVATAR } from '../utils/defaults';
import { CameraCaptureModal } from './CameraCaptureModal';
import { User, Phone, MapPin, Calendar, Droplet, Camera, Upload, Check, X, ShieldAlert } from 'lucide-react';

interface StudentFormModalProps {
  student?: Student | null;
  onSave: (student: Student) => void;
  onClose: () => void;
  lang?: 'gu' | 'en';
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  student,
  onSave,
  onClose,
  lang = 'gu',
}) => {
  const [formData, setFormData] = useState<Student>(
    student || {
      id: `std-${Date.now()}`,
      grNo: `GR-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNo: '1',
      fullNameGujarati: '',
      fullNameEnglish: '',
      standard: 'ધોરણ ૮ (Std 8)',
      division: 'અ (A)',
      dob: '2012-06-15',
      bloodGroup: 'B+',
      fatherName: '',
      fatherPhone: '',
      emergencyPhone: '',
      address: '',
      busRoute: '',
      gender: 'male',
      photoUrl: BOY_STUDENT_AVATAR,
      aadhaarNo: '',
    }
  );

  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenderChange = (gender: 'male' | 'female') => {
    // If photo is still one of default avatars, swap avatar
    let newPhoto = formData.photoUrl;
    if (newPhoto === BOY_STUDENT_AVATAR || newPhoto === GIRL_STUDENT_AVATAR || !newPhoto) {
      newPhoto = gender === 'male' ? BOY_STUDENT_AVATAR : GIRL_STUDENT_AVATAR;
    }
    setFormData((prev) => ({ ...prev, gender, photoUrl: newPhoto }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, photoUrl: event.target?.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullNameGujarati && !formData.fullNameEnglish) {
      setErrorMsg(lang === 'gu' ? 'કૃપા કરીને વિદ્યાર્થીનું નામ દાખલ કરો.' : 'Please enter student name.');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {student
                  ? lang === 'gu'
                    ? 'વિદ્યાર્થી માહિતી સંપાદિત કરો'
                    : 'Edit Student Details'
                  : lang === 'gu'
                    ? 'નવા વિદ્યાર્થીનું આઈડી કાર્ડ ઉમેરો'
                    : 'Add New Student for ID Card'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'gu' ? 'વિદ્યાર્થીની તમામ જરૂરી વિગતો ભરો' : 'Fill all required details for the ID card'}
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

        {/* Error notification */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-rose-700 text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Photo & Basic Identity Row */}
          <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            {/* Student Photo Preview & Actions */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div className="w-24 h-28 rounded-lg border-2 border-slate-300 overflow-hidden bg-white shadow-xs flex items-center justify-center">
                {formData.photoUrl ? (
                  <img
                    src={formData.photoUrl}
                    alt="Student"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-slate-300" />
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsCameraOpen(true)}
                  className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md border border-blue-200 text-xs flex items-center gap-1 transition-colors"
                  title="કેમેરાથી ફોટો પાડો"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">{lang === 'gu' ? 'કેમેરા' : 'Cam'}</span>
                </button>

                <label className="p-1.5 bg-white text-slate-700 hover:bg-slate-100 rounded-md border border-slate-200 text-xs flex items-center gap-1 cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px] font-medium">{lang === 'gu' ? 'અપલોડ' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Reset to Avatar */}
              <div className="flex gap-1 text-[10px] text-slate-500">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, photoUrl: BOY_STUDENT_AVATAR, gender: 'male' }))}
                  className="hover:text-blue-600 underline"
                >
                  {lang === 'gu' ? 'કુમાર અવતાર' : 'Boy'}
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, photoUrl: GIRL_STUDENT_AVATAR, gender: 'female' }))}
                  className="hover:text-pink-600 underline"
                >
                  {lang === 'gu' ? 'કન્યા અવતાર' : 'Girl'}
                </button>
              </div>
            </div>

            {/* Names & Gender */}
            <div className="flex-1 w-full space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'gu' ? 'વિદ્યાર્થીનું પૂરું નામ (ગુજરાતી) *' : 'Student Full Name (Gujarati) *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="દા.ત. પટેલ આરવ ભાવેશભાઈ"
                  value={formData.fullNameGujarati}
                  onChange={(e) => setFormData({ ...formData, fullNameGujarati: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {lang === 'gu' ? 'વિદ્યાર્થીનું નામ (English)' : 'Student Full Name (English)'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. PATEL AARAV BHAVESHBHAI"
                  value={formData.fullNameEnglish}
                  onChange={(e) => setFormData({ ...formData, fullNameEnglish: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg uppercase focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <span className="text-xs font-semibold text-slate-700">
                  {lang === 'gu' ? 'જાતિ (લિંગ):' : 'Gender:'}
                </span>
                <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender === 'male'}
                    onChange={() => handleGenderChange('male')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{lang === 'gu' ? 'કુમાર (Boy)' : 'Boy'}</span>
                </label>
                <label className="inline-flex items-center gap-1.5 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    checked={formData.gender === 'female'}
                    onChange={() => handleGenderChange('female')}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{lang === 'gu' ? 'કન્યા (Girl)' : 'Girl'}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Standard, Division, Roll No, GR No */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'ધોરણ (Standard)' : 'Standard'}
              </label>
              <input
                type="text"
                value={formData.standard}
                placeholder="દા.ત. ધોરણ ૭ / Std 7"
                onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'વર્ગ (Division)' : 'Division'}
              </label>
              <input
                type="text"
                value={formData.division}
                placeholder="દા.ત. અ / A"
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'રોલ નં. (Roll No)' : 'Roll No'}
              </label>
              <input
                type="text"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'જી.આર. નં. (G.R. No)' : 'G.R. No'}
              </label>
              <input
                type="text"
                value={formData.grNo}
                onChange={(e) => setFormData({ ...formData, grNo: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* D.O.B. & Blood Group & Aadhaar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {lang === 'gu' ? 'જન્મ તારીખ (D.O.B.)' : 'Date of Birth'}
              </label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-red-500" />
                {lang === 'gu' ? 'બ્લડ ગ્રૂપ (Blood Group)' : 'Blood Group'}
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'આધાર નં. (Aadhaar)' : 'Aadhaar No'}
              </label>
              <input
                type="text"
                placeholder="XXXX XXXX XXXX"
                value={formData.aadhaarNo || ''}
                onChange={(e) => setFormData({ ...formData, aadhaarNo: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Father / Guardian Name & Phone numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'પિતા / વાલીનું નામ' : 'Father / Guardian'}
              </label>
              <input
                type="text"
                placeholder="દા.ત. ભાવેશભાઈ પટેલ"
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                {lang === 'gu' ? 'વાલીનો ફોન નંબર *' : 'Parent Phone *'}
              </label>
              <input
                type="text"
                placeholder="+91 98250 XXXXX"
                value={formData.fatherPhone}
                onChange={(e) => setFormData({ ...formData, fatherPhone: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1 text-rose-700">
                <Phone className="w-3.5 h-3.5 text-rose-600" />
                {lang === 'gu' ? 'ઈમરજન્સી સંપર્ક નંબર' : 'Emergency Phone'}
              </label>
              <input
                type="text"
                placeholder="+91 98250 XXXXX"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                className="w-full px-3 py-1.5 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Residence Address & Bus route */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                {lang === 'gu' ? 'રહેઠાણનું સરનામું (Address)' : 'Residential Address'}
              </label>
              <input
                type="text"
                placeholder="સરનામું, સોસાયટી, ગામ/શહેર, પિનકોડ"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                {lang === 'gu' ? 'બસ રૂટ / વાહન' : 'Bus Route'}
              </label>
              <input
                type="text"
                placeholder="દા.ત. રૂટ નં. ૫ (ચાંદખેડા)"
                value={formData.busRoute || ''}
                onChange={(e) => setFormData({ ...formData, busRoute: e.target.value })}
                className="w-full px-3 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Form Actions */}
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
              {lang === 'gu' ? 'વિદ્યાર્થી સાચવો (Save)' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>

      {/* Live Camera Modal */}
      {isCameraOpen && (
        <CameraCaptureModal
          onCapture={(photo) => setFormData((prev) => ({ ...prev, photoUrl: photo }))}
          onClose={() => setIsCameraOpen(false)}
          lang={lang}
        />
      )}
    </div>
  );
};
