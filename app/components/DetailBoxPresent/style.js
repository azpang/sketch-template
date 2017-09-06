import styled from "styled-components";

export default styled.div`
    display:flex;
    flex-flow: column;
    background-color:${props=>props.colors.darkblue};
    padding:30px;

    .bg-image{
        position:absolute;
        height:100%;
        opacity:.2;
        top:0;
        left:0;
        z-index:-1;
    }

    .title-section{
        height:20%
    }

    .area-description{
        flex:3;
        max-height:60%;
        margin-top:20px;
        margin-bottom:40px;
        overflow-y:scroll;
        font-weight:lighter;
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
