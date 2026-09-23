import React, { useRef, useState } from 'react';
import { Student } from '../types';
import { BOY_STUDENT_AVATAR, GIRL_STUDENT_AVATAR } from '../utils/defaults';
import { FileSpreadsheet, Download, Upload, Plus, Trash2, Check, X, AlertCircle } from 'lucide-react';

interface BatchImportExportProps {
  students: Student[];
  onUpdateStudents: (students: Student[]) => void;
  onClose: () => void;
  lang?: 'gu' | 'en';
}

export const BatchImportExport: React.FC<BatchImportExportProps> = ({
  students,
  onUpdateStudents,
  onClose,
  lang = 'gu',
}) => {
  const [editableRows, setEditableRows] = useState<Student[]>([...students]);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleRowChange = (index: number, field: keyof Student, value: string) => {
    setEditableRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddRow = () => {
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      grNo: `GR-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNo: String(editableRows.length + 1),
      fullNameGujarati: '',
      fullNameEnglish: '',
      standard: 'ધોરણ ૭ (Std 7)',
      division: 'અ (A)',
      dob: '2013-05-10',
      bloodGroup: 'B+',
      fatherName: '',
      fatherPhone: '',
      emergencyPhone: '',
      address: '',
      busRoute: '',
      gender: 'male',
      photoUrl: BOY_STUDENT_AVATAR,
    };
    setEditableRows((prev) => [...prev, newStudent]);
  };

  const handleDeleteRow = (index: number) => {
    setEditableRows((prev) => prev.filter((_, i) => i !== index));
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'GR No',
      'Roll No',
      'Name Gujarati',
      'Name English',
      'Standard',
      'Division',
      'DOB',
      'Blood Group',
      'Father Name',
      'Father Phone',
      'Emergency Phone',
      'Address',
      'Bus Route',
      'Gender',
    ];

    const rows = editableRows.map((s) => [
      `"${s.grNo}"`,
      `"${s.rollNo}"`,
      `"${s.fullNameGujarati}"`,
      `"${s.fullNameEnglish}"`,
      `"${s.standard}"`,
      `"${s.division}"`,
      `"${s.dob}"`,
      `"${s.bloodGroup}"`,
      `"${s.fatherName}"`,
      `"${s.fatherPhone}"`,
      `"${s.emergencyPhone}"`,
      `"${s.address}"`,
      `"${s.busRoute || ''}"`,
      `"${s.gender}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `school_students_list_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatusMsg({
      type: 'success',
      text: lang === 'gu' ? 'CSV ફાઇલ સફળતાપૂર્વક ડાઉનલોડ થઈ.' : 'CSV exported successfully.',
    });
  };

  // Import from CSV
  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          setStatusMsg({
            type: 'error',
            text: lang === 'gu' ? 'CSV ફાઇલમાં પર્યાપ્ત ડેટા નથી.' : 'CSV has insufficient rows.',
          });
          return;
        }

        // Parse CSV rows handling basic quotes
        const newStudents: Student[] = [];
        for (let i = 1; i < lines.length; i++) {
          const rowText = lines[i];
          const parts: string[] = [];
          let current = '';
          let inQuotes = false;
          for (let c = 0; c < rowText.length; c++) {
            const char = rowText[c];
            if (char === '"') inQuotes = !inQuotes;
            else if (char === ',' && !inQuotes) {
              parts.push(current.trim().replace(/^"|"$/g, ''));
              current = '';
            } else {
              current += char;
            }
          }
          parts.push(current.trim().replace(/^"|"$/g, ''));

          if (parts[2] || parts[3]) {
            const genderVal = parts[13]?.toLowerCase().includes('female') || parts[13]?.includes('કન્યા') ? 'female' : 'male';
            newStudents.push({
              id: `imported-${Date.now()}-${i}`,
              grNo: parts[0] || `GR-${1000 + i}`,
              rollNo: parts[1] || String(i),
              fullNameGujarati: parts[2] || '',
              fullNameEnglish: parts[3] || '',
              standard: parts[4] || 'ધોરણ ૭ (Std 7)',
              division: parts[5] || 'અ (A)',
              dob: parts[6] || '15/08/2013',
              bloodGroup: parts[7] || 'B+',
              fatherName: parts[8] || '',
              fatherPhone: parts[9] || '',
              emergencyPhone: parts[10] || '',
              address: parts[11] || '',
              busRoute: parts[12] || '',
              gender: genderVal,
              photoUrl: genderVal === 'female' ? GIRL_STUDENT_AVATAR : BOY_STUDENT_AVATAR,
            });
          }
        }

        if (newStudents.length > 0) {
          setEditableRows(newStudents);
          setStatusMsg({
            type: 'success',
            text:
              lang === 'gu'
                ? `${newStudents.length} વિદ્યાર્થીઓ CSV માંથી આયાત કરવામાં આવ્યા.`
                : `${newStudents.length} students imported from CSV.`,
          });
        }
      } catch (err) {
        console.error(err);
        setStatusMsg({
          type: 'error',
          text: lang === 'gu' ? 'CSV ફાઇલ વાંચવામાં ક્ષતિ આવી.' : 'Failed to parse CSV.',
        });
      }
    };
    reader.readAsText(file);
  };

  const handleSaveAll = () => {
    onUpdateStudents(editableRows);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'gu'
                  ? 'વિદ્યાર્થી ડેટા શીટ / એક્સેલ ટૂલ (Spreadsheet Editor)'
                  : 'Student Spreadsheet & Bulk Import'}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === 'gu'
                  ? 'બધા વિદ્યાર્થીઓની વિગતો સીધા ટેબલમાં ઝડપથી લખો અથવા CSV થી આયાત કરો'
                  : 'Quickly edit student details like a spreadsheet or import from CSV'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              {lang === 'gu' ? 'CSV ડાઉનલોડ' : 'Export CSV'}
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg shadow-2xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-emerald-600" />
              {lang === 'gu' ? 'CSV આયાત કરો' : 'Import CSV'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div
            className={`px-6 py-2 text-xs flex items-center gap-2 ${
              statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Spreadsheet Table View */}
        <div className="flex-1 overflow-auto p-4 bg-slate-50">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="py-2.5 px-3 w-12 text-center">#</th>
                  <th className="py-2.5 px-3 w-20">રોલ નં</th>
                  <th className="py-2.5 px-3 w-24">જી.આર. નં</th>
                  <th className="py-2.5 px-3 min-w-[180px]">વિદ્યાર્થીનું નામ (ગુજરાતી)</th>
                  <th className="py-2.5 px-3 min-w-[180px]">Student Name (English)</th>
                  <th className="py-2.5 px-3 w-28">ધોરણ</th>
                  <th className="py-2.5 px-3 w-20">વર્ગ</th>
                  <th className="py-2.5 px-3 w-28">જન્મ તારીખ</th>
                  <th className="py-2.5 px-3 w-20">બ્લડ</th>
                  <th className="py-2.5 px-3 min-w-[140px]">વાલીનો ફોન</th>
                  <th className="py-2.5 px-3 min-w-[200px]">સરનામું</th>
                  <th className="py-2.5 px-3 w-16 text-center">ક્રિયા</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {editableRows.map((row, index) => (
                  <tr key={row.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-1.5 px-2 text-center text-slate-400 font-mono text-[11px]">{index + 1}</td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.rollNo}
                        onChange={(e) => handleRowChange(index, 'rollNo', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.grNo}
                        onChange={(e) => handleRowChange(index, 'grNo', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.fullNameGujarati}
                        placeholder="દા.ત. પટેલ આરવ"
                        onChange={(e) => handleRowChange(index, 'fullNameGujarati', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.fullNameEnglish}
                        placeholder="e.g. PATEL AARAV"
                        onChange={(e) => handleRowChange(index, 'fullNameEnglish', e.target.value.toUpperCase())}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs uppercase"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.standard}
                        onChange={(e) => handleRowChange(index, 'standard', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.division}
                        onChange={(e) => handleRowChange(index, 'division', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs text-center"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.dob}
                        placeholder="DD/MM/YYYY"
                        onChange={(e) => handleRowChange(index, 'dob', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <select
                        value={row.bloodGroup}
                        onChange={(e) => handleRowChange(index, 'bloodGroup', e.target.value)}
                        className="w-full px-1.5 py-1 bg-white border border-slate-200 rounded text-xs"
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
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.fatherPhone}
                        placeholder="+91..."
                        onChange={(e) => handleRowChange(index, 'fatherPhone', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="py-1.5 px-2">
                      <input
                        type="text"
                        value={row.address}
                        placeholder="સરનામું"
                        onChange={(e) => handleRowChange(index, 'address', e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="py-1.5 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleDeleteRow(index)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors"
                        title="કાઢી નાખો"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handleAddRow}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              {lang === 'gu' ? '+ નવો વિદ્યાર્થી રો ઉમેરો' : '+ Add Student Row'}
            </button>

            <span className="text-xs text-slate-500 font-mono">
              {lang === 'gu' ? `કુલ: ${editableRows.length} વિદ્યાર્થીઓ` : `Total: ${editableRows.length} records`}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg transition-colors"
          >
            {lang === 'gu' ? 'રદ કરો' : 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            {lang === 'gu' ? 'બધા ફેરફારો સાચવો (Save All)' : 'Save All Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};
