import React, { useState } from 'react'

const Dashboard = ({ user, data, onLogout }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-900 pb-20">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-blue-200">🧺</div>
            <h1 className="text-xl font-black">
              <span className="text-slate-800">TATA</span>
              <span className="text-blue-600 ml-1">LAUNDRY</span>
            </h1>
        </div>
        <button onClick={onLogout} className="bg-red-50 text-red-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-red-600 hover:text-white transition-all">
          LOGOUT
        </button>
      </nav>

      <main className="p-6 lg:p-10 max-w-7xl mx-auto">
        {/* STATS OVERVIEW (Biar Gak Kosong) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/50">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Total Pesanan</p>
            <h4 className="text-3xl font-black text-slate-800">{data.length}</h4>
          </div>
          <div className="bg-blue-600 p-6 rounded-[2rem] shadow-xl shadow-blue-200 text-white">
            <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest">Dalam Proses</p>
            <h4 className="text-3xl font-black">
              {data.filter(item => item.status === 'Proses').length}
            </h4>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/50">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Selesai</p>
            <h4 className="text-3xl font-black text-green-500">
               {data.filter(item => item.status === 'Selesai').length}
            </h4>
          </div>
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200/50">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Admin Online</p>
            <h4 className="text-sm font-bold text-slate-800 mt-2">{user.username}</h4>
          </div>
        </div>

        <h2 className="text-2xl font-black text-slate-800 mb-6 px-2">Daftar Antrean Cucian</h2>

        {/* GRID CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((order) => (
            <div key={order.id} className="group bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
              
              {/* Card Header (Background berwarna sesuai status) */}
              <div className={`p-6 flex justify-between items-center ${
                order.status === 'Selesai' ? 'bg-green-500' : 
                order.status === 'Proses' ? 'bg-blue-600' : 'bg-amber-500'
              } text-white`}>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold opacity-60 uppercase">No. Transaksi</span>
                  <span className="font-mono text-sm font-black">TRX-{String(order.id).padStart(4, '0')}</span>
                </div>
                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                  {order.status}
                </span>
              </div>
              
              <div className="p-8 grow relative">
                {/* Info Pelanggan */}
                <div className="flex items-center gap-4 mb-8">
                  <img 
                    src={order.avatar} 
                    className="w-16 h-16 rounded-2xl bg-slate-100 object-cover shadow-inner" 
                    alt="avatar" 
                    onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=" + order.customerName}
                  />
                  <div>
                    <h3 className="font-black text-slate-800 text-xl leading-none mb-1">{order.customerName}</h3>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                      <p className="text-[11px] text-blue-600 font-black uppercase tracking-tighter">{order.service}</p>
                    </div>
                  </div>
                </div>

                {/* Detail Berat & Harga (Dibuat lebih padat) */}
                <div className="flex items-center justify-between bg-slate-50 p-5 rounded-[2rem] border border-slate-100">
                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Berat</p>
                    <p className="text-lg font-black text-slate-700">{order.weight} <span className="text-xs">KG</span></p>
                  </div>
                  <div className="w-px h-10 bg-slate-200"></div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Total Biaya</p>
                    <p className="text-lg font-black text-blue-600">
                      Rp {Number(order.price).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-8 pb-8 pt-2">
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="w-full bg-slate-900 group-hover:bg-blue-600 text-white text-[11px] font-black py-4 rounded-2xl transition-all shadow-lg active:scale-95 uppercase tracking-widest"
                >
                  Detail Pesanan
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* POPUP DETAIL (Modal) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="bg-white w-full max-w-md rounded-[3rem] shadow-2xl relative z-10 overflow-hidden">
             {/* Isi detail sama seperti sebelumnya tapi pastikan key-nya benar (customerName, service, dll) */}
             <div className="p-10 text-center">
                <img src={selectedOrder.avatar} className="w-24 h-24 rounded-3xl mx-auto mb-4 border-4 border-blue-50" alt="" />
                <h2 className="text-2xl font-black text-slate-800">{selectedOrder.customerName}</h2>
                <p className="text-blue-600 font-bold mb-6 italic">{selectedOrder.service}</p>
                <div className="space-y-3 text-left bg-slate-50 p-6 rounded-3xl">
                   <div className="flex justify-between"><span className="text-slate-400">Status</span> <span className="font-bold text-green-600">{selectedOrder.status}</span></div>
                   <div className="flex justify-between"><span className="text-slate-400">Berat</span> <span className="font-bold">{selectedOrder.weight} KG</span></div>
                   <div className="flex justify-between"><span className="text-slate-400">Total Harga</span> <span className="font-bold text-blue-600 text-lg">Rp {Number(selectedOrder.price).toLocaleString('id-ID')}</span></div>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="mt-8 w-full bg-slate-100 py-4 rounded-2xl font-bold text-slate-500 hover:bg-slate-200 transition-all">TUTUP</button>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard