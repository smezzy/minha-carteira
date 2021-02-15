import styled from 'styled-components';

interface IContainerProps {
    color: string;
}

export const Container = styled.div<IContainerProps>`
    background-color: ${props => props.color};
    color: ${props => props.theme.colors.white};

    width: 32%;
    height: 180px;

    border-radius: 15px;

    margin: 10px 0;
    padding: 10px 20px;

    overflow: hidden;

    position: relative;

    > img {
        opacity: .3;
        height: 110%;
        position: absolute;
        top: -10px;
        right: -30px;
    }

    > span {
        font-size: 18px;
        font-weight: 500;
    }

    > small {
        font-size: 12px;
        position: absolute;
        bottom: 10px;
    }
    
    @media(max-width: 770px){
        > span {
            font-size: 14px;
        }
        > h1 {
            word-wrap: break-word;
            font-size: 22px;
            strong {
                display: inline-block;
                width: 100%;
                font-size: 16px;
            }
        }
    }
    @media(max-width: 420px){
        width: 100%;
        > h1 {
            display: flex;
            
            strong {
                position: initial;        
                width: auto;
                font-size: 22px;
            }
            strong:after {
                display: inline-block;
                content: '';
                width: 1px;                
            }
        }
    }
`;