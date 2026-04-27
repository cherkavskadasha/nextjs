'use client';

import { useState } from 'react';

export default function SecurityPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('Пароль успішно змінено!');
      setOldPassword('');
      setNewPassword('');
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-8">Зміна пароля</h1>
        {message && <div className="mb-6 p-4 bg-purple-50 text-[#832C96] rounded-xl text-sm font-bold text-center">{message}</div>}
        <form onSubmit={handleChange} className="space-y-6">
          <input 
            type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Старий пароль" required
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#832C96]"
          />
          <input 
            type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Новий пароль" required
            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#832C96]"
          />
          <button type="submit" className="w-full py-4 bg-[#832C96] text-white font-bold rounded-2xl shadow-lg shadow-purple-200">
            Оновити пароль
          </button>
        </form>
      </div>
    </div>
  );
}