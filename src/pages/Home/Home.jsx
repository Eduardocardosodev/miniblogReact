import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PostDetail from '../../components/PostDetail/PostDetail';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Container, Form } from './styles';

const Home = () => {

  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments('posts');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <Container>
      <h1>Veja nosso posts mais recentes</h1>
      <Form>
        <input 
        type="text" 
        placeholder='Ou busque por tags...' 
        value={query}
        onChange={(e) => setQuery(e.target.value)}/>
        <button onClick={() => handleSubmit()}>Pesquisar</button>
      </Form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className='noposts'>
            <p>Nao foram encontrados posts</p>
            <Link to='/posts/create'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Home