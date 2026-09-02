import React, { useState } from 'react';
import {
  FileHeart,
  Save,
  Printer,
  Shield,
  Check,
  User,
  Heart,
  Hospital
} from 'lucide-react';
import { useCareX } from '../../context';
import type { HealthProfile } from '../../types';

export const HealthProfileView: React.FC = () => {
  const { healthProfile, updateHealthProfile } = useCareX();

  const [formData, setFormData] = useState<HealthProfile>(healthProfile);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);

  const handleChange = (field: keyof HealthProfile, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHealthProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileHeart className="w-6 h-6 text-rose-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Emergency Health Profile
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Critical medical passport data rendered for first responders and emergency physicians.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowIdCardModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white text-xs font-bold transition-colors"
          >
            <Shield className="w-4 h-4 text-blue-500" />
            <span>Emergency Medical ID</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-600 text-white text-xs sm:text-sm font-semibold text-center shadow-md animate-fade-in flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          <span>✓ Emergency Health Profile saved securely to local storage!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span>Personal Identification</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Full Legal Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => handleChange('age', Number(e.target.value))}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Gender
              </label>
              <input
                type="text"
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Blood Group (Crucial)
              </label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => handleChange('bloodGroup', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-red-600"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Emergency ID / Tag No.
              </label>
              <input
                type="text"
                value={formData.emergencyIdCardNumber}
                onChange={(e) => handleChange('emergencyIdCardNumber', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pt-4 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Medical Factors & Allergies</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Known Allergies (Food & Drug)
              </label>
              <textarea
                rows={2}
                value={formData.allergies}
                onChange={(e) => handleChange('allergies', e.target.value)}
                placeholder="e.g. Penicillin, Peanuts, Sulfa drugs"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Current Medications & Dosage
              </label>
              <textarea
                rows={2}
                value={formData.currentMedications}
                onChange={(e) => handleChange('currentMedications', e.target.value)}
                placeholder="e.g. Metoprolol 25mg daily, Aspirin 81mg"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Chronic Conditions / Medical History
              </label>
              <input
                type="text"
                value={formData.medicalConditions}
                onChange={(e) => handleChange('medicalConditions', e.target.value)}
                placeholder="e.g. Mild Hypertension, Arrhythmia, Asthma, Diabetes"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Emergency Notes for First Responders
              </label>
              <textarea
                rows={2}
                value={formData.emergencyNotes}
                onChange={(e) => handleChange('emergencyNotes', e.target.value)}
                placeholder="e.g. Carries EpiPen / Inhaler in bag. Patient wears pacemaker."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="border-b border-slate-100 dark:border-slate-800 pt-4 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Hospital className="w-4 h-4 text-emerald-600" />
              <span>Hospital & Primary Physician</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Preferred Emergency Hospital
              </label>
              <input
                type="text"
                value={formData.preferredHospital}
                onChange={(e) => handleChange('preferredHospital', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                Primary Doctor Name
              </label>
              <input
                type="text"
                value={formData.primaryDoctor}
                onChange={(e) => handleChange('primaryDoctor', e.target.value)}
                className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Health Profile</span>
            </button>
          </div>
        </div>
      </form>

      {showIdCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-600" />
                <span className="font-black text-base text-slate-900 dark:text-white uppercase tracking-wider">
                  CareX Emergency ID Card
                </span>
              </div>
              <button
                onClick={() => setShowIdCardModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Close
              </button>
            </div>

            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 text-white border-2 border-red-500 shadow-xl space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div>
                  <span className="text-[10px] text-slate-400 block">PATIENT NAME</span>
                  <span className="text-base font-black text-white">{formData.fullName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-red-400 block">BLOOD TYPE</span>
                  <span className="text-xl font-black text-red-500">{formData.bloodGroup}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">AGE / GENDER</span>
                  <span>{formData.age} yrs • {formData.gender}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">EMERGENCY ID</span>
                  <span>{formData.emergencyIdCardNumber}</span>
                </div>
              </div>

              <div className="text-xs pt-1 border-t border-slate-800">
                <span className="text-[10px] text-amber-400 block">ALLERGIES</span>
                <span className="text-slate-200">{formData.allergies}</span>
              </div>

              <div className="text-xs pt-1 border-t border-slate-800">
                <span className="text-[10px] text-blue-400 block">PREFERRED HOSPITAL</span>
                <span className="text-slate-200">{formData.preferredHospital}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Medical Card</span>
              </button>

              <button
                onClick={() => setShowIdCardModal(false)}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

