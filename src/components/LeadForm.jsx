import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { CheckCircle } from "lucide-react";

const capitalOptions = [
  "Under $100K",
  "$100K – $300K",
  "$300K – $500K",
  "$500K – $1M",
  "$1M+",
];

export default function LeadForm({ t, lang }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    capitalAvailable: "",
    previousThailandInvestment: null,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = t.lead.required;
    if (!form.phone.trim()) e.phone = t.lead.required;
    else if (form.phone.replace(/\D/g, "").length < 7) e.phone = t.lead.phoneInvalid;
    if (!form.capitalAvailable) e.capitalAvailable = t.lead.required;
    if (form.previousThailandInvestment === null) e.previousThailandInvestment = t.lead.required;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await base44.entities.Lead.create({
      ...form,
      language: lang,
      source: window.location.pathname,
      status: "new",
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const update = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <CheckCircle className="w-12 h-12 text-asila-light" />
        <p className="text-xl font-heading text-white">{t.lead.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto w-full">
      {/* Full Name */}
      <div>
        <label className="block text-sm text-asila-muted mb-1.5 font-body">{t.lead.fullName} *</label>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className="w-full bg-asila-surface border border-asila-blue/30 text-white px-4 py-3 min-h-[52px] font-body text-sm focus:outline-none focus:border-asila-light transition-colors"
        />
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm text-asila-muted mb-1.5 font-body">{t.lead.phone} *</label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full bg-asila-surface border border-asila-blue/30 text-white px-4 py-3 min-h-[52px] font-body text-sm focus:outline-none focus:border-asila-light transition-colors"
          placeholder="+972"
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>

      {/* Capital */}
      <div>
        <label className="block text-sm text-asila-muted mb-1.5 font-body">{t.lead.capital} *</label>
        <select
          value={form.capitalAvailable}
          onChange={(e) => update("capitalAvailable", e.target.value)}
          className="w-full bg-asila-surface border border-asila-blue/30 text-white px-4 py-3 min-h-[52px] font-body text-sm focus:outline-none focus:border-asila-light transition-colors appearance-none"
        >
          <option value="" disabled>{t.lead.capitalPlaceholder}</option>
          {capitalOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.capitalAvailable && <p className="text-red-400 text-xs mt-1">{errors.capitalAvailable}</p>}
      </div>

      {/* Previous Investment */}
      <div>
        <label className="block text-sm text-asila-muted mb-2 font-body">{t.lead.previousInvestment} *</label>
        <div className="flex gap-3">
          {[true, false].map((val) => (
            <button
              key={String(val)}
              type="button"
              onClick={() => update("previousThailandInvestment", val)}
              className={`flex-1 py-3 min-h-[48px] text-sm font-body border transition-all ${
                form.previousThailandInvestment === val
                  ? "bg-asila-light text-white border-asila-light"
                  : "bg-asila-surface text-asila-muted border-asila-blue/30 hover:border-asila-light/50"
              }`}
            >
              {val ? t.lead.yes : t.lead.no}
            </button>
          ))}
        </div>
        {errors.previousThailandInvestment && <p className="text-red-400 text-xs mt-1">{errors.previousThailandInvestment}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-asila-light hover:bg-asila-mid text-white font-body text-sm tracking-wide py-4 min-h-[56px] transition-colors disabled:opacity-50"
      >
        {submitting ? t.lead.sending : t.lead.submit}
      </button>
    </form>
  );
}