import styled, {keyframes} from 'styled-components';

interface IContainerProps {
    color: string;
}

interface ITagProps {
    color: string;
}

const animate = keyframes`
    0% {
        transform: translateX(-100px);
        opacity: 0;
    }
    50%{
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.li`
    background-color: ${props => props.theme.colors.tertiary};

    list-style: none;
    border-radius: 5px;
    margin: 10px 0;
    padding: 14px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
    transition: opacity .15s;
    transition: transform .22s;
    position: relative;

    animation: ${animate} .4s ease;

    &:hover{
        opacity: .8;
        transform: translateX(10px);
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        padding-left: 10px;
    }
    > div span {
        font-size: 19px;
        font-weight: 600;
    }

`;

export const Tag = styled.div<ITagProps>`
    position: absolute;
    width: 10px;
    height: 60%;
    left: 0;


    background-color: ${props => props.color};
`;