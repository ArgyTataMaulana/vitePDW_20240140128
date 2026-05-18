import { useState, useEffect } from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  const [users, setUsers] = useState([]) // Data akun untuk login
  const [orders, setOrders] = useState([]) // Data pesanan laundry
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_USERS = "https://6a02ec4b0d92f63dd25480ec.mockapi.io/login" 
  const API_ORDERS = "https://6a02ec4b0d92f63dd25480ec.mockapi.io/customer" 

  useEffect(() => {
    // Ambil data users dan orders secara bersamaan
    Promise.all([
      fetch(API_USERS).then(res => res.json()),
      fetch(API_ORDERS).then(res => res.json())
    ])
    .then(([userData, orderData]) => {
      setUsers(userData)
      setOrders(orderData)
      setLoading(false)
    })
    .catch(err => {
      console.error("Gagal ambil data:", err)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>

  return (
    <>
      {currentUser ? (
        <Dashboard 
          user={currentUser} 
          data={orders}  // Yang dikirim sekarang data pesanan laundry!
          onLogout={() => setCurrentUser(null)} 
        />
      ) : (
        <Login 
          usersData={users} 
          onLogin={(user) => setCurrentUser(user)} 
        />
      )}
    </>
  )
}

export default App