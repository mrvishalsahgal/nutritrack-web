import { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/ChatMessage';
import { chatApi } from '../api/chat';
import { mealsApi } from '../api/meals';

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      isAi: true,
      text: 'Hi there! What did you safely eat or drink today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleAddToToday = async (msg, e) => {
    const btn = e.currentTarget;
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<span class="material-symbols-outlined text-sm animate-spin">refresh</span> Adding...';
    btn.disabled = true;

    try {
      await mealsApi.logMeal({
        mealType: 'Snacks',
        name: msg.bentoData.name,
        image: msg.bentoData.image,
        totalNutrients: msg.bentoData,
        foods: []
      });
      btn.innerHTML = '<span class="material-symbols-outlined text-sm">check</span> Added to Log'; 
      btn.className = 'bg-primary text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2';
    } catch (err) {
      console.error(err);
      btn.innerHTML = originalHtml;
      btn.disabled = false;
      alert("Failed to log meal. Please try again.");
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
    } catch (err) {
      console.error(err);
      btn.innerHTML = originalHtml;
      btn.disabled = false;
      alert("Failed to save meal. Please try again.");
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
    <div className="flex-1 flex flex-col relative h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] -mt-10 overflow-hidden bg-surface">
      {/* Header specifically for chat */}
      <header className="h-16 flex items-center justify-between px-2 bg-surface/70 backdrop-blur-xl z-20 sticky top-0 md:mt-2">
        <div className="flex items-center gap-4">
          <h2 className="font-headline text-lg font-bold text-on-surface">AI Nutritionist</h2>
          <div className="flex items-center gap-1.5 bg-green-500/20 px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">history</span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 mt-4">
                    <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center">
                      {msg.isEditing ? (
                        <input type="number" value={msg.bentoData.calories} onChange={e => handleUpdateBento(msg.id, 'calories', e.target.value)} className="w-16 bg-transparent text-center font-headline text-xl font-bold text-primary outline-none border-b border-primary/30" />
                      ) : (
                        <span className="font-headline text-xl font-bold text-primary">{msg.bentoData.calories}</span>
                      )}
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Calories</span>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center">
                      <div className="flex items-end gap-0.5">
                        {msg.isEditing ? (
                          <input type="number" value={msg.bentoData.protein} onChange={e => handleUpdateBento(msg.id, 'protein', e.target.value)} className="w-12 bg-transparent text-center font-headline text-xl font-bold text-on-surface outline-none border-b border-outline-variant/50" />
                        ) : (
                          <span className="font-headline text-xl font-bold text-on-surface">{msg.bentoData.protein}</span>
                        )}
                        <span className="font-headline text-lg font-bold text-on-surface">g</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Protein</span>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center">
                      <div className="flex items-end gap-0.5">
                        {msg.isEditing ? (
                          <input type="number" value={msg.bentoData.fat} onChange={e => handleUpdateBento(msg.id, 'fat', e.target.value)} className="w-12 bg-transparent text-center font-headline text-xl font-bold text-on-surface outline-none border-b border-outline-variant/50" />
                        ) : (
                          <span className="font-headline text-xl font-bold text-on-surface">{msg.bentoData.fat}</span>
                        )}
                        <span className="font-headline text-lg font-bold text-on-surface">g</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Fat</span>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center">
                      <div className="flex items-end gap-0.5">
                        {msg.isEditing ? (
                          <input type="number" value={msg.bentoData.carbs} onChange={e => handleUpdateBento(msg.id, 'carbs', e.target.value)} className="w-12 bg-transparent text-center font-headline text-xl font-bold text-on-surface outline-none border-b border-outline-variant/50" />
                        ) : (
                          <span className="font-headline text-xl font-bold text-on-surface">{msg.bentoData.carbs}</span>
                        )}
                        <span className="font-headline text-lg font-bold text-on-surface">g</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Carbs</span>
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
                      className="bg-primary/5 hover:bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">add</span> Add to Today
                    </button>
                    <button 
                      onClick={(e) => handleSaveMeal(msg, e)}
                      className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">bookmark</span> Save Meal
                    </button>
                    <button 
                      onClick={() => handleAdjustPortion(msg)}
                      className={`${msg.isEditing ? 'bg-primary text-white' : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'} px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2`}
                    >
                      <span className="material-symbols-outlined text-sm">{msg.isEditing ? 'check' : 'edit'}</span> {msg.isEditing ? 'Done Editing' : 'Adjust Portions'}
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
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-surface via-surface to-transparent z-30 pt-10">
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

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex-shrink-0 mr-1">Shortcuts</span>
              <button onClick={() => handleSend("How much protein was in that?")} className="flex-shrink-0 px-4 py-1.5 rounded-full border border-outline-variant/30 text-xs text-slate-600 hover:bg-white hover:border-primary transition-all">How much protein was in that?</button>
              <button onClick={() => handleSend("Log 500ml of water")} className="flex-shrink-0 px-4 py-1.5 rounded-full border border-outline-variant/30 text-xs text-slate-600 hover:bg-white hover:border-primary transition-all">Log 500ml of water</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
