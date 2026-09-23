import React, { useState } from 'react';
import { Student, SchoolInfo, CardDesignSettings } from '../types';
import { IdCardVertical } from './IdCardVertical';
import { IdCardHorizontal } from './IdCardHorizontal';
import { Printer, X, CheckSquare, Square, Layers, Scissors, Info } from 'lucide-react';

interface PrintSheetModalProps {
  students: Student[];
  school: SchoolInfo;
  settings: CardDesignSettings;
  onClose: () => void;
  lang?: 'gu' | 'en';
}

export const PrintSheetModal: React.FC<PrintSheetModalProps> = ({
  students,
  school,
  settings,
  onClose,
  lang = 'gu',
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(students.map((s) => s.id))
  );
  const [printMode, setPrintMode] = useState<'front' | 'back' | 'both'>('front');
  const [showCropMarks, setShowCropMarks] = useState<boolean>(true);

  const toggleSelectStudent = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(students.map((s) => s.id)));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  const handlePrint = () => {
    window.print();
  };

  const activeStudents = students.filter((s) => selectedIds.has(s.id));

  // Determine cards per A4 sheet
  // Vertical: 2 columns x 4 rows = 8 cards per page (54mm x 85.6mm)
  // Horizontal: 2 columns x 4 rows = 8 cards per page (85.6mm x 54mm)
  const cardsPerPage = 8;

  // Chunk students into pages
  const pages: Student[][] = [];
  for (let i = 0; i < activeStudents.length; i += cardsPerPage) {
    pages.push(activeStudents.slice(i, i + cardsPerPage));
  }

  return (
    <>
      {/* On-screen controls & preview (hidden in print) */}
      <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col">
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === 'gu' ? 'A4 પ્રિન્ટ શીટ લેઆઉટ (A4 Batch Print)' : 'A4 Batch Print Preview'}
                </h3>
                <p className="text-xs text-slate-500">
                  {lang === 'gu'
                    ? `${activeStudents.length} વિદ્યાર્થીઓ પસંદ કર્યા · ${pages.length} A4 પેજ બનશે`
                    : `${activeStudents.length} students selected · ${pages.length} A4 page(s)`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                disabled={activeStudents.length === 0}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                {lang === 'gu' ? 'પ્રિન્ટ શરૂ કરો (Print)' : 'Print Now'}
              </button>

              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Options Strip */}
          <div className="px-6 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Print Mode (Front, Back, Both) */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">
                {lang === 'gu' ? 'પ્રિન્ટ બાજુ:' : 'Side to Print:'}
              </span>
              <div className="inline-flex p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setPrintMode('front')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors ${
                    printMode === 'front' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'gu' ? 'આગળની બાજુ (Front)' : 'Front Side'}
                </button>
                <button
                  type="button"
                  onClick={() => setPrintMode('back')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors ${
                    printMode === 'back' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'gu' ? 'પાછળની બાજુ (Back)' : 'Back Side'}
                </button>
                <button
                  type="button"
                  onClick={() => setPrintMode('both')}
                  className={`px-3 py-1 font-medium rounded-md transition-colors ${
                    printMode === 'both' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lang === 'gu' ? 'બંને બાજુ (Both)' : 'Both Sides'}
                </button>
              </div>
            </div>

            {/* Crop Marks & Selection controls */}
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={showCropMarks}
                  onChange={(e) => setShowCropMarks(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <Scissors className="w-3.5 h-3.5 text-slate-400" />
                <span>{lang === 'gu' ? 'કટીંગ ગાઈડ દર્શાવો (Crop Lines)' : 'Cutting Guides'}</span>
              </label>

              <div className="h-4 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {lang === 'gu' ? 'બધા પસંદ' : 'Select All'}
                </button>
                <span className="text-slate-300">·</span>
                <button
                  type="button"
                  onClick={deselectAll}
                  className="text-slate-500 hover:underline font-medium"
                >
                  {lang === 'gu' ? 'રદ કરો' : 'Clear'}
                </button>
              </div>
            </div>
          </div>

          {/* Student Multi-Selection chips / checklist */}
          <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-slate-500 font-medium shrink-0">
              {lang === 'gu' ? 'વિદ્યાર્થીઓ:' : 'Students:'}
            </span>
            <div className="flex items-center gap-1.5 flex-nowrap">
              {students.map((std) => {
                const isChecked = selectedIds.has(std.id);
                return (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => toggleSelectStudent(std.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors whitespace-nowrap ${
                      isChecked
                        ? 'bg-blue-50 text-blue-800 border-blue-200'
                        : 'bg-white text-slate-400 border-slate-200 line-through opacity-70'
                    }`}
                  >
                    {isChecked ? <CheckSquare className="w-3 h-3 text-blue-600" /> : <Square className="w-3 h-3" />}
                    <span>{std.rollNo}. {std.fullNameGujarati || std.fullNameEnglish}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sheet Preview scroll area */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-100 flex flex-col items-center gap-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-xs max-w-2xl flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>
                {lang === 'gu'
                  ? 'પ્રિન્ટ ટીપ: બ્રાઉઝરના પ્રિન્ટ ડાયલોગમાં "Margins: None" અથવા "Default" અને "Background Graphics: Checked" રાખો. આથી રંગો અને કટીંગ ગાઈડ્સ બરાબર આવશે.'
                  : 'Print Tip: In the browser print dialog, choose "Margins: None" and ensure "Background graphics" is enabled for perfect card colors.'}
              </span>
            </div>

            {pages.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <p>{lang === 'gu' ? 'કોઈ વિદ્યાર્થી પસંદ કરેલ નથી.' : 'No students selected for printing.'}</p>
              </div>
            ) : (
              pages.map((pageStudents, pageIdx) => (
                <div
                  key={pageIdx}
                  className="bg-white shadow-xl rounded-lg p-6 border border-slate-200 flex flex-col items-center"
                  style={{
                    width: '210mm',
                    minHeight: '297mm',
                    boxSizing: 'border-box',
                  }}
                >
                  <div className="w-full text-center text-slate-400 text-[11px] mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span>
                      {school.schoolNameGujarati} - {lang === 'gu' ? 'A4 આઈડી કાર્ડ શીટ' : 'A4 ID Card Sheet'}
                    </span>
                    <span>
                      {lang === 'gu' ? `પેજ ${pageIdx + 1} / ${pages.length}` : `Page ${pageIdx + 1} of ${pages.length}`}
                    </span>
                  </div>

                  {/* ID Card Grid in A4: 2 columns */}
                  <div
                    className="grid grid-cols-2 gap-x-6 gap-y-5 justify-items-center items-center"
                    style={{ maxWidth: '190mm' }}
                  >
                    {pageStudents.map((student) => (
                      <React.Fragment key={student.id}>
                        {printMode === 'both' ? (
                          <div className="flex gap-3">
                            {settings.orientation === 'vertical' ? (
                              <>
                                <IdCardVertical
                                  student={student}
                                  school={school}
                                  settings={settings}
                                  side="front"
                                  showCutLines={showCropMarks}
                                />
                                <IdCardVertical
                                  student={student}
                                  school={school}
                                  settings={settings}
                                  side="back"
                                  showCutLines={showCropMarks}
                                />
                              </>
                            ) : (
                              <div className="flex flex-col gap-2">
                                <IdCardHorizontal
                                  student={student}
                                  school={school}
                                  settings={settings}
                                  side="front"
                                  showCutLines={showCropMarks}
                                />
                                <IdCardHorizontal
                                  student={student}
                                  school={school}
                                  settings={settings}
                                  side="back"
                                  showCutLines={showCropMarks}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            {settings.orientation === 'vertical' ? (
                              <IdCardVertical
                                student={student}
                                school={school}
                                settings={settings}
                                side={printMode}
                                showCutLines={showCropMarks}
                              />
                            ) : (
                              <IdCardHorizontal
                                student={student}
                                school={school}
                                settings={settings}
                                side={printMode}
                                showCutLines={showCropMarks}
                              />
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* PRINT-ONLY DOM CONTAINER (Strictly formatted for physical printer output) */}
      <div className="print-only">
        {pages.map((pageStudents, pageIdx) => (
          <div
            key={`print-page-${pageIdx}`}
            className="page-break-after print-container p-2 flex flex-col items-center"
            style={{
              width: '100%',
              minHeight: '290mm',
              boxSizing: 'border-box',
            }}
          >
            {/* Header info for cutter operator */}
            <div className="w-full text-center text-[8px] text-slate-400 mb-2 border-b border-slate-200 pb-1">
              <span>{school.schoolNameGujarati} · {school.academicYear} · Sheet {pageIdx + 1} of {pages.length}</span>
            </div>

            {/* Strict grid of cards */}
            <div
              className={`grid grid-cols-2 gap-x-5 gap-y-4 justify-items-center items-center`}
              style={{ width: '100%' }}
            >
              {pageStudents.map((student) => (
                <React.Fragment key={`print-${student.id}`}>
                  {printMode === 'both' ? (
                    <div className="flex gap-2.5">
                      {settings.orientation === 'vertical' ? (
                        <>
                          <IdCardVertical
                            student={student}
                            school={school}
                            settings={settings}
                            side="front"
                            showCutLines={showCropMarks}
                          />
                          <IdCardVertical
                            student={student}
                            school={school}
                            settings={settings}
                            side="back"
                            showCutLines={showCropMarks}
                          />
                        </>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <IdCardHorizontal
                            student={student}
                            school={school}
                            settings={settings}
                            side="front"
                            showCutLines={showCropMarks}
                          />
                          <IdCardHorizontal
                            student={student}
                            school={school}
                            settings={settings}
                            side="back"
                            showCutLines={showCropMarks}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {settings.orientation === 'vertical' ? (
                        <IdCardVertical
                          student={student}
                          school={school}
                          settings={settings}
                          side={printMode}
                          showCutLines={showCropMarks}
                        />
                      ) : (
                        <IdCardHorizontal
                          student={student}
                          school={school}
                          settings={settings}
                          side={printMode}
                          showCutLines={showCropMarks}
                        />
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
