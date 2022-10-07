import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  box-shadow: rgba(0,0,0 .15) 0px -2px 10px 0px;
  justify-content: space-between;
  align-items: center;
  padding: .5em 2em;


    .brand{
    font-size: 1.2em;

        span{
            font-weight: 900;
            text-transform: uppercase;
        }
    }
`;


export const Links = styled.div`

    display: flex;
    list-style: none;

    li{
        margin-right: 1em;
    }

    li a {
        padding: .4em 6em;
    }
`
