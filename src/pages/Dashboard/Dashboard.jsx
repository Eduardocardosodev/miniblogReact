import React from 'react'
import { Link } from 'react-router-dom'

import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { Container } from './styles';

import { useDeleteDocument } from '../../hooks/useDeleteDocument';

const Dashboard = () => {

  const { user } = useAuthValue();
  const uid = user.uid;

  //posts do usuario
  const { documents: posts, loading} = useFetchDocuments("posts", null, uid);

  const {deleteDocument} = useDeleteDocument("posts");


  if(loading){
    <p>Carregando...</p>
  }

  return (
    <Container>
        <h2>Dashboard</h2>
        <p>Gerencie seus posts</p>
        {posts && posts.length === 0 ? (
          <div className='noposts'>
            <p>Nao foram encontrados posts</p>
            <Link to='/posts/create'>Criar primeiro post</Link>
          </div>
        ) : (
            <div className='post_header'>
              <span>Titulo:</span>
              <span>Acoes</span>
            </div>
          )}
            {posts && posts.map((post) => 
            <div key={post.id} className='post_row'>
              <p>{post.title}</p>
              <div>
                <Link to={`/posts/${post.id}`}>Ver</Link>
                <Link to={`/post/edit${post.id}`}>
                  Editar
                </Link>
                <button onClick={() => deleteDocument(post.id)}>Excluir</button>
              </div>
            </div>)}
    </Container>
  )
}

export default Dashboard