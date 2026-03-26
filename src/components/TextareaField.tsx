interface TextareaFieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function TextareaField({ label, placeholder, value, onChange }: TextareaFieldProps) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-slate-800/70 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-xl border border-teal-200 px-4 py-3 text-slate-800 placeholder:text-slate-800/40 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-y"
      />
    </div>
  )
}
