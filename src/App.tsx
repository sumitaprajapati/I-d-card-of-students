import React, { useState, useEffect } from 'react';
import { Student, SchoolInfo, CardDesignSettings, Language } from './types';
import {
  DEFAULT_SCHOOL,
  DEFAULT_DESIGN_SETTINGS,
  SAMPLE_STUDENTS,
  THEME_CONFIGS,
} from './utils/defaults';
import { t } from './utils/translations';
import { IdCardVertical } from './components/IdCardVertical';
import { IdCardHorizontal } from './components/IdCardHorizontal';
import { StudentFormModal } from './components/StudentFormModal';
import { SchoolSettingsModal } from './components/SchoolSettingsModal';
import { PrintSheetModal } from './components/PrintSheetModal';
import { BatchImportExport } from './components/BatchImportExport';
import {
  Users,
  Building2,
  Printer,
  FileSpreadsheet,
  Plus,
  Search,
  RotateCcw,
  Edit2,
  Trash2,
  Eye,
  Check,
  Languages,
  Sliders,
  Sparkles,
} from 'lucide-react';

export default function App() {
  // Language state (default Gujarati 'gu')
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('sim_lang') as Language) || 'gu';
  });

  // School Information state
  const [school, setSchool] = useState<SchoolInfo>(() => {
    const saved = localStorage.getItem('sim_school');
    return saved ? JSON.parse(saved) : DEFAULT_SCHOOL;
  });

  // Students list state
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('sim_students');
    return saved ? JSON.parse(saved) : SAMPLE_STUDENTS;
  });

  // Design Settings state
  const [settings, setSettings] = useState<CardDesignSettings>(() => {
    const saved = localStorage.getItem('sim_settings');
    return saved ? JSON.parse(saved) : DEFAULT_DESIGN_SETTINGS;
  });

  // Selected student for preview
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students[0]?.id || ''
  );

  // Preview card side
  const [previewSide, setPreviewSide] = useState<'front' | 'back'>('front');

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isSpreadsheetOpen, setIsSpreadsheetOpen] = useState(false);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('sim_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('sim_school', JSON.stringify(school));
  }, [school]);

  useEffect(() => {
    localStorage.setItem('sim_students', JSON.stringify(students));
    if (!students.find((s) => s.id === selectedStudentId) && students.length > 0) {
      setSelectedStudentId(students[0].id);
    }
  }, [students, selectedStudentId]);

  useEffect(() => {
    localStorage.setItem('sim_settings', JSON.stringify(settings));
  }, [settings]);

  const strings = t[lang];

  // Filtered students
  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.fullNameGujarati.toLowerCase().includes(q) ||
      s.fullNameEnglish.toLowerCase().includes(q) ||
      s.rollNo.includes(q) ||
      s.grNo.toLowerCase().includes(q) ||
      s.standard.toLowerCase().includes(q)
    );
  });

  const activeStudent =
    students.find((s) => s.id === selectedStudentId) || students[0] || SAMPLE_STUDENTS[0];

  // Actions
  const handleAddStudent = () => {
    setEditingStudent(null);
    setIsStudentModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsStudentModalOpen(true);
  };

  const handleDeleteStudent = (id: string, name: string) => {
    const confirmText =
      lang === 'gu'
        ? `શું તમે વિદ્યાર્થી "${name}" નું આઈડી કાર્ડ કાઢી નાખવા માંગો છો?`
        : `Are you sure you want to delete student "${name}"?`;
    if (window.confirm(confirmText)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleSaveStudent = (savedStudent: Student) => {
    setStudents((prev) => {
      const exists = prev.some((s) => s.id === savedStudent.id);
      if (exists) {
        return prev.map((s) => (s.id === savedStudent.id ? savedStudent : s));
      }
      return [savedStudent, ...prev];
    });
    setSelectedStudentId(savedStudent.id);
  };

  const handleResetToDefaults = () => {
    const confirmMsg =
      lang === 'gu'
        ? 'શું તમે ડિફોલ્ટ નમૂના વિદ્યાર્થીઓ અને શાળા માહિતી ફરીથી લોડ કરવા માંગો છો?'
        : 'Do you want to reload default sample students and school details?';
    if (window.confirm(confirmMsg)) {
      setStudents(SAMPLE_STUDENTS);
      setSchool(DEFAULT_SCHOOL);
      setSettings(DEFAULT_DESIGN_SETTINGS);
      setSelectedStudentId(SAMPLE_STUDENTS[0].id);
    }
  };

  const currentTheme = THEME_CONFIGS[settings.theme] || THEME_CONFIGS.navy;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans">
      {/* ======================================================== */}
      {/* 1. TOP BAR CONTRACT                                     */}
      {/* Zone 1: Single text element wordmark                    */}
      {/* Zone 2: Clean text navigation links                      */}
      {/* Zone 3: Primary action button                            */}
      {/* ======================================================== */}
      <header className="no-print bg-white border-b border-slate-200/90 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: currentTheme.primary }}
            >
              <Users className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 block truncate">
                {lang === 'gu' ? 'શાળા ID કાર્ડ મેકર' : 'School ID Card Maker'}
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:block truncate">
                {school.schoolNameGujarati}
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-600">
            <button
              onClick={() => setIsSchoolModalOpen(true)}
              className="hover:text-blue-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{strings.schoolDetails}</span>
            </button>
            <button
              onClick={() => setIsSpreadsheetOpen(true)}
              className="hover:text-emerald-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{strings.importExport}</span>
            </button>
            <button
              onClick={handleResetToDefaults}
              className="hover:text-slate-900 transition-colors flex items-center gap-1 text-slate-500 cursor-pointer"
              title={strings.sampleStudents}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{strings.sampleStudents}</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2.5">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'gu' ? 'en' : 'gu')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              title="ભાષા બદલો / Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'gu' ? 'ગુજરાતી' : 'English'}</span>
            </button>

            {/* Batch Print A4 Button */}
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
              style={{ backgroundColor: currentTheme.primary }}
            >
              <Printer className="w-4 h-4" />
              <span className="whitespace-nowrap">{strings.batchPrint}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN WORKSPACE                                        */}
      {/* Left: Students Roster Management                         */}
      {/* Right: Real-time Live ID Card Preview & Customization    */}
      {/* ======================================================== */}
      <main className="no-print flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ============================================== */}
          {/* LEFT COLUMN: Student Roster & Actions (7 cols) */}
          {/* ============================================== */}
          <div className="lg:col-span-7 space-y-4">
            {/* Action Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={strings.searchStudent}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition-all"
                />
              </div>

              {/* Add Student Button */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleAddStudent}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{strings.addStudent}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSpreadsheetOpen(true)}
                  className="p-2 text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                  title={strings.quickSpreadsheet}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Students Count & Info Header */}
            <div className="flex items-center justify-between px-1 text-xs text-slate-500">
              <span>
                {lang === 'gu'
                  ? `કુલ ${filteredStudents.length} વિદ્યાર્થીઓ ઉપલબ્ધ છે`
                  : `Showing ${filteredStudents.length} students`}
              </span>
              <span className="hidden sm:inline">
                {lang === 'gu'
                  ? 'કાર્ડ જોવા માટે વિદ્યાર્થી પર ક્લિક કરો'
                  : 'Click on a student to preview ID card'}
              </span>
            </div>

            {/* Student Cards List */}
            {filteredStudents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
                <Users className="w-12 h-12 mx-auto text-slate-300" />
                <p className="text-sm font-medium">
                  {lang === 'gu' ? 'કોઈ વિદ્યાર્થી મળ્યા નથી' : 'No students found'}
                </p>
                <button
                  type="button"
                  onClick={handleAddStudent}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{strings.addStudent}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[640px] overflow-y-auto pr-1">
                {filteredStudents.map((std) => {
                  const isSelected = std.id === selectedStudentId;
                  return (
                    <div
                      key={std.id}
                      onClick={() => setSelectedStudentId(std.id)}
                      className={`group p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-left ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-400 ring-2 ring-blue-400/20 shadow-xs'
                          : 'bg-white border-slate-200/90 hover:border-slate-300 hover:shadow-2xs'
                      }`}
                    >
                      {/* Photo & Identity */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                          {std.photoUrl ? (
                            <img
                              src={std.photoUrl}
                              alt={std.fullNameGujarati}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Users className="w-full h-full p-2 text-slate-300" />
                          )}
                        </div>

                        <div className="min-w-0 leading-tight">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 bg-slate-100 text-slate-700 rounded">
                              #{std.rollNo}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {std.grNo}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {std.fullNameGujarati}
                          </h4>
                          {std.fullNameEnglish && (
                            <p className="text-[10px] text-slate-500 truncate uppercase">
                              {std.fullNameEnglish}
                            </p>
                          )}
                          <p className="text-[11px] text-blue-700 font-medium mt-0.5">
                            {std.standard} · {std.division}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStudent(std);
                            }}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-100/50 rounded-lg transition-colors cursor-pointer"
                            title={strings.editStudent}
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStudent(std.id, std.fullNameGujarati);
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-100/50 rounded-lg transition-colors cursor-pointer"
                            title={strings.deleteStudent}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {isSelected && (
                          <span className="text-[9px] font-semibold text-blue-700 flex items-center gap-0.5 bg-blue-100/80 px-1.5 py-0.5 rounded-full">
                            <Check className="w-2.5 h-2.5" />
                            {lang === 'gu' ? 'પસંદ કરેલ' : 'Previewing'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Live Card Preview & Customization (5 cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Preview Card Box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              {/* Preview Header & Side Switcher */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-sm">{strings.preview}</h3>
                </div>

                {/* Front / Back Side Toggle */}
                <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewSide('front')}
                    className={`px-3 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                      previewSide === 'front'
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {strings.frontSide}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSide('back')}
                    className={`px-3 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                      previewSide === 'back'
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {strings.backSide}
                  </button>
                </div>
              </div>

              {/* Physical Card Container Canvas */}
              <div className="bg-gradient-to-b from-slate-100 to-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[360px] border border-slate-200/80 shadow-inner relative overflow-hidden">
                {/* Lanyard Hole Clip Simulator (Subtle realistic detail) */}
                <div className="w-10 h-2 bg-slate-400/50 rounded-full mb-3 shadow-inner border border-slate-300/80" />

                {/* The Live Rendered Card Component */}
                {activeStudent ? (
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    {settings.orientation === 'vertical' ? (
                      <IdCardVertical
                        student={activeStudent}
                        school={school}
                        settings={settings}
                        side={previewSide}
                        showCutLines={false}
                      />
                    ) : (
                      <IdCardHorizontal
                        student={activeStudent}
                        school={school}
                        settings={settings}
                        side={previewSide}
                        showCutLines={false}
                      />
                    )}
                  </div>
                ) : (
                  <div className="text-slate-400 text-xs">
                    {lang === 'gu' ? 'કાર્ડ જોવા માટે વિદ્યાર્થી પસંદ કરો' : 'Select a student'}
                  </div>
                )}
              </div>

              {/* Quick Actions Under Preview */}
              <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => setIsPrintModalOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{lang === 'gu' ? 'A4 શીટ પ્રિન્ટ કરો' : 'Print A4 Sheet'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (activeStudent) handleEditStudent(activeStudent);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{lang === 'gu' ? 'વિગતો બદલો' : 'Edit'}</span>
                </button>
              </div>
            </div>

            {/* Customization & Design Controls Panel */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-sm">{strings.cardDesign}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSchoolModalOpen(true)}
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Building2 className="w-3 h-3" />
                  <span>{strings.schoolDetails}</span>
                </button>
              </div>

              {/* 1. Orientation Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  {strings.cardOrientation}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, orientation: 'vertical' }))}
                    className={`py-2 px-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                      settings.orientation === 'vertical'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {strings.vertical}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettings((s) => ({ ...s, orientation: 'horizontal' }))}
                    className={`py-2 px-3 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                      settings.orientation === 'horizontal'
                        ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {strings.horizontal}
                  </button>
                </div>
              </div>

              {/* 2. Color Themes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  {strings.themeColor}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {Object.values(THEME_CONFIGS).map((thm) => {
                    const isSelected = settings.theme === thm.id;
                    return (
                      <button
                        key={thm.id}
                        type="button"
                        onClick={() =>
                          setSettings((s) => ({ ...s, theme: thm.id as CardDesignSettings['theme'] }))
                        }
                        className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col gap-1.5 ${
                          isSelected
                            ? 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/50'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-4 h-4 rounded-full shadow-2xs shrink-0"
                            style={{ backgroundColor: thm.primary }}
                          />
                          <span className="font-semibold text-slate-800 text-[11px] truncate">
                            {lang === 'gu' ? thm.nameGu.split(' ')[0] : thm.nameEn.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Toggleable Card Elements */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <span className="block font-semibold text-slate-700 mb-1">
                  {lang === 'gu' ? 'કાર્ડ પર દર્શાવવાના ઘટકો:' : 'Visible Card Elements:'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.showQrCode}
                      onChange={(e) => setSettings((s) => ({ ...s, showQrCode: e.target.checked }))}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>QR કોડ (Scannable QR)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.showBloodGroup}
                      onChange={(e) => setSettings((s) => ({ ...s, showBloodGroup: e.target.checked }))}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>બ્લડ ગ્રૂપ (Blood Group)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.showPrincipalSign}
                      onChange={(e) => setSettings((s) => ({ ...s, showPrincipalSign: e.target.checked }))}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>આચાર્ય સહી (Principal Sign)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.showDiseCode}
                      onChange={(e) => setSettings((s) => ({ ...s, showDiseCode: e.target.checked }))}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>DISE નંબર (DISE Code)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.showWatermark}
                      onChange={(e) => setSettings((s) => ({ ...s, showWatermark: e.target.checked }))}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>વોટરમાર્ક પ્રતીક (Watermark)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                    <input
                      type="checkbox"
                      checked={settings.showSchoolEnglishName}
                      onChange={(e) => setSettings((s) => ({ ...s, showSchoolEnglishName: e.target.checked }))}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span>અંગ્રેજી નામ (English Title)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* 3. MODALS & SUB-COMPONENTS                               */}
      {/* ======================================================== */}
      {/* Student Add/Edit Modal */}
      {isStudentModalOpen && (
        <StudentFormModal
          student={editingStudent}
          onSave={handleSaveStudent}
          onClose={() => setIsStudentModalOpen(false)}
          lang={lang}
        />
      )}

      {/* School Details & Branding Modal */}
      {isSchoolModalOpen && (
        <SchoolSettingsModal
          school={school}
          onSave={(updated) => setSchool(updated)}
          onClose={() => setIsSchoolModalOpen(false)}
          lang={lang}
        />
      )}

      {/* Batch A4 Print Modal */}
      {isPrintModalOpen && (
        <PrintSheetModal
          students={students}
          school={school}
          settings={settings}
          onClose={() => setIsPrintModalOpen(false)}
          lang={lang}
        />
      )}

      {/* Spreadsheet & Bulk Import/Export Modal */}
      {isSpreadsheetOpen && (
        <BatchImportExport
          students={students}
          onUpdateStudents={(updated) => setStudents(updated)}
          onClose={() => setIsSpreadsheetOpen(false)}
          lang={lang}
        />
      )}
    </div>
  );
}
