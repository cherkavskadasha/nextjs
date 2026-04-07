import Link from "next/link";
import EnvLogger from "../components/EnvLogger";
import ApiTester from "../components/ApiTester"; // <-- Додали імпорт

export default function HomePage() {
  console.log("СЕРВЕРНА КОНСОЛЬ:");
  console.log("Секретна змінна:", process.env.SECRET_SERVER_KEY);
  console.log("Публічна змінна:", process.env.NEXT_PUBLIC_APP_NAME);

  return (
    <main className="min-h-screen bg-[#E9D0E9] p-6 flex flex-col items-center justify-center">
      <EnvLogger />
      
      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-purple-200/50 max-w-lg w-full text-center border border-white">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Лабораторна робота №2
        </h1>
        <p className="text-slate-500 mb-8">
          Тестування змінних середовища та API
        </p>
        
        <div className="bg-slate-50 p-5 rounded-2xl text-left mb-8 border border-slate-100">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#832C96]">Публічна змінна:</span> 
            <p className="font-mono text-sm mt-1 text-slate-700">
              {process.env.NEXT_PUBLIC_APP_NAME || "Не знайдено"}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Секретна змінна:</span> 
            <p className="font-mono text-sm mt-1 text-slate-700">
              {process.env.SECRET_SERVER_KEY ? "Доступна на сервері (прихована від клієнта)" : "Не знайдено"}
            </p>
          </div>
        </div>
        
        <Link 
          href="/articles" 
          className="inline-block px-10 py-4 bg-[#832C96] w-full text-white font-bold rounded-2xl hover:bg-[#A73BBF] transition-all duration-300 shadow-lg shadow-purple-300/50"
        >
          Перейти до статей
        </Link>

        <ApiTester />
        
      </div>
    </main>
  );
}