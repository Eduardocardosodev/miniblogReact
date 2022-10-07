import React, { useEffect, useState } from 'react'
import { Container } from './styles';
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const { id } = useParams();
  const { document: post} = useFetchDocument("posts", id)

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(''); 

  useEffect(() => {

    if(post){
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }

  }, [post])

  const { user } = useAuthValue();

  const { updateDocument, response} = useUpdateDocument("posts");

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.id,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    //redirect to home page
    navigate('/dashboard')
  }

  return (
    <Container>
      {post && (
        <>
          <h2>Editando Post: {post.title}</h2>
          <p>Altere os dados do poste como desejar.</p>
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
            <p className='preview_title'>Preview da imagem atual:</p>
            <img className='image_preview' src={post.image} alt={post.title} />
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
            {!response.loading && <button onClick={() => handleSubmit()}>Editar</button>}
            {response.loading && <button onClick={() => handleSubmit()} disabled>Aguarde...</button>}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
          </form>
        </>
      )}
    </Container>
  )
}

export default EditPost