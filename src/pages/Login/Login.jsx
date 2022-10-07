import React, { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';
import { Container } from './styes';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
      e.preventDefault();

      setError('');
      const user = {
          email,
          password
      }

      const res = await login(user)

  }

  useEffect(() => {
      
      if(authError){
          setError(authError)
      }
  }, [authError])

  return (
    <Container>
        <h1>Entrar</h1>
        <p>Faca o login para poder utilizar o sistema</p>
        <form>
            <label>
                <span>E-mail:</span>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder='E-mail do usuario'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label>
                <span>Senha:</span>
                    <input 
                        type="password" 
                        name="password" 
                        required 
                        placeholder='Senha do usuario'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
            </label>
            {!loading && <button onClick={() => handleSubmit()}>Entrar</button>}
            {loading && <button onClick={() => handleSubmit()} disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </Container>
  )
}

export default Login