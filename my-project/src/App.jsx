import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import { Users } from './pages/Users';
import { Signin } from './pages/Signin';
import { Signup } from './pages/Signup';
import { SendMoney } from './pages/SendMoney'
import { Appbar } from './pages/Appbar';
import { BottomWarning } from './components/BottomWarning';

function App() {
  return (
    <div>
      <div>
        
      </div>
      <Router>
      <div>
        
          <Routes>
            <Route path='/' element={<Signup></Signup>}></Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/dashboard'  element={<Users></Users>}/>
            <Route path="/send" element={<SendMoney></SendMoney>}></Route>
            <Route path="/appbar" element={<Appbar></Appbar>}></Route>
            

          </Routes>
      
        </div>
        </Router>
      </div>
  
  );
}
function Land({sign,Signup}){
  return <div className='p-5 bg-slate-200 m-auto text-center'>
    
    <Link className='p-2 bg-blue-500 w-10 m-3 rounded-md ' to={Signup}>Signup</Link>
    <Link to={sign} className='bg-blue-500 p-2 rounded-md'>Signin</Link>
  </div>
}

export default App;


