import styled from 'styled-components';

export const Container = styled.div`
    grid-area: MH;

    border-bottom: 2px solid ${props => props.theme.colors.gray};
    background-color: ${props => props.theme.colors.primary};
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;

`;

export const Profile = styled.div`

    color: ${props => props.theme.colors.white};


`;

export const Welcome = styled.h3`
    
`;

export const UserName = styled.span`


`;

