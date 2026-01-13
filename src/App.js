import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';
import Home from './components/pages/Home';
import Header from './components/blocks/Header';
import Footer from './components/blocks/Footer';
import { ViewHistory } from './components/pages/ViewHistory';
import { AdminDashboard } from './components/pages/admin/AdminDashboard';
import { Department } from './components/pages/admin/Department';
import { Dashboard } from './components/pages/HOD/Dashboard';
import StaffRegister from './components/pages/HOD/StaffRegister';

function App() {


  const handleRender = () => {
    if (isAuth && currentUser?.role === "admin") {
      return <AdminDashboard />
    }
    else {
      return <Login />
    }
  }






  const { isAuth, currentUser } = useContext(DContext)

  if (isAuth === null || !currentUser) {
    return <LoadingPage />
  }

  return (
    <div className="container-fluid p-0">
      <Header />
      <Routes>
        <Route path="/" element={handleRender()} />
        <Route path='/admin/department' element={<Department />} />
        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        <Route path='/register' element={isAuth ? <Home /> : <Register />} />
        <Route path='/view-history' element={<ViewHistory />} />
        <Route path='/test' element={<LoadingPage />} />
        <Route path='/hod' element={<Dashboard />} />
        <Route path='/hod/staff' element={ <StaffRegister />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
