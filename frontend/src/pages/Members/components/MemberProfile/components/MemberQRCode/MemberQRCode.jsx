import { useRef, useState } from "react";

import {
    FaDownload,
    FaQrcode,
    FaIdCard,
    FaCalendarAlt,
    FaUserCheck,
} from "react-icons/fa";

import { QRCodeCanvas } from "qrcode.react";

import html2canvas from "html2canvas";

import { useAuth } from "../../../../../../context/AuthContext";

import {
    QRCard,
    QRHeader,
    QRTitleGroup,
    QRIcon,
    QRTitle,
    QRDescription,
    CardPreview,
    CardTop,
    CardBrand,
    CardBrandMark,
    CardBrandText,
    CardType,
    CardContent,
    MemberDetails,
    MemberLabel,
    MemberName,
    MemberMeta,
    MetaItem,
    MetaIcon,
    MetaLabel,
    MetaValue,
    QRSection,
    QRFrame,
    QRInstruction,
    CardFooter,
    MemberIdentifier,
    DownloadButton,
} from "./MemberQRCode.styles";

const MemberQRCode = ({ member }) => {
    const cardRef = useRef(null);

    const [isDownloading, setIsDownloading] =
        useState(false);

    const { church } = useAuth();

    if (!member?._id) {
        return null;
    }

    const memberId = String(member._id);

    const memberName =
        `${member.firstName || ""} ${member.lastName || ""}`
            .trim() || "Member";

    const membershipStatus =
        member.membershipStatus || "MEMBER";

    const formattedStatus =
        membershipStatus
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase(),
            );

    const joinedDate = member.joinedDate
        ? new Date(
            member.joinedDate,
        ).toLocaleDateString(
            "en-NG",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            },
        )
        : "-";

    const shortMemberId =
        memberId.slice(-8).toUpperCase();

    // =====================================
    // Church Branding
    // =====================================

    const churchName =
        church?.name || "Church";

    const churchLogo =
        church?.logo || "";

    const churchInitials =
        churchName
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((word) =>
                word.charAt(0),
            )
            .join("")
            .toUpperCase() || "CH";

    // =====================================
    // Download Member Card
    // =====================================

    const handleDownload = async () => {
        const card = cardRef.current;

        if (!card || isDownloading) {
            return;
        }

        try {
            setIsDownloading(true);

            /*
             * Allow the browser to finish rendering
             * before html2canvas captures the card.
             */
            await new Promise((resolve) =>
                requestAnimationFrame(resolve),
            );

            const canvas =
                await html2canvas(card, {
                    scale: 3,

                    useCORS: true,

                    allowTaint: false,

                    backgroundColor: null,

                    logging: false,

                    imageTimeout: 15000,
                });

            const image =
                canvas.toDataURL(
                    "image/png",
                    1.0,
                );

            const link =
                document.createElement("a");

            link.download =
                `${memberName
                    .replace(
                        /\s+/g,
                        "-",
                    )
                    .toLowerCase()}-membership-card.png`;

            link.href = image;

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
        } catch (error) {
            console.error(
                "Failed to download member card:",
                error,
            );
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <QRCard>
            <QRHeader>
                <QRTitleGroup>
                    <QRIcon>
                        <FaQrcode />
                    </QRIcon>

                    <div>
                        <QRTitle>
                            Member Card
                        </QRTitle>

                        <QRDescription>
                            Personalized membership
                            identity and attendance QR.
                        </QRDescription>
                    </div>
                </QRTitleGroup>
            </QRHeader>

            <CardPreview ref={cardRef}>
                <CardTop>
                    <CardBrand>
                        <CardBrandMark>
                            {churchLogo ? (
                                <img
                                    src={churchLogo}
                                    alt={`${churchName} logo`}
                                />
                            ) : (
                                churchInitials
                            )}
                        </CardBrandMark>

                        <CardBrandText>
                            {churchName}
                        </CardBrandText>
                    </CardBrand>

                    <CardType>
                        Membership Card
                    </CardType>
                </CardTop>

                <CardContent>
                    <MemberDetails>
                        <MemberLabel>
                            Member
                        </MemberLabel>

                        <MemberName>
                            {memberName}
                        </MemberName>

                        <MemberMeta>
                            <MetaItem>
                                <MetaIcon>
                                    <FaUserCheck />
                                </MetaIcon>

                                <div>
                                    <MetaLabel>
                                        Status
                                    </MetaLabel>

                                    <MetaValue>
                                        {formattedStatus}
                                    </MetaValue>
                                </div>
                            </MetaItem>

                            <MetaItem>
                                <MetaIcon>
                                    <FaCalendarAlt />
                                </MetaIcon>

                                <div>
                                    <MetaLabel>
                                        Member Since
                                    </MetaLabel>

                                    <MetaValue>
                                        {joinedDate}
                                    </MetaValue>
                                </div>
                            </MetaItem>
                        </MemberMeta>

                        <MetaItem>
                            <MetaIcon>
                                <FaIdCard />
                            </MetaIcon>

                            <div>
                                <MetaLabel>
                                    Member ID
                                </MetaLabel>

                                <MetaValue>
                                    {shortMemberId}
                                </MetaValue>
                            </div>
                        </MetaItem>
                    </MemberDetails>

                    <QRSection>
                        <QRFrame>
                            <QRCodeCanvas
                                id={`member-qr-${memberId}`}
                                value={memberId}
                                size={150}
                                bgColor="#ffffff"
                                fgColor="#111827"
                                level="M"
                                includeMargin
                            />
                        </QRFrame>

                        <QRInstruction>
                            Scan for attendance
                        </QRInstruction>
                    </QRSection>
                </CardContent>

                <CardFooter>
                    <MemberIdentifier>
                        Member ID ·{" "}
                        {shortMemberId}
                    </MemberIdentifier>

                    <span>
                        {churchName}
                    </span>
                </CardFooter>
            </CardPreview>

            <DownloadButton
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
            >
                <FaDownload />

                {isDownloading
                    ? "Preparing Card..."
                    : "Download Member Card"}
            </DownloadButton>
        </QRCard>
    );
};

export default MemberQRCode;