'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Неправильний email або пароль');
      } else {
        router.push('/articles'); // Перенаправляємо на статті після успішного входу
      }
    } catch (err) {
      setError('Сталася помилка. Спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#E9D0E9]">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-purple-200/50 w-full max-w-md border border-white">
        <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">З поверненням!</h1>
        <p className="text-slate-500 text-center mb-8">Увійдіть до свого акаунту</p>

        {error && <div className="bg-rose-50 text-rose-500 p-4 rounded-2xl text-sm mb-6 font-medium text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#832C96] mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#832C96] focus:ring-4 focus:ring-purple-50 transition-all text-slate-700 font-medium"
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#832C96] mb-2 block">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-[#832C96] focus:ring-4 focus:ring-purple-50 transition-all text-slate-700 font-medium"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 px-10 py-4.5 bg-[#832C96] hover:bg-[#A73BBF] text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-purple-300/50 disabled:opacity-70"
          >
            {isLoading ? 'Вхід...' : 'Увійти'}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-sm font-medium">
          Немає акаунта? <Link href="/register" className="text-[#832C96] hover:text-[#A73BBF] font-bold">Створити</Link>
        </p>
      </div>
    </div>
  );
}