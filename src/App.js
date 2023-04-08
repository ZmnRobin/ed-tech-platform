import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/students/Login';
import '../src/style/output.css'
import '../src/style/modal.css'
import Registration from './pages/students/Registration';
import Leaderboard from './pages/students/Leaderboard';
import CoursePlayer from './pages/students/CoursePlayer';
import Quiz from './components/students/Quiz';
import PrivateRoute from './components/PrivateRoute';
import useAuthCheck from './hooks/useAuthCheck';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import PrivateAdmin from './components/admin/PrivateAdmin';
import Assignments from './pages/admin/Assignments';
import Videos from './pages/admin/Videos';
import Quizzes from './pages/admin/Quizzes';
import AssignmentMark from './pages/admin/AssignmentMark';

function App() {
  const authChecked=useAuthCheck();

  return !authChecked ? (
    <h2>Checking authentication...</h2>
  ):(
    <Router> 
       <Routes>
         <Route path='/' element={<Login/>}/>
         <Route path='/registration' element={<Registration/>}/>
         <Route path='/leaderboard' element={<PrivateRoute><Leaderboard/></PrivateRoute>}/>
         <Route path='/courseplayer' element={<PrivateRoute><CoursePlayer/></PrivateRoute>}/>
         <Route path='/courseplayer/:id' element={<PrivateRoute><CoursePlayer/></PrivateRoute>}/>
         <Route path='/quiz' element={<PrivateRoute><Quiz/></PrivateRoute>}/>

         {/* Admin Routes */}
         <Route path='/admin' element={<AdminLogin/>}/>
         <Route path='/admin/dashboard' element={<PrivateAdmin><AdminDashboard/></PrivateAdmin>}/>
         <Route path='/admin/assignments' element={<PrivateAdmin><Assignments/></PrivateAdmin>}/>
         <Route path='/admin/videos' element={<PrivateAdmin><Videos/></PrivateAdmin>}/>
         <Route path='/admin/quizzes' element={<PrivateAdmin><Quizzes/></PrivateAdmin>}/>
         <Route path='/admin/assignmentmark' element={<PrivateAdmin><AssignmentMark/></PrivateAdmin>}/>
       </Routes>
    </Router>
  );
}

export default App;
