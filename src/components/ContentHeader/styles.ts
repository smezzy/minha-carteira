import styled from 'styled-components';

interface ITitleContainerProps {
    lineColor: string;
}

export const Container = styled.div`
    width: 100%;
    
    display: flex;
    justify-content: space-between;

    margin-bottom: 25px;

    @media(max-width: 320px){
        flex-direction: column;
        align-items: center;
            
    }
`;

export const Controllers = styled.div`
    display: flex;
    align-items: center;

    @media(max-width: 320px){
        width: 100%;
        margin-top: 20px;
        justify-content: space-evenly;

    }
`;

export const TitleContainer = styled.div<ITitleContainerProps>`
    > h1 {
        &::after {
            content: '';
            width: 55px;
            display: block;
            border-bottom: 10px solid ${props => props.lineColor};
            @media(max-width: 320px){
                margin-left: 30%;
            }

        }
        @media(max-width: 600px){
            font-size: 26px;
        }
    }

`;