import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';
import Home from './components/pages/Home';
import Header from './components/blocks/Header';
import { ViewHistory } from './components/pages/ViewHistory';
import { AdminDashboard } from './components/pages/admin/AdminDashboard';
import { Department } from './components/pages/admin/Department';
import { Dashboard } from './components/pages/HOD/Dashboard';

import { Year } from './components/pages/admin/Year';
import { ClassList } from './components/pages/admin/ClassList';
import Timetable from './components/pages/HOD/TimeTable';


import { HodList } from './components/pages/admin/HodList';
import { StaffRegister } from './components/pages/StaffRegister';
import { TutorDashboard } from './components/pages/ClassInchange.js/TutorDashboard';
import CreateStudent from './components/pages/ClassInchange.js/CreateStudent';
import ClassStaffRegister from './components/pages/HOD/ClassStaffRegister';
import { StaffManage } from './components/pages/HOD/StaffManage';
import { ManageTimeTable } from './components/pages/HOD/ManageTimeTable';


function App() {
  const { isAuth, currentUser } = useContext(DContext)

  const handleRender = () => {
    if (isAuth && currentUser?.role === "admin") {
      return <AdminDashboard />
    }
    else if (isAuth && currentUser?.role === "hod"){
      return <Dashboard />
    }
    else if (isAuth && currentUser?.role === "tutor") {
      return <TutorDashboard />
    }
    else{
      return <Login />
    }
  }

  if (isAuth === null || !currentUser) {
    return <LoadingPage />
  }



  return (
    <div className="container-fluid p-0">
      <Header />
      <Routes>
        <Route path="/" element={handleRender()} />
        <Route path='/admin/department' element={<Department />} />
        <Route path='/admin/year' element={<Year />} />
        <Route path='/admin/class' element={<ClassList />} />
        <Route path='/inchange/createstudent' element={isAuth ? <CreateStudent /> : <Login />} />

        <Route path="/login" element={isAuth ? <Home /> : <Login />} />
        {/* <Route path='/register' element={isAuth ? <Home /> : <Register />} /> */}
        <Route path='/view-history' element={<ViewHistory />} />
        <Route path='/admin/hod' element={<HodList />} />
        <Route path='/hodManage' element={<StaffRegister />} />
        <Route path='/test' element={<LoadingPage />} />
        <Route path='/hod' element={<Dashboard />} />
        <Route path='/hod/staff' element={isAuth ? <StaffManage /> : <Login />} />
        <Route path='/hod/createstaff' element={isAuth ? <ClassStaffRegister /> : <Login />} />
        <Route path='/hod/timetable' element={isAuth ? <ManageTimeTable /> : <Login />} />
        <Route path='/hod/createTimeTable' element={isAuth ? <Timetable /> : <Login />} />
        

      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
