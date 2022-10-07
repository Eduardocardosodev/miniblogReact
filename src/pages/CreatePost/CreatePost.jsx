import React, { useState } from 'react'
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { Container } from './styles';
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(''); 

  const { user } = useAuthValue();

  const { insertDocument, response} = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // VALIDATE IMAGE URL
    try{
      new URL(image);
    }catch(error){
      setFormError('A imagem precisa ser uma URL.')
    }

    // criar o array de tahs
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if(!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos')
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.id,
      createdBy: user.displayName
    })

    //redirect to home page
    navigate('/home')
  }

  return (
    <Container>
        <h2>Criar post</h2>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
        <form>
          <label>
            <span>Titulo:</span>
            <input 
            type="text" 
            name="title" 
            required 
            placeholder='Pense num bom titulo...' 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}/>
          </label>
          <label>
            <span>Url da imagem:</span>
            <input 
            type="text" 
            name="title" 
            required 
            placeholder='Insira uma imagem.' 
            value={image} 
            onChange={(e) => setImage(e.target.value)}/>
          </label>
          <label>
            <span>Conteudo:</span>
            <textarea 
            name="body" 
            required 
            placeholder='Insira o conteudo do post'
            value={body}
            onChange={(e) => setBody(e.target.value)}></textarea>
          </label>
          <label>
            <span>Tags</span>
            <input 
            type="text" 
            name="tags" 
            required 
            placeholder='Insira as tags separadas por virgula' 
            value={tags} 
            onChange={(e) => setTags(e.target.value)}/>
          </label>
          {!response.loading && <button onClick={() => handleSubmit()}>Cadastrar</button>}
          {response.loading && <button onClick={() => handleSubmit()} disabled>Aguarde...</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}
        </form>
    </Container>
  )
}

export default CreatePost