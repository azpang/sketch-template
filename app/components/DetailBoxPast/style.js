import styled from "styled-components";

export default styled.div`
    display:flex;
    flex-flow: column;
    background-color:${props=>props.colors.darkblue};

    .area-image{
        flex:1;
        width:100%;
        height:40%;
        display:flex;
        margin-bottom:30px;
        img{
            height:100%;
            flex:1;
            filter:sepia(20%);
        }
        
    }

    .rando-bar{
        background-color:${props=>props.colors.yellow};
    }

    .text-area{
        flex:1;
        display:flex;
        flex-flow: column;
        overflow-y:auto;

        .title{
            flex:1;
        }

        .influences{
            flex:1;
            padding-bottom:10px;
        }

        .fav-title, .detr-title{
            font-weight:bold;
        }

        .text-linker{
            font-size:1rem;
            font-weight:lighter;
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
