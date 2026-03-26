interface PreviewModalProps {
  message: string
  onClose: () => void
}

export function PreviewModal({ message, onClose }: PreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-teal-100">
          <h3 className="text-lg font-semibold text-teal-700">Pré-visualização da mensagem</h3>
          <button
            onClick={onClose}
            className="text-slate-800/40 hover:text-slate-800 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm text-slate-800 font-sans leading-relaxed">
            {message}
          </pre>
        </div>
        <div className="p-6 border-t border-teal-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-teal-700 hover:bg-teal-800 text-white rounded-xl px-6 py-2.5 font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}
