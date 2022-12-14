import React, { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';
import { Container } from './styles';

const Register = () => {

    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        const user = {
            displayName,
            email,
            password
        }

        if(password !== confirmPassword) {
            setError('As senhas precisam ser iguais!');
            return;
        }

        const res = await createUser(user)

    }

    useEffect(() => {
        
        if(authError){
            setError(authError)
        }
    }, [authError])

  return (
    <Container>
        <h1>Cadastre-se para postar</h1>
        <p>Crie seu usuario e compartilhe suas historias</p>
        <form>
            <label>
                <span>Nome:</span>
                <input 
                    type="text" 
                    name="displayName" 
                    required 
                    placeholder='Nome do usuario'
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}/>
            </label>
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
            <label>
                <span>Confirmacao de Senha:</span>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        required 
                        placeholder='Confirme a sua senha'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
            {!loading && <button onClick={() => handleSubmit()}>Cadastrar</button>}
            {loading && <button onClick={() => handleSubmit()} disabled>Aguarde...</button>}
            {error && <p className='error'>{error}</p>}
        </form>
    </Container>
  )
}

export default Register