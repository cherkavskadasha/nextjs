'use client';
import { useState } from 'react';

export default function ApiTester() {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
      console.log('Дані з API отримано:', data);
    } catch (error) {
      console.error('Помилка:', error);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center w-full border-t border-slate-100 pt-6">
      <button 
        onClick={fetchArticles}
        className="inline-block px-10 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all duration-300 shadow-lg shadow-emerald-200/50 mb-4"
      >
        Тест API: Отримати статті
      </button>

      {articles.length > 0 && (
        <div className="w-full text-left bg-slate-800 p-4 rounded-xl mt-2 overflow-hidden shadow-inner">
          <h3 className="font-bold text-white mb-2 text-xs uppercase tracking-wide opacity-80">Результат (JSON):</h3>
          <pre className="text-emerald-400 text-xs overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(articles, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}