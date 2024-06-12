import './App.css';
import { Routes , Route } from 'react-router-dom'
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import PrivateRoute from './components/PrivateRoute';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Fobidden';
import UnhandledError from './components/UnhandledError';

function App() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />}/>
      <Route path='/' element={<Header />}>
        <Route path='/notfound' element={<NotFound />}/>
        <Route path='/forbidden' element={<Forbidden />}/>
        <Route path='/error' element={<UnhandledError />}/>
        <Route index element={<Courses />}/>
        <Route path='signin' element={<UserSignIn />}/>
        <Route path='signup' element={<UserSignUp />}/>
        <Route path='signout' element={<UserSignOut />}/>
        <Route path='courses'>
          <Route element={<PrivateRoute />}>
            <Route path='create' element={<CreateCourse />}/>
            <Route path=':id/update' element={<UpdateCourse />} />
          </Route>
          <Route path=':id' element={<CourseDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
