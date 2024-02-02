import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Home from './pages/Home';
import { RootState } from './store';
import NavBar from './components/NavBar';
import Write from './pages/Write';
 
import BlogPost from './pages/SinglePost';
function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <>
      <BrowserRouter>
      {isLoggedIn && <NavBar/>}
        <Routes>
          <Route path='/' element={isLoggedIn ? <Home/> : <Navigate to='/login' />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/write' element={isLoggedIn ? <Write /> : <Navigate to='/login' />} />
          <Route path='/post/:postId' element={isLoggedIn ? <BlogPost /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
