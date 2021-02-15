import { logDOM } from '@testing-library/react';
import styled from 'styled-components';


export const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    align-items: center;

    background-color: ${props => props.theme.colors.secondary};
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;

    margin-bottom: 30px;
    

    > h2 {
        color: ${props => props.theme.colors.white};
        margin-left: 7px;
    }

    > img {
        width: 40px;
        height: 40px;
    }

`;
 
export const Form = styled.form`
    width: 300px;
    height: 300px;

    padding: 30px;

    background-color: ${props => props.theme.colors.tertiary};

    border-radius: 25px;

`;

export const FormTitle = styled.h1`
    color: ${props => props.theme.colors.white};

    margin-bottom: 30px;
    &::after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 10px solid ${props => props.theme.colors.info};


    }
`;
