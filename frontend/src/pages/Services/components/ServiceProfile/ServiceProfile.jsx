import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaUserTie,
  FaMoneyBillWave,
  FaEdit,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import Badge from "../../../../components/ui/Badge/Badge";
import Button from "../../../../components/ui/Button/Button";

import {
  Overlay,
  Panel,
  Header,
  HeaderContent,
  Title,
  Type,
  CloseButton,
  Body,
  Section,
  SectionTitle,
  InfoGrid,
  InfoItem,
  InfoIcon,
  InfoContent,
  InfoLabel,
  InfoValue,
  Description,
  StatsGrid,
  Stat,
  StatLabel,
  StatValue,
  Notes,
  Footer,
} from "./ServiceProfile.styles";


// =====================================
// Service Type Label
// =====================================

const getServiceTypeLabel = (
  serviceType,
) => {

  const labels = {

    SUNDAY_SERVICE:
      "Sunday Service",

    MIDWEEK_SERVICE:
      "Midweek Service",

    PRAYER_MEETING:
      "Prayer Meeting",

    WORKERS_MEETING:
      "Workers Meeting",

    SPECIAL_PROGRAMME:
      "Special Programme",

    BIBLE_STUDY:
      "Bible Study",

    VIGIL:
      "Vigil",

    OTHER:
      "Other",

  };

  return (
    labels[serviceType] ||
    "Other"
  );

};


// =====================================
// Status Variant
// =====================================

const getStatusVariant = (
  status,
) => {

  switch (status) {

    case "SCHEDULED":
      return "info";

    case "LIVE":
      return "success";

    case "CANCELLED":
      return "danger";

    case "COMPLETED":
      return "default";

    default:
      return "default";

  }

};


// =====================================
// Format Date
// =====================================

const formatDate = (
  date,
) => {

  if (!date) {
    return "-";
  }

  return new Date(
    date,
  ).toLocaleDateString(
    undefined,
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

};


// =====================================
// Service Profile
// =====================================

const ServiceProfile = ({
  service,
  onClose,
  onEdit,
  onDelete,
}) => {

  if (!service) {
    return null;
  }

  return (

    <Overlay
      onClick={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {

          onClose?.();

        }

      }}
    >

      <Panel>

        {/* =================================
                    Header
                ================================== */}

        <Header>

          <HeaderContent>

            <Title>

              {service.title ||
                "Untitled Service"}

            </Title>

            <Type>

              {getServiceTypeLabel(
                service.serviceType,
              )}

            </Type>

          </HeaderContent>

          <CloseButton
            type="button"
            onClick={onClose}
            aria-label="Close service profile"
          >

            <FaTimes />

          </CloseButton>

        </Header>


        <Body>

          {/* =================================
                        Status
                    ================================== */}

          <Section>

            <Badge
              variant={
                getStatusVariant(
                  service.status,
                )
              }
            >

              {service.status ||
                "UNKNOWN"}

            </Badge>

          </Section>


          {/* =================================
                        Service Information
                    ================================== */}

          <Section>

            <SectionTitle>
              Service Information
            </SectionTitle>

            <InfoGrid>

              <InfoItem>

                <InfoIcon>
                  <FaCalendarAlt />
                </InfoIcon>

                <InfoContent>

                  <InfoLabel>
                    Date
                  </InfoLabel>

                  <InfoValue>

                    {formatDate(
                      service.serviceDate,
                    )}

                  </InfoValue>

                </InfoContent>

              </InfoItem>


              <InfoItem>

                <InfoIcon>
                  <FaClock />
                </InfoIcon>

                <InfoContent>

                  <InfoLabel>
                    Time
                  </InfoLabel>

                  <InfoValue>

                    {service.startTime ||
                      "-"}

                    {service.endTime &&
                      ` - ${service.endTime}`}

                  </InfoValue>

                </InfoContent>

              </InfoItem>

            </InfoGrid>

          </Section>


          {/* =================================
                        Description
                    ================================== */}

          {service.description && (

            <Section>

              <SectionTitle>
                Description
              </SectionTitle>

              <Description>

                {service.description}

              </Description>

            </Section>

          )}


          {/* =================================
                        Attendance Statistics
                    ================================== */}

          <Section>

            <SectionTitle>
              Attendance
            </SectionTitle>

            <StatsGrid>

              <Stat>

                <FaUsers />

                <StatValue>

                  {service.totalAttendance ??
                    0}

                </StatValue>

                <StatLabel>
                  Total
                </StatLabel>

              </Stat>


              <Stat>

                <FaUserCheck />

                <StatValue>

                  {service.membersPresent ??
                    0}

                </StatValue>

                <StatLabel>
                  Members
                </StatLabel>

              </Stat>


              <Stat>

                <FaUserPlus />

                <StatValue>

                  {service.firstTimers ??
                    0}

                </StatValue>

                <StatLabel>
                  First Timers
                </StatLabel>

              </Stat>


              <Stat>

                <FaUserTie />

                <StatValue>

                  {service.workersPresent ??
                    0}

                </StatValue>

                <StatLabel>
                  Workers
                </StatLabel>

              </Stat>

            </StatsGrid>

          </Section>


          {/* =================================
                        Offering
                    ================================== */}

          <Section>

            <SectionTitle>
              Offering
            </SectionTitle>

            <InfoItem>

              <InfoIcon>
                <FaMoneyBillWave />
              </InfoIcon>

              <InfoContent>

                <InfoLabel>
                  Recording Status
                </InfoLabel>

                <InfoValue>

                  {service.offeringsRecorded
                    ? "Recorded"
                    : "Not Recorded"}

                </InfoValue>

              </InfoContent>

            </InfoItem>

          </Section>


          {/* =================================
                        Notes
                    ================================== */}

          {service.notes && (

            <Section>

              <SectionTitle>
                Notes
              </SectionTitle>

              <Notes>

                {service.notes}

              </Notes>

            </Section>

          )}

        </Body>


        {/* =================================
                    Footer
                ================================== */}

        <Footer>

          <Button
            variant="secondary"
            type="button"
            onClick={onClose}
          >

            Close

          </Button>


          {onDelete && (

            <Button
              type="button"
              variant="danger"
              onClick={() =>
                onDelete(
                  service,
                )
              }
            >

              <FaTrash />

              Delete

            </Button>

          )}


          {onEdit && (

            <Button
              type="button"
              onClick={() =>
                onEdit(
                  service,
                )
              }
            >

              <FaEdit />

              Edit Service

            </Button>

          )}

        </Footer>

      </Panel>

    </Overlay>

  );

};

export default ServiceProfile;