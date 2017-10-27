import styled from "styled-components";

export default styled.div`
    #hidden{
        display:none;
    }

    .overlay{
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        background:rgba(0,0,0,.8);

        .content{
            display:flex;
            flex-flow: column;
            position:absolute;
            top:5%;
            bottom:10%;
            left:25%;
            right:25%;

            .button-container{
                flex:.5;

                button{
                    float:right;
                    color:white;
                    background-color: rgba(0,0,0,0);
                    border: 0px;
                    font-size:1.0rem;
                }
                button:focus{
                    outline:0;
                }
            }

            

            h3{
                flex:1;
                font-family: 'Patrick Hand SC', cursive;
                font-size: 2.3rem;
            }

            

            .info-container{
                overflow-y:auto;

                .title{
                    font-size:1.3rem;
                }
            }
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
