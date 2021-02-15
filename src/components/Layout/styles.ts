import styled from 'styled-components';

export const Grid = styled.div`
    /**
    * Grid Layout: 
    * AS = Aside
    * MH = MainHeader
    * CT = Content
    **/

    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 70px auto;

    grid-template-areas:
    'AS MH'
    'AS CT';

    height: 100vh;
    
    @media(max-width: 600px){
        grid-template-columns: 100%;
        grid-template-rows: 70px auto;
        grid-template-areas:
        'MH'
        'CT';
    }

`;