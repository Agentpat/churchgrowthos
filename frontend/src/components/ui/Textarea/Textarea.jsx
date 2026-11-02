import {
    Wrapper,
    Label,
    StyledTextarea,
    Error,
} from "./Textare.styles";

const Textarea = ({
    label,
    error,
    ...props
}) => {

    return (

        <Wrapper>

            {label && (
                <Label>
                    {label}
                </Label>
            )}

            <StyledTextarea
                {...props}
            />

            {error && (
                <Error>
                    {error}
                </Error>
            )}

        </Wrapper>

    );

};

export default Textarea;