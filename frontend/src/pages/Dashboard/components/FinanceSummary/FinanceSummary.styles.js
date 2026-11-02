import styled from "styled-components";



export const FinanceContainer = styled.section`

    width:100%;


    margin-top:${({theme})=>theme.spacing.xl};



    padding:${({theme})=>theme.spacing.lg};



    border-radius:${({theme})=>theme.radius.xl};



    background:

    linear-gradient(
        145deg,
        rgba(255,255,255,.85),
        rgba(255,255,255,.55)
    );



    backdrop-filter:blur(18px);


    -webkit-backdrop-filter:blur(18px);



    border:

    1px solid rgba(255,255,255,.4);



    box-shadow:

    0 12px 35px rgba(0,0,0,.06);


`;






export const FinanceHeader = styled.div`

    margin-bottom:${({theme})=>theme.spacing.md};

`;






export const FinanceTitle = styled.h2`

    font-size:
    ${({theme})=>theme.typography.sizes.lg};



    font-weight:
    ${({theme})=>theme.typography.weights.bold};



    color:
    ${({theme})=>theme.colors.text.primary};


`;








export const FinanceGrid = styled.div`

    display:grid;


    grid-template-columns:1fr;


    gap:${({theme})=>theme.spacing.md};



    @media(min-width:768px){

        grid-template-columns:
        repeat(3,1fr);

    }


`;









export const FinanceItem = styled.div`

    display:flex;


    align-items:center;


    gap:${({theme})=>theme.spacing.md};



    padding:${({theme})=>theme.spacing.md};



    border-radius:${({theme})=>theme.radius.lg};



    background:
    rgba(255,255,255,.55);



    border:
    1px solid rgba(255,255,255,.35);



    transition:.25s ease;



    &:hover{

        transform:translateY(-3px);

        box-shadow:
        0 12px 25px rgba(0,0,0,.08);

    }


`;








export const BalanceCard = styled(FinanceItem)`

    background:

    linear-gradient(
        135deg,
        rgba(37,99,235,.18),
        rgba(37,99,235,.06)
    );


    border:

    1px solid rgba(37,99,235,.18);


`;








export const FinanceIcon = styled.div`

    width:40px;


    height:40px;


    flex-shrink:0;



    display:flex;


    align-items:center;


    justify-content:center;



    border-radius:14px;



    background:

    rgba(37,99,235,.12);



    color:

    ${({theme})=>theme.colors.primary.main};



`;








export const FinanceLabel = styled.p`

    font-size:
    ${({theme})=>theme.typography.sizes.xs};



    text-transform:uppercase;


    letter-spacing:.05em;



    color:

    ${({theme})=>theme.colors.text.secondary};



`;








export const FinanceValue = styled.h3`

    margin-top:4px;



    font-size:

    ${({theme})=>theme.typography.sizes.xl};



    font-weight:

    ${({theme})=>theme.typography.weights.bold};



    color:

    ${({theme})=>theme.colors.text.primary};



`;