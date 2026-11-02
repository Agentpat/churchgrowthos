import {
    FiltersContainer,
    Left,
    Right,
} from "./Filters.styles.js";


const Filters = ({
    children,
    actions,
}) => {

    return (

        <FiltersContainer>

            <Left>
                {children}
            </Left>


            {actions && (

                <Right>
                    {actions}
                </Right>

            )}

        </FiltersContainer>
    );
};


export default Filters;