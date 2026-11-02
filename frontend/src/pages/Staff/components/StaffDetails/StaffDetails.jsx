import {
    Overlay,
    Modal,
    ModalHeader,
    ModalTitleWrapper,
    ModalTitle,
    ModalDescription,
    CloseButton,
    ModalBody,

    ProfileHeader,
    ProfileIdentity,
    ProfileName,
    ProfileRole,
    StatusBadge,

    Section,
    SectionTitle,
    InfoGrid,
    InfoItem,
    InfoLabel,
    InfoValue,

    ServiceAreas,
    ServiceAreaBadge,

    NotesBox,
    NotesText,

    AccessCard,
    AccessStatus,
    AccessStatusDot,
    AccessTitle,
    AccessDescription,

    ModalFooter,
    CloseAction,
} from "./StaffDetails.styles";

// =====================================
// Staff Details
// =====================================

const StaffDetails = ({
    open = false,
    staff = null,
    onClose,
}) => {

    // =====================================
    // Don't Render
    // =====================================

    if (!open || !staff) {
        return null;
    }


    // =====================================
    // Member Information
    // =====================================

    const member =
        staff?.memberId || {};


    const firstName =
        member?.firstName || "";

    const lastName =
        member?.lastName || "";


    const fullName =
        member?.fullName ||
        `${firstName} ${lastName}`.trim() ||
        staff?.fullName ||
        "Unnamed Staff";


    const email =
        member?.email || "—";


    const phone =
        member?.phone || "—";


    const gender =
        member?.gender || "—";


    // =====================================
    // Staff Information
    // =====================================

    const department =
        staff?.department || "—";


    const role =
        staff?.role || "—";


    const status =
        staff?.status === "ACTIVE"
            ? "Active"
            : "Inactive";


    const isActive =
        staff?.status === "ACTIVE" &&
        staff?.isActive !== false;


    const serviceAreas =
        Array.isArray(
            staff?.serviceAreas,
        )
            ? staff.serviceAreas
            : [];


    const notes =
        staff?.notes?.trim() ||
        "";


    // =====================================
    // Platform Access
    // =====================================

    const hasUserAccount =
        Boolean(
            staff?.userId,
        );


    // =====================================
    // Render
    // =====================================

    return (
        <Overlay
            role="presentation"
            onMouseDown={(event) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onClose?.();
                }

            }}
        >

            <Modal
                role="dialog"
                aria-modal="true"
                aria-labelledby="staff-details-title"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >

                {/* =================================
            Header
        ================================= */}

                <ModalHeader>

                    <ModalTitleWrapper>

                        <ModalTitle
                            id="staff-details-title"
                        >
                            Staff Details
                        </ModalTitle>


                        <ModalDescription>
                            View staff member information
                            and ministry details.
                        </ModalDescription>

                    </ModalTitleWrapper>


                    <CloseButton
                        type="button"
                        onClick={onClose}
                        aria-label="Close staff details"
                    >
                        ×
                    </CloseButton>

                </ModalHeader>


                {/* =================================
            Body
        ================================= */}

                <ModalBody>

                    {/* =================================
              Profile Header
          ================================= */}

                    <ProfileHeader>

                        <ProfileIdentity>

                            <ProfileName>
                                {fullName}
                            </ProfileName>


                            <ProfileRole>
                                {role}
                            </ProfileRole>

                        </ProfileIdentity>


                        <StatusBadge
                            $active={isActive}
                        >
                            {status}
                        </StatusBadge>

                    </ProfileHeader>


                    {/* =================================
              Member Information
          ================================= */}

                    <Section>

                        <SectionTitle>
                            Member Information
                        </SectionTitle>


                        <InfoGrid>

                            <InfoItem>

                                <InfoLabel>
                                    Email
                                </InfoLabel>

                                <InfoValue>
                                    {email}
                                </InfoValue>

                            </InfoItem>


                            <InfoItem>

                                <InfoLabel>
                                    Phone
                                </InfoLabel>

                                <InfoValue>
                                    {phone}
                                </InfoValue>

                            </InfoItem>


                            <InfoItem>

                                <InfoLabel>
                                    Gender
                                </InfoLabel>

                                <InfoValue>
                                    {gender}
                                </InfoValue>

                            </InfoItem>

                        </InfoGrid>

                    </Section>


                    {/* =================================
              Staff Information
          ================================= */}

                    <Section>

                        <SectionTitle>
                            Staff Information
                        </SectionTitle>


                        <InfoGrid>

                            <InfoItem>

                                <InfoLabel>
                                    Department
                                </InfoLabel>

                                <InfoValue>
                                    {department}
                                </InfoValue>

                            </InfoItem>


                            <InfoItem>

                                <InfoLabel>
                                    Staff Role
                                </InfoLabel>

                                <InfoValue>
                                    {role}
                                </InfoValue>

                            </InfoItem>


                            <InfoItem>

                                <InfoLabel>
                                    Status
                                </InfoLabel>

                                <InfoValue>
                                    {status}
                                </InfoValue>

                            </InfoItem>

                        </InfoGrid>


                        {/* =================================
                Service Areas
            ================================= */}

                        <InfoItem>

                            <InfoLabel>
                                Service Areas
                            </InfoLabel>


                            {serviceAreas.length > 0 ? (

                                <ServiceAreas>

                                    {serviceAreas.map(
                                        (area) => (

                                            <ServiceAreaBadge
                                                key={area}
                                            >
                                                {area}
                                            </ServiceAreaBadge>

                                        ),
                                    )}

                                </ServiceAreas>

                            ) : (

                                <InfoValue>
                                    No service areas assigned.
                                </InfoValue>

                            )}

                        </InfoItem>

                    </Section>


                    {/* =================================
              Notes
          ================================= */}

                    <Section>

                        <SectionTitle>
                            Notes
                        </SectionTitle>


                        <NotesBox>

                            <NotesText>

                                {notes ||
                                    "No notes have been added for this staff member."}

                            </NotesText>

                        </NotesBox>

                    </Section>


                    {/* =================================
              Platform Access
          ================================= */}

                    <Section>

                        <SectionTitle>
                            Platform Access
                        </SectionTitle>


                        <AccessCard>

                            <AccessStatus>

                                <AccessStatusDot
                                    $connected={
                                        hasUserAccount
                                    }
                                />


                                <AccessTitle>
                                    {hasUserAccount
                                        ? "User account linked"
                                        : "No user account linked"}
                                </AccessTitle>

                            </AccessStatus>


                            <AccessDescription>

                                {hasUserAccount
                                    ? "This staff member has a platform user account and can be assigned a system role and permissions."
                                    : "This staff member does not currently have a platform user account. Platform access can be configured later."}

                            </AccessDescription>

                        </AccessCard>

                    </Section>

                </ModalBody>


                {/* =================================
            Footer
        ================================= */}

                <ModalFooter>

                    <CloseAction
                        type="button"
                        onClick={onClose}
                    >
                        Close
                    </CloseAction>

                </ModalFooter>

            </Modal>

        </Overlay>
    );
};

export default StaffDetails;