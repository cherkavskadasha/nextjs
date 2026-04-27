'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
    }
  }, [session]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/user/update', {
      method: 'PATCH',
      body: JSON.stringify({ name, age }),
    });
    if (res.ok) {
      setIsEditing(false);
      update();
      alert('Профіль оновлено!');
    }
  };

  if (!session) return <p className="text-center p-20 text-[#832C96] font-bold">Будь ласка, увійдіть...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-6 mb-10">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-3xl text-[#832C96] font-bold">
            {session.user?.name?.[0] || 'U'}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{session.user?.name}</h1>
            <p className="text-slate-500">{session.user?.email}</p>
          </div>
        </div>

        {!isEditing ? (
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs font-bold text-[#832C96] uppercase mb-1">Особиста інформація</p>
              <p className="text-slate-700 font-medium">Вік: {age || 'Не вказано'}</p>
            </div>
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
            >
              Редагувати профіль
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            <input 
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Ваше ім'я"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#832C96]"
            />
            <input 
              value={age} onChange={(e) => setAge(e.target.value)}
              placeholder="Ваш вік" type="number"
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#832C96]"
            />
            <div className="flex gap-4">
              <button type="submit" className="flex-1 py-4 bg-[#832C96] text-white font-bold rounded-2xl shadow-lg shadow-purple-200">Зберегти</button>
              <button onClick={() => setIsEditing(false)} className="px-8 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl">Скасувати</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}