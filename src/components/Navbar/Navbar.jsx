import React from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useAuthentication } from '../../hooks/useAuthentication';
import { Container, Links } from './styles'

const Navbar = () => {

  const { user } = useAuthValue();

  const { logout } = useAuthentication();

  return (
    <Container>
        <Navbar className='brand' to='/home'>
          Mini <span>Blog</span>
        </Navbar>
        <Links>
          <li>
            <Navbar to='/home' className={({isActive}) => (isActive ? <Container className='active'/> : '')}>Home</Navbar>
          </li>
            {!user && (
              <>
                <li>
                  <Navbar to='/login' className={({isActive}) => (isActive ? <Container className='active'/> : '')}>Login</Navbar>
                </li>
                <li>
                  <Navbar to='/register' className={({isActive}) => (isActive ? <Container className='active'/> : '')}>Register</Navbar>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <Navbar to='/posts/create' className={({isActive}) => (isActive ? <Container className='active'/> : '')}>New Post</Navbar>
                </li>
                <li>
                  <Navbar to='/dashboard' className={({isActive}) => (isActive ? <Container className='active'/> : '')}>Dashboard</Navbar>
                </li>
              </>
            )}
          <li>
            <Navbar to='/about' className={({isActive}) => (isActive ? <Container className='active'/> : '')}>About</Navbar>
          </li>
          {user && (
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          )}
        </Links>
        
    </Container>
  )
}

export default Navbar