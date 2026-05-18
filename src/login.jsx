import React, { useState } from 'react'

const Login = ({ onLogin, usersData }) => {
  const [loginInput, setLoginInput] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
 e.preventDefault();

  // 1. KITA CEK DULU ISI DATANYA DI CONSOLE
  console.log("Data dari API:", usersData);
  console.log("Input dari Form:", loginInput);

  // 2. KITA COCOKKAN (Gunakan huruf kecil semua sesuai skema MockAPI-mu)
  const user = usersData.find(u => {
    // Kita pakai .toLowerCase() agar huruf besar/kecil tidak jadi masalah
    const apiUser = (u.username || u.Username).toLowerCase();
    const inputUser = loginInput.username.toLowerCase();
    
    const apiPass = (u.password || u.Password);
    const inputPass = loginInput.password;

    return apiUser === inputUser && apiPass === inputPass;
  });

  if (user) {
    console.log("Login Berhasil:", user);
    onLogin(user);
  } else {
    console.error("Login Gagal: Data tidak cocok");
    alert("Username atau Password salah! Cek Console (F12) untuk melihat data asli.");
  }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-cyan-600/20 rounded-full blur-[120px]"></div>

      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 z-10">
        <div className="text-center mb-10">
          <div className="bg-linear-to-tr from-blue-500 to-cyan-400 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 shadow-lg shadow-blue-500/50">
            <span className="text-5xl -rotate-12">🧺</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">TATA <span className="text-blue-400">LAUNDRY</span></h1>
          <p className="text-slate-400 text-sm font-light tracking-widest uppercase">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full bg-white/5 px-6 py-4 rounded-2xl border border-white/10 text-white focus:border-blue-500 outline-none transition-all"
            onChange={(e) => setLoginInput({...loginInput, username: e.target.value})}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-white/5 px-6 py-4 rounded-2xl border border-white/10 text-white focus:border-blue-500 outline-none transition-all"
            onChange={(e) => setLoginInput({...loginInput, password: e.target.value})}
            required 
          />
          {error && <p className="text-red-400 text-xs text-center italic">{error}</p>}
          <button className="w-full bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95">
            MASUK SEKARANG
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login