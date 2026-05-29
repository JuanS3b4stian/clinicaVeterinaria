const stylesByType = {
  error: 'border-rose-500/30 bg-rose-500/10 text-rose-100',
  success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
  info: 'border-sky-500/30 bg-sky-500/10 text-sky-100'
};

const Alert = ({ type = 'info', message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${stylesByType[type] || stylesByType.info}`}>
      {message}
    </div>
  );
};

export default Alert;