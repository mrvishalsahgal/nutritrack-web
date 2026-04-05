export default function ChatMessage({ message, time, isAi, children }) {
  if (isAi) {
    return (
      <div className="flex flex-col items-start group">
        <div className="flex gap-4 items-start w-full">
          <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <div className="flex-1 flex flex-col items-start space-y-2">
            <div className="bg-surface-container-lowest border border-outline-variant/15 text-on-surface px-6 py-6 rounded-2xl rounded-tl-none shadow-sm group-hover:shadow-md transition-all">
              <p className="font-body text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
              {children && <div className="mt-6">{children}</div>}
            </div>
          </div>
        </div>
        <span className="text-[10px] text-slate-400 mt-2 ml-12">{time}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end group">
      <div className="bg-surface-container-high text-on-surface px-6 py-4 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm transition-all group-hover:shadow-md">
        <p className="font-body text-sm leading-relaxed">{message}</p>
      </div>
      <span className="text-[10px] text-slate-400 mt-2 mr-1">{time}</span>
    </div>
  );
}
