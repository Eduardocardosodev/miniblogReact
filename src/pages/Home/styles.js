import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

    .noposts {
        text-align: center;
    }

    .noposts p {
        margin-bottom: 1.5em;
    }

    .noposts a {
        padding: 10px 25px;
    }

`;

export const Form = styled.form`

    max-width: 100%;
    width: 60%;
    display: flex;
    justify-content: center;
    margin-bottom: 2em;

    input {
        margin-right: 10px;
        width: 50%;
    }
`

