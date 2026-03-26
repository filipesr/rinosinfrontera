interface CheckboxGroupProps {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export function CheckboxGroup({ options, selected, onChange }: CheckboxGroupProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(o => o !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {options.map(option => (
        <label
          key={option}
          className="flex items-start gap-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => toggle(option)}
            className="mt-0.5 h-5 w-5 rounded border-teal-200 accent-teal-700 cursor-pointer shrink-0"
          />
          <span className="text-slate-800 group-hover:text-teal-700 transition-colors">
            {option}
          </span>
        </label>
      ))}
    </div>
  )
}
