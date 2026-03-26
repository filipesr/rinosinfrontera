interface SuccessMessageProps {
  onClose: () => void
}

export function SuccessMessage({ onClose }: SuccessMessageProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-teal-700 mb-2">Enviado com sucesso!</h3>
        <p className="text-slate-800/70 mb-6">
          Suas respostas foram enviadas por email. Uma nova aba foi aberta para envio via WhatsApp.
        </p>
        <button
          onClick={onClose}
          className="bg-teal-700 hover:bg-teal-800 text-white rounded-xl px-8 py-3 font-semibold transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  )
}
