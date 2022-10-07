import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from './styles'

const About = () => {
  return (
    <Container>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>Este projeto consiste em um blog feito com React no front-end e Firebase no back-end.</p>
      <Link to='/posts/create'>Criar post</Link>
    </Container>
  )
}

export default About