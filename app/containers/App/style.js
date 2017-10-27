import styled from "styled-components";

export default styled.div`
    font-family: 'Avenir';
    src: url('/fonts/Avenir.ttc') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-size:16px;
    color:white;

    ${'' /*@font-face{
        font-family: "Patrick Hand SC";
        src: url('/fonts/PatrickHandSC-Regular.ttf') format('truetype');
    }*/}

    *{
        box-sizing:border-box;
    }

    .about{
        position:absolute;
        top:10px;
        right:10px;
        height:50px;
        font-size:1.6rem;
        font-family: "Patrick Hand SC";
        padding:0px 10px;
        border-radius:3px;
        background-color:rgb(197,202,206);
        border:0px;
    }

    button:focus{
        outline:none;
    }
`;
