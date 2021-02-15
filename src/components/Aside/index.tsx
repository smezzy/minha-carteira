import React, { useState } from 'react';
import logoImg from '../../assets/logo.svg';
import Toggle from '../Toggle';

import {
    MdDashboard,
    MdArrowUpward,
    MdArrowDownward,
    MdExitToApp,
    MdClose,
    MdMenu
} from 'react-icons/md';

import { 
    Container,
    Header,
    LogImg,
    Title,
    MenuContainer,
    MenuItemLink,
    MenuItemDiv,
    ToggleMenu,
    ThemeToggleFooter
} from './styles';

import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';


export let currentPage: string = 'dashboard';

export const toggleActive = (name: string) => {
    currentPage = name;
    console.log(currentPage);
}

const Aside: React.FC = () => {
    
    const { signOut } = useAuth();
    const { toggleTheme, theme } = useTheme();
    
    const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
    const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false); 


    const handleToggleMenu = () => {
        setToggleMenuIsOpened(!toggleMenuIsOpened);
    }
    const handleChangeTheme = () => {
        setDarkTheme(!darkTheme);
        toggleTheme();
    }

    
    return (
        <Container menuIsOpen={toggleMenuIsOpened}>
            <Header>
                <ToggleMenu onClick={handleToggleMenu}>
                    {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}

                </ToggleMenu>

                <LogImg src={logoImg} alt="Logo da minha marca" /> 
                <Title> Minha Carteira </Title>
            </Header>
            <MenuContainer>
            
                <MenuItemDiv>
                    <MenuItemLink href="/">
                        <MdDashboard />
                        Dashboard
                    </MenuItemLink>
                </MenuItemDiv>

                <MenuItemDiv>
                    <MenuItemLink href="/list/entry-balance">
                        <MdArrowUpward />
                        Entradas
                    </MenuItemLink>
                </MenuItemDiv>

                <MenuItemDiv>
                    <MenuItemLink href="/list/exit-balance">
                        <MdArrowDownward />
                        Saídas
                    </MenuItemLink>

                </MenuItemDiv>

                <MenuItemDiv onClick={signOut}>
                    <MenuItemLink href="#">
                        <MdExitToApp />
                        Sair
                    </MenuItemLink>
                </MenuItemDiv>
                
            </MenuContainer>

            <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
                <Toggle 
                    labelLeft="Light"
                    labelRight="Dark"
                    checked={darkTheme}
                    onChange={handleChangeTheme}
                />
            </ThemeToggleFooter>
        </Container>
    );
}

export default Aside;