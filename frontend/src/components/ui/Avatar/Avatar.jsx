import {
    AvatarContainer,
    AvatarImage,
    AvatarInitials,
    AvatarInfo,
    AvatarName,
    AvatarSubtitle,
} from "./Avatar.styles";


const Avatar = ({
    image,
    name = "",
    subtitle = "",
    size = "md",
}) => {

    // =====================================
    // Generate Initials
    // =====================================

    const initials = name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();


    return (

        <AvatarContainer>

            {image ? (

                <AvatarImage
                    src={image}
                    alt={name || "User"}
                    $size={size}
                />

            ) : (

                <AvatarInitials
                    $size={size}
                >
                    {initials || "?"}
                </AvatarInitials>

            )}


            <AvatarInfo>

                <AvatarName>
                    {name || "Unknown"}
                </AvatarName>


                {subtitle && (

                    <AvatarSubtitle>
                        {subtitle}
                    </AvatarSubtitle>

                )}

            </AvatarInfo>

        </AvatarContainer>
    );
};


export default Avatar;