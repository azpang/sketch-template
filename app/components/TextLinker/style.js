import styled from "styled-components";

export default styled.div`
    .keyword{
        color:${props=>props.color};
    }

    #underlined{
        text-decoration:underline;
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
