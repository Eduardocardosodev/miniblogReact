import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from './styles'

const PostDetail = ({ post }) => {
  return (
    <Container>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className='createdBy'>{post.createdBy}</p>
        <div className='tags'>{post.tagsArray.map((tag) => {
            <p key={tag}>
                <span>#</span>
            {tag}
            </p>
        })}</div>
        <Link to={`/posts/${post.id}`}>Ler</Link>
    </Container>
  )
}

export default PostDetail