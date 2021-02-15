import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div``;

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .tag-filter {
        opacity: .3;
        font-size: 18px;
        font-weight: 500;
        background: none;
        color: ${props => props.theme.colors.white};

        margin: 0 10px;

        transition: opacity .35s;

        &:hover {
            
        }
    }

    .recurrent::after {
        content: '';
        display: block;
        width: 55px;
        margin: 5px auto;
        border-bottom: 10px solid ${props => props.theme.colors.warning};
    }
    .eventual::after {
        content: '';
        display: block;
        width: 55px;
        margin: 5px auto;
        border-bottom: 10px solid ${props => props.theme.colors.success};
    }

    .tag-active {
        opacity: 1;
    }
`;