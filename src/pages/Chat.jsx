import { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import { chatApi } from '../api/chat';
import { mealsApi } from '../api/meals';
import { toast } from '../utils/toast';

export default function Chat() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('nutritrack_chat_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        isAi: true,
        text: 'Hi there! What did you eat or drink today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [shortcuts, setShortcuts] = useState(() => {
    const saved = localStorage.getItem('nutritrack_custom_shortcuts');
    return saved ? JSON.parse(saved) : ["How much protein was in that?", "Log 500ml of water"];
  });
  const [isAddingShortcut, setIsAddingShortcut] = useState(false);
  const [newShortcutText, setNewShortcutText] = useState('');
  const messagesEndRef = useRef(null);
  const menuRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Persist messages to LocalStorage
  useEffect(() => {
    localStorage.setItem('nutritrack_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Persist shortcuts to LocalStorage
  useEffect(() => {
    localStorage.setItem('nutritrack_custom_shortcuts', JSON.stringify(shortcuts));
  }, [shortcuts]);

  const handleAddShortcut = () => {
    if (newShortcutText.trim() && !shortcuts.includes(newShortcutText.trim())) {
      setShortcuts(prev => [...prev, newShortcutText.trim()]);
      setNewShortcutText('');
      setIsAddingShortcut(false);
    }
  };

  const handleRemoveShortcut = (e, text) => {
    e.stopPropagation(); // Don't trigger the shortcut
    setShortcuts(prev => prev.filter(s => s !== text));
  };

  // Handle clicks outside the 3-dot menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your chat history?")) {
      const initialMsg = {
        id: Date.now(),
        isAi: true,
        text: 'Chat cleared. How can I help you now?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([initialMsg]);
      setShowMenu(false);
    }
  };

  const handleExportChat = () => {
    const chatText = messages.map(m => 
      `${m.isAi ? 'AI' : 'User'} (${m.time}): ${m.text}${m.hasBento ? '\n[Nutrition Data Attached]' : ''}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nutritrack_chat_export_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setShowMenu(false);
  };

  const handleAddToToday = async (msg, e) => {
    const btn = e.currentTarget;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-sm animate-spin">refresh</span> Adding...';
    btn.disabled = true;

    try {
      const bento = msg.bentoData;
      // Simple heuristic for meal type based on local time
      const hours = new Date().getHours();
      let guessedType = 'Snacks';
      if (hours >= 5 && hours < 11) guessedType = 'Breakfast';
      else if (hours >= 11 && hours < 16) guessedType = 'Lunch';
      else if (hours >= 16 && hours < 22) guessedType = 'Dinner';

      await mealsApi.logMeal({
        mealType: guessedType,
        name: bento.name,
        description: bento.description,
        image: bento.image,
        totalNutrients: bento,
        foods: []
      });
      btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> Added to Log'; 
      btn.className = 'bg-primary text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2';
      toast(`"${bento.name}" added to daily log!`);
    } catch (err) {
      console.error(err);
      btn.innerHTML = originalHtml;
      btn.disabled = false;
      toast("Failed to log meal. Please try again.", "error");
    }
  };

  const handleSaveMeal = async (msg, e) => {
    const btn = e.currentTarget;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-sm animate-spin">refresh</span> Saving...';
    btn.disabled = true;

    try {
      await mealsApi.saveCustomFood({
        name: msg.bentoData.name,
        calories: msg.bentoData.calories,
        protein: msg.bentoData.protein,
        carbs: msg.bentoData.carbs,
        fat: msg.bentoData.fat,
        servingSize: msg.bentoData.description || '1 serving',
        image: msg.bentoData.image
      });
      btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> Saved!'; 
      btn.className = 'bg-surface-container-highest text-green-700 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2';
      toast(`"${msg.bentoData.name}" saved to library!`);
    } catch (err) {
      console.error(err);
      btn.innerHTML = originalHtml;
      btn.disabled = false;
      toast("Failed to save meal. Please try again.", "error");
    }
  };

  const handleToggleEdit = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isEditing: !m.isEditing } : m));
  };

  const handleUpdateBento = (id, field, value) => {
    setMessages(prev => prev.map(m => {
      if (m.id === id) {
        return {
          ...m,
          bentoData: {
            ...m.bentoData,
            [field]: value === '' ? 0 : Number(value)
          }
        };
      }
      return m;
    }));
  };

  const handleAdjustPortion = (msg) => {
    handleToggleEdit(msg.id);
  };

  const handleSend = async (shortcutText) => {
    const textToSend = typeof shortcutText === 'string' ? shortcutText : input;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      isAi: false,
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await chatApi.sendMessage(textToSend);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        isAi: true,
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasBento: response.hasBento,
        bentoData: response.bentoData
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        isAi: true,
        text: "My neural pathways are experiencing a high volume of traffic right now! (Gemini API 503 Error). Please try again in a few moments.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hasBento: false
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col relative h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] -mt-10 overflow-hidden bg-surface">
      {/* Header specifically for chat */}
      <header className="h-16 flex items-center justify-between px-2 bg-surface/70 backdrop-blur-xl z-20 sticky top-0 md:mt-2">
        <div className="flex items-center gap-4">
          <h2 className="font-headline text-lg font-bold text-on-surface">AI Nutritionist</h2>
          <div className="flex items-center gap-1.5 bg-green-500/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">history</span>
          </button>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${showMenu ? 'bg-primary text-white shadow-lg' : 'text-slate-500 hover:bg-surface-container'}`}
          >
            <span className="material-symbols-outlined">more_vert</span>
          </button>

          {/* 3-Dot Dropdown Menu */}
          {showMenu && (
            <div className="absolute top-12 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-outline-variant/10 overflow-hidden z-[100] animate-in slide-in-from-top-2 fade-in duration-200">
              <div className="p-2">
                <button 
                   onClick={handleExportChat}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-on-surface transition-colors text-sm font-medium"
                >
                  <span className="material-symbols-outlined text-slate-400">download</span>
                  Export Chat
                </button>
                <div className="h-px bg-slate-100 my-1"></div>
                <button 
                  onClick={handleClearChat}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-sm font-medium"
                >
                  <span className="material-symbols-outlined text-red-400">delete</span>
                  Clear History
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Chat Canvas */}
      <div className="flex-1 overflow-y-auto px-2 md:px-8 pb-32 no-scrollbar">
        <div className="max-w-3xl mx-auto space-y-8 mt-4">
          <div className="flex justify-center">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.2em] bg-surface-container px-3 py-1 rounded-full">Today</span>
          </div>

          {messages.map((msg) => (
            <ChatMessage key={msg.id} isAi={msg.isAi} message={msg.text} time={msg.time}>
              {msg.hasBento && msg.bentoData && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6 mt-4">
                    <div className="bg-surface-container-low p-3 md:p-4 rounded-xl flex flex-col items-center">
                      {msg.isEditing ? (
                        <input type="number" value={msg.bentoData.calories} onChange={e => handleUpdateBento(msg.id, 'calories', e.target.value)} className="w-16 bg-transparent text-center font-headline text-lg md:text-xl font-bold text-primary outline-none border-b border-primary/30" />
                      ) : (
                        <span className="font-headline text-lg md:text-xl font-bold text-primary">{msg.bentoData.calories}</span>
                      )}
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Calories</span>
                    </div>
                    <div className="bg-surface-container-low p-3 md:p-4 rounded-xl flex flex-col items-center">
                      <div className="flex items-end gap-0.5">
                        {msg.isEditing ? (
                          <input type="number" value={msg.bentoData.protein} onChange={e => handleUpdateBento(msg.id, 'protein', e.target.value)} className="w-10 md:w-12 bg-transparent text-center font-headline text-lg md:text-xl font-bold text-on-surface outline-none border-b border-outline-variant/50" />
                        ) : (
                          <span className="font-headline text-lg md:text-xl font-bold text-on-surface">{msg.bentoData.protein}</span>
                        )}
                        <span className="font-headline text-base md:text-lg font-bold text-on-surface">g</span>
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Protein</span>
                    </div>
                    <div className="bg-surface-container-low p-3 md:p-4 rounded-xl flex flex-col items-center">
                      <div className="flex items-end gap-0.5">
                        {msg.isEditing ? (
                          <input type="number" value={msg.bentoData.fat} onChange={e => handleUpdateBento(msg.id, 'fat', e.target.value)} className="w-10 md:w-12 bg-transparent text-center font-headline text-lg md:text-xl font-bold text-on-surface outline-none border-b border-outline-variant/50" />
                        ) : (
                          <span className="font-headline text-lg md:text-xl font-bold text-on-surface">{msg.bentoData.fat}</span>
                        )}
                        <span className="font-headline text-base md:text-lg font-bold text-on-surface">g</span>
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fat</span>
                    </div>
                    <div className="bg-surface-container-low p-3 md:p-4 rounded-xl flex flex-col items-center">
                      <div className="flex items-end gap-0.5">
                        {msg.isEditing ? (
                          <input type="number" value={msg.bentoData.carbs} onChange={e => handleUpdateBento(msg.id, 'carbs', e.target.value)} className="w-10 md:w-12 bg-transparent text-center font-headline text-lg md:text-xl font-bold text-on-surface outline-none border-b border-outline-variant/50" />
                        ) : (
                          <span className="font-headline text-lg md:text-xl font-bold text-on-surface">{msg.bentoData.carbs}</span>
                        )}
                        <span className="font-headline text-base md:text-lg font-bold text-on-surface">g</span>
                      </div>
                      <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-wider">Carbs</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex items-center gap-4 mb-4">
                    <img alt={msg.bentoData.name} className="w-16 h-16 rounded-lg object-cover" src={msg.bentoData.image} />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{msg.bentoData.name}</p>
                      <p className="text-xs text-slate-500">{msg.bentoData.description}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-500/20 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={(e) => handleAddToToday(msg, e)}
                      className="bg-primary/5 hover:bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px] md:text-sm">add</span> 
                      <span className="hidden md:inline">Add to Today</span>
                      <span className="md:hidden">Add to Log</span>
                    </button>
                    <button 
                      onClick={(e) => handleSaveMeal(msg, e)}
                      className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[16px] md:text-sm">bookmark</span> Save
                    </button>
                    <button 
                      onClick={() => handleAdjustPortion(msg)}
                      className={`${msg.isEditing ? 'bg-primary text-white' : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'} px-4 py-2 rounded-full text-[10px] md:text-xs font-bold transition-all flex items-center gap-2`}
                    >
                      <span className="material-symbols-outlined text-[16px] md:text-sm">{msg.isEditing ? 'check' : 'edit'}</span> 
                      {msg.isEditing ? 'Done' : (
                        <>
                          <span className="hidden md:inline">Adjust Portions</span>
                          <span className="md:hidden">Adjust</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </ChatMessage>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 mt-4 mb-2 pl-12 scale-90 origin-left">
              <span className="material-symbols-outlined text-sm animate-pulse">nutrition</span>
              <span className="text-xs font-semibold animate-pulse">AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Sticky Chat Input Section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 bg-gradient-to-t from-surface via-surface to-transparent z-30 pt-10 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">nutrition</span>
              </div>
              <input 
                className="block w-full pl-12 pr-24 py-4 bg-surface-container-lowest border-0 rounded-2xl shadow-xl shadow-slate-200/50 focus:ring-2 focus:ring-primary/20 placeholder:text-slate-400 text-on-surface transition-all outline-none" 
                placeholder="Tell me what you ate..." 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl hover:bg-surface-container transition-colors text-slate-400 flex items-center justify-center">
                  <span className="material-symbols-outlined">mic</span>
                </button>
                <button onClick={handleSend} className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-1 min-h-[40px]">
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0 mr-1">Shortcuts</span>
              
              {shortcuts.map((text, index) => (
                <div key={index} className="relative group/s flex-shrink-0">
                  <button 
                    onClick={() => handleSend(text)} 
                    className="px-3 md:px-4 py-1.5 rounded-full border border-outline-variant/30 text-[10px] md:text-xs text-slate-600 hover:bg-white hover:border-primary transition-all flex items-center gap-2"
                  >
                    {text}
                    {index >= 2 && ( // Only show delete for custom shortcuts (not first 2 defaults)
                      <span 
                        onClick={(e) => handleRemoveShortcut(e, text)}
                        className="material-symbols-outlined text-[14px] text-slate-300 hover:text-red-500 transition-colors"
                      >
                        close
                      </span>
                    )}
                  </button>
                </div>
              ))}

              {isAddingShortcut ? (
                <div className="flex items-center gap-2 flex-shrink-0 animate-in fade-in slide-in-from-left-2 duration-300">
                  <input 
                    autoFocus
                    className="bg-white border border-primary/30 rounded-full px-4 py-1.5 text-xs outline-none focus:ring-2 focus:ring-primary/10 w-40"
                    placeholder="Type shortcut..."
                    value={newShortcutText}
                    onChange={(e) => setNewShortcutText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddShortcut();
                      if (e.key === 'Escape') setIsAddingShortcut(false);
                    }}
                  />
                  <button 
                    onClick={handleAddShortcut}
                    className="text-primary hover:scale-110 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">check</span>
                  </button>
                  <button 
                    onClick={() => setIsAddingShortcut(false)}
                    className="text-slate-400 hover:scale-110 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsAddingShortcut(true)}
                  className="flex-shrink-0 w-8 h-8 rounded-full border border-dashed border-slate-300 text-slate-400 flex items-center justify-center hover:border-primary hover:text-primary transition-all active:scale-90"
                  title="Add custom shortcut"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
