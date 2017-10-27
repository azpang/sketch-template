import styled from "styled-components";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let geoDetailBoxHeight = windowHeight*.8;
let geoDetailBoxWidth = windowWidth*.35;



export default styled.div`

    .geo-detail-box{
        position:absolute;
        width:35vw;
        height:80vh;
        
        top:10%;
        left:60%;
        perspective:3000px;
    }

    .flip-container.showBack .flipper {
        transform: rotateY(180deg);
        width:35vw;
    }

    /* flip speed goes here */
    .flipper {
        background-color:${props=>props.colors.darkblue} !important;
        position:relative;
        height:100%;
        width:100%;
        transition: 0.6s;
        transform-style: preserve-3d;

        border: 1px solid lightgray;
        border-radius:5px;        
        background-color:white;
    }
    .present,.past{
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        box-shadow:5px 5px 5px #888;
        border-radius:5px; 
    }

    .present{
        /* for firefox 31 */
        transform: rotateY(0deg);
    }
    .past{
        transform: rotateY(-180deg);
    }

    .flipper, .present, .past{
        height: 100%;
        width: 100%;
    }

    .present, .past{
        overflow-y: hidden;
    }

    .clear{
        clear:both;
    }

    .title{
        font-family: 'Patrick Hand SC', cursive;
        font-size: 2.2rem;
    }
    .rando-bar{
        width: 80px;
        height: 5px;
        border-radius:100px;
        margin: 5px 30px;
    }

    .text-area{
        padding: 10px 30px;
        flex:1;
    }

    .button-container{
        padding: 0px 30px;
        margin-bottom:20px;
        flex:.15;
        display:flex;
        justify-content: flex-end;
        max-height:30px;

        img{
            flex:.15;
            height:30px;
            border:0;
        }
    }
`;

// .tester{
//     background-color: green;
//     height: ${props => {
//               return props.height;
//             }}px;
//     width: ${props => {
//              return props.width;
//            }}px;
// }
