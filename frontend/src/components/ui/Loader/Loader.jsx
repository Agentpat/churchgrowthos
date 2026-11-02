import {
    LoaderWrapper,
    Spinner,
    LoaderText,
} from "./Loader.styles";



const Loader = ({
    size = "medium",
    text,
}) => {


    return (

        <LoaderWrapper>


            <Spinner size={size} />


            {
                text && (

                    <LoaderText>

                        {text}

                    </LoaderText>

                )
            }


        </LoaderWrapper>

    );

};


export default Loader;