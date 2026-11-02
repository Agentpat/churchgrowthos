import styled from "styled-components";



export const StyledCard = styled.div`

    width:100%;


    padding:
        ${({padding, theme}) =>

            padding === "small"

            ? theme.spacing.md

            :

            padding === "large"

            ? theme.spacing.xl

            :

            theme.spacing.lg

        };



    border-radius:
        ${({theme}) =>
            theme.radius.xl};



    background:
        ${({theme}) =>
            theme.glass.background};



    backdrop-filter:
        ${({theme}) =>
            theme.glass.blur};



    -webkit-backdrop-filter:
        ${({theme}) =>
            theme.glass.blur};



    border:
        ${({theme}) =>
            theme.glass.border};



    box-shadow:
        ${({theme}) =>
            theme.shadows.sm};



    transition:
        ${({theme}) =>
            theme.animation.normal};



    ${({hover}) => hover && `

        cursor:pointer;


        &:hover{

            transform:
                translateY(-5px);


            box-shadow:
                0 20px 40px rgba(0,0,0,0.08);

        }

    `}


`;