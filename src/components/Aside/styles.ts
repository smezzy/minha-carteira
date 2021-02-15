import styled, { css } from 'styled-components';

interface IContainerProps {
    menuIsOpen: boolean;
}


interface IThemeToggleFooterProps {
    menuIsOpen: boolean;
}

interface IMenuItemProps {
    pageIsOpen: string;
}



export const Container = styled.div<IContainerProps>`
    grid-area: AS;
    
    background-color: ${props => props.theme.colors.primary};
    border-right: 2px solid ${props => props.theme.colors.gray};

    position: relative;
    @media(max-width: 600px){
        padding-left: 0px;
        position: fixed;
        z-index: 2;
        width: 170px;
        height: ${props => props.menuIsOpen ? '100vh' : '70px'};
        overflow: hidden;
        ${props => !props.menuIsOpen && css`
            border: none;
            border-bottom: 2px solid ${props => props.theme.colors.tertiary};
        `};
    }

`;

export const LogImg = styled.img`
    width: 40px;
    height: 40px;

    @media(max-width: 760px) {
        display: none;
    }
`;

export const Header = styled.header`
    height: 70px;   
    padding-left: 20px; 
    display: flex;
    align-items: center;


`;

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 50px;
`;

export const MenuItemLink = styled.a`
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    transition: opacity .15s; 
    display: flex;
    margin: 7px 0;
    padding: 10px 0px;
    padding-left: 20px; 
    align-items: center;

    > svg {
        font-size: 18px;
        margin-right: 6px;
    }

    &:hover {
        opacity: .9;
    }
`;

export const Title = styled.h3`

    color: ${props => props.theme.colors.white};
    margin-left: 10px;
    @media(max-width: 600px){
        display: none;
    }
`;


export const MenuItemDiv = styled.div`

    cursor: pointer;       
    position: relative;
    

    &::before {
            content: '';
            position: absolute;
            width: 5px;
            height: 5px;
            top: 50%;
            left: 10px;
            border-radius: 50%;
            transform: translateY(-50%);
            background-color: ${props => props.theme.colors.warning};
    }

    &:hover {
        background-color: ${props => props.theme.colors.warning};
    }
`;


export const ToggleMenu = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 5px;
    font-size: 22px;
    
    background-color: ${props => props.theme.colors.info};
    color: ${props => props.theme.colors.white};
    transition: opacity .3s;
    &:hover{
        opacity: 0.7;
    }
    display: none;
    @media(max-width: 600px){
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps>`
    display: none;
    position: absolute;
    bottom: 30px;
    
    @media(max-width: 470px){
        padding-left: 20px;
        display: ${props => props.menuIsOpen ? 'flex' : 'none'};
    }
`;
