import { useContext, useEffect } from 'react';
import './App.css';
import LotteryContext from './Context/LotteryContext';
import Navbar from './Component/Navbar';
import Manager from './Pages/Manager';
import User from './Pages/User';
import { Routes, Route } from 'react-router-dom';


function App() {
  const context = useContext(LotteryContext);
  const { web3Api, loadProvider, init } = context;

  useEffect(() => {
    loadProvider();
  }, [])

  useEffect(() => {
    web3Api.web3 && init();
  }, [web3Api.web3]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' />
        <Route path='/manager' element={<Manager />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
