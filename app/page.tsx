import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#E9D0E9] p-6 flex flex-col items-center justify-center">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-xl shadow-purple-200/50 max-w-lg w-full text-center border border-white">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Лабораторна робота №1
        </h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Сучасний мінімалістичний інтерфейс. <br/> 
          Побудовано на Next.js та Tailwind CSS.
        </p>
        
        <Link 
          href="/articles" 
          className="inline-block px-10 py-4 bg-[#832C96] text-white font-bold rounded-2xl hover:bg-[#A73BBF] transition-all duration-300 shadow-lg shadow-purple-300/50"
        >
          Перейти до статей
        </Link>
      </div>
    </main>
  );
}