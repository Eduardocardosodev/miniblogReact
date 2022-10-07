import React from 'react'
import { Link } from 'react-router-dom';
import PostDetail from '../../components/PostDetail/PostDetail';
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import { Container } from './styles';



const Search = () => {

    const query = useQuery();
    const search = query.get("q");

    const {documents: posts} = useFetchDocuments("posts", search);

  return (
    <Container>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
                <div className='noposts'>
                    <p>Nao foram encontrados posts a partir da sua busca...</p>
                    <Link to='/home'>Voltar</Link>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetail key={post.id} post={post}/>
            ))}
        </div>
    </Container>
  )
}

export default Search