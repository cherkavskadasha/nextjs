export default function SecurityPage() {
  return (
    <div className="max-w-3xl mt-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Безпека та паролі</h1>
      
      <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Поточний пароль</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#832C96] transition-all text-slate-700" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-500 mb-2">Новий пароль</label>
            <input 
              type="password" 
              placeholder="Введіть новий пароль" 
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#832C96] transition-all text-slate-700" 
            />
          </div>

          <div className="pt-4">
            <button className="px-8 py-3 bg-rose-500 text-white font-semibold rounded-xl hover:bg-rose-600 transition-all">
              Оновити пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}