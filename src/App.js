import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import Footer from './components/Footer/Footer.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import About from './pages/About/About.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';

import { onAuthStateChanged} from 'firebase/auth'
import { useEffect, useState } from 'react';
import { useAuthentication } from './hooks/useAuthentication.jsx';
import CreatePost from './pages/CreatePost/CreatePost.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/EditPost';

function App() {

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])
 
  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className='App'>
    <AuthProvider value={{ user }}>
      <Router>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/search' element={<Search />} />
            <Route path='/posts/:id' element={<Post />}/>
            <Route path='/login' element={!user ? <Login /> : <Navigate to='/home' />}/>
            <Route path='/register' element={!user ? <Register /> : <Navigate to='/home' />}/>
            <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to='/login' />}/>
            <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='/login' />}/>
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='login' />}/>
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
