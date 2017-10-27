import styled from "styled-components";

export default styled.div`
    display:flex;
    flex-flow: column;
    background-color:${props=>props.colors.darkblue};
    padding:30px;
    overflow-x:hidden;


    .bg-image{
        position:absolute;
        height:100%;
        opacity:.2;
        top:0;
        left:0;
        z-index:-1;
    }
    .rando-bar{
        background-color:${props=>props.colors.salmon};
        margin-left:0px !important;
    }

    .title-section{
        height:20%
    }

    .area-description{
        flex:3;
        height:350px;
        margin-bottom:30px;
        overflow:auto;
        font-weight:lighter;
        z-index:10;
    }

    .person{
        flex:1; 
        display:flex;
        flex-direction:row;

        .headshot-container{
            flex:1;
            width:25%;
            img{
                width:100%;
                border-radius:50%;
            }
        }

        .person-description{
            padding-top:30px;
            padding-left:30px;
            flex:3;
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
