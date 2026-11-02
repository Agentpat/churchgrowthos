import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    FaCheck,
    FaCheckCircle,
    FaChevronDown,
    FaSearch,
    FaTimes,
    FaUsers,
    FaUserCheck,
    FaUserTimes,
} from "react-icons/fa";

import Modal from "../../../../components/ui/Modal/Modal";
import Input from "../../../../components/ui/Input/Input";
import Select from "../../../../components/ui/Select/Select";
import Button from "../../../../components/ui/Button/Button";
import Avatar from "../../../../components/ui/Avatar/Avatar";

import {
    Form,
    ServiceBar,
    ServiceInfo,
    ServiceIcon,
    ServiceDetails,
    ServiceTitle,
    ServiceMeta,
    SessionStatus,
    StatusDot,
    SummaryGrid,
    SummaryCard,
    SummaryIcon,
    SummaryInfo,
    SummaryLabel,
    SummaryValue,
    Toolbar,
    SearchBox,
    SearchIcon,
    SearchInput,
    MemberCount,
    MemberList,
    ListHeader,
    ListTitle,
    ListHint,
    MemberRow,
    MemberMain,
    MemberInfo,
    MemberName,
    MemberMeta,
    StatusGroup,
    StatusButton,
    StatusDotSmall,
    EmptyState,
    Footer,
    FooterInfo,
    FooterCount,
    FooterActions,
} from "./TakeAttendanceModal.styles";

const STATUS_OPTIONS = [
    "PRESENT",
    "ABSENT",
    "EXCUSED",
];

const CHECK_IN_METHODS = [
    {
        value: "MANUAL",
        label: "Manual",
    },
    {
        value: "QR_CODE",
        label: "QR Code",
    },
    {
        value: "SELF_CHECK_IN",
        label: "Self Check-in",
    },
    {
        value: "SMS",
        label: "SMS",
    },
];

const TakeAttendanceModal = ({
    isOpen,
    onClose,
    services = [],
    members = [],
    defaultServiceId = "",
    onSubmit,
}) => {
    const [serviceId, setServiceId] =
        useState(defaultServiceId);

    const [search, setSearch] =
        useState("");

    const [attendance, setAttendance] =
        useState({});

    const [checkInMethod, setCheckInMethod] =
        useState("MANUAL");

    const [submitting, setSubmitting] =
        useState(false);

    // =====================================
    // Initialize
    // =====================================

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const initial = {};

        members.forEach((member) => {
            initial[member._id] = {
                status: "PRESENT",
                notes: "",
            };
        });

        setAttendance(initial);
        setSearch("");
        setCheckInMethod("MANUAL");

        setServiceId(
            defaultServiceId || "",
        );
    }, [
        isOpen,
        members,
        defaultServiceId,
    ]);

    // =====================================
    // Selected Service
    // =====================================

    const selectedService = useMemo(() => {
        return services.find(
            (service) =>
                service._id === serviceId,
        );
    }, [
        services,
        serviceId,
    ]);

    // =====================================
    // Filter Members
    // =====================================

    const filteredMembers = useMemo(() => {
        const keyword =
            search.trim().toLowerCase();

        if (!keyword) {
            return members;
        }

        return members.filter((member) => {
            const fullName =
                `${member.firstName || ""} ${member.lastName || ""}`
                    .trim()
                    .toLowerCase();

            const phone =
                member.phone
                    ?.toLowerCase() || "";

            const email =
                member.email
                    ?.toLowerCase() || "";

            return (
                fullName.includes(keyword) ||
                phone.includes(keyword) ||
                email.includes(keyword)
            );
        });
    }, [
        members,
        search,
    ]);

    // =====================================
    // Attendance Counts
    // =====================================

    const counts = useMemo(() => {
        let present = 0;
        let absent = 0;
        let excused = 0;

        Object.values(attendance).forEach(
            (record) => {
                if (
                    record.status ===
                    "PRESENT"
                ) {
                    present += 1;
                }

                if (
                    record.status ===
                    "ABSENT"
                ) {
                    absent += 1;
                }

                if (
                    record.status ===
                    "EXCUSED"
                ) {
                    excused += 1;
                }
            },
        );

        return {
            total: members.length,
            present,
            absent,
            excused,
        };
    }, [
        attendance,
        members.length,
    ]);

    // =====================================
    // Change Status
    // =====================================

    const handleStatusChange = (
        memberId,
        status,
    ) => {
        setAttendance((prev) => ({
            ...prev,

            [memberId]: {
                ...prev[memberId],
                status,
            },
        }));
    };

    // =====================================
    // Submit
    // =====================================

    const handleSubmit = async () => {
        if (!serviceId) {
            alert(
                "Please select a service.",
            );

            return;
        }

        if (!members.length) {
            alert(
                "No members found.",
            );

            return;
        }

        const payload = {
            serviceId,

            attendance:
                Object.entries(
                    attendance,
                ).map(
                    ([
                        memberId,
                        value,
                    ]) => ({
                        memberId,

                        status:
                            value.status,

                        checkInMethod,

                        notes:
                            value.notes ||
                            "",
                    }),
                ),
        };

        try {
            setSubmitting(true);

            await onSubmit?.(payload);

            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    // =====================================
    // Service Label
    // =====================================

    const serviceTitle =
        selectedService?.title ||
        selectedService?.name ||
        "Select a service";

    const serviceType =
        selectedService?.serviceType ||
        "Church Service";

    // =====================================
    // Render
    // =====================================

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Take Attendance"
        >
            <Form>
                {/* =================================
                    Service / Session Bar
                ================================== */}

                <ServiceBar>
                    <ServiceInfo>
                        <ServiceIcon>
                            <FaUsers />
                        </ServiceIcon>

                        <ServiceDetails>
                            <ServiceTitle>
                                {serviceTitle}
                            </ServiceTitle>

                            <ServiceMeta>
                                {serviceType}
                            </ServiceMeta>
                        </ServiceDetails>
                    </ServiceInfo>

                    <SessionStatus>
                        <StatusDot />

                        <span>
                            Attendance
                            Ready
                        </span>
                    </SessionStatus>
                </ServiceBar>

                {/* =================================
                    Service Selector
                ================================== */}

                <Toolbar>
                    <Select
                        label="Service"
                        value={serviceId}
                        onChange={(e) =>
                            setServiceId(
                                e.target.value,
                            )
                        }
                    >
                        <option value="">
                            Select Service
                        </option>

                        {services.map(
                            (service) => (
                                <option
                                    key={
                                        service._id
                                    }
                                    value={
                                        service._id
                                    }
                                >
                                    {service.title ||
                                        service.name}
                                </option>
                            ),
                        )}
                    </Select>

                    <Select
                        label="Check-in method"
                        value={
                            checkInMethod
                        }
                        onChange={(e) =>
                            setCheckInMethod(
                                e.target.value,
                            )
                        }
                    >
                        {CHECK_IN_METHODS.map(
                            (method) => (
                                <option
                                    key={
                                        method.value
                                    }
                                    value={
                                        method.value
                                    }
                                >
                                    {method.label}
                                </option>
                            ),
                        )}
                    </Select>
                </Toolbar>

                {/* =================================
                    Summary
                ================================== */}

                <SummaryGrid>
                    <SummaryCard>
                        <SummaryIcon variant="total">
                            <FaUsers />
                        </SummaryIcon>

                        <SummaryInfo>
                            <SummaryLabel>
                                Expected
                            </SummaryLabel>

                            <SummaryValue>
                                {
                                    counts.total
                                }
                            </SummaryValue>
                        </SummaryInfo>
                    </SummaryCard>

                    <SummaryCard>
                        <SummaryIcon variant="present">
                            <FaUserCheck />
                        </SummaryIcon>

                        <SummaryInfo>
                            <SummaryLabel>
                                Present
                            </SummaryLabel>

                            <SummaryValue>
                                {
                                    counts.present
                                }
                            </SummaryValue>
                        </SummaryInfo>
                    </SummaryCard>

                    <SummaryCard>
                        <SummaryIcon variant="absent">
                            <FaUserTimes />
                        </SummaryIcon>

                        <SummaryInfo>
                            <SummaryLabel>
                                Absent
                            </SummaryLabel>

                            <SummaryValue>
                                {
                                    counts.absent
                                }
                            </SummaryValue>
                        </SummaryInfo>
                    </SummaryCard>

                    <SummaryCard>
                        <SummaryIcon variant="excused">
                            <FaCheckCircle />
                        </SummaryIcon>

                        <SummaryInfo>
                            <SummaryLabel>
                                Excused
                            </SummaryLabel>

                            <SummaryValue>
                                {
                                    counts.excused
                                }
                            </SummaryValue>
                        </SummaryInfo>
                    </SummaryCard>
                </SummaryGrid>

                {/* =================================
                    Member Toolbar
                ================================== */}

                <Toolbar compact>
                    <SearchBox>
                        <SearchIcon>
                            <FaSearch />
                        </SearchIcon>

                        <SearchInput
                            type="text"
                            placeholder="Search members..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value,
                                )
                            }
                        />
                    </SearchBox>

                    <MemberCount>
                        {filteredMembers.length}
                        {" "}
                        {filteredMembers.length ===
                            1
                            ? "member"
                            : "members"}
                    </MemberCount>
                </Toolbar>

                {/* =================================
                    Member List
                ================================== */}

                <MemberList>
                    <ListHeader>
                        <ListTitle>
                            Members
                        </ListTitle>

                        <ListHint>
                            Select an attendance
                            status for each member
                        </ListHint>
                    </ListHeader>

                    {filteredMembers.length ===
                        0 ? (
                        <EmptyState>
                            <FaUsers />

                            <strong>
                                No members found
                            </strong>

                            <span>
                                Try a different
                                search term.
                            </span>
                        </EmptyState>
                    ) : (
                        filteredMembers.map(
                            (member) => {
                                const currentStatus =
                                    attendance[
                                        member._id
                                    ]?.status ||
                                    "PRESENT";

                                const fullName =
                                    `${member.firstName || ""} ${member.lastName || ""}`
                                        .trim();

                                return (
                                    <MemberRow
                                        key={
                                            member._id
                                        }
                                    >
                                        <MemberMain>
                                            <Avatar
                                                size="sm"
                                                name={
                                                    fullName ||
                                                    "Unknown Member"
                                                }
                                                subtitle={
                                                    member.membershipStatus ||
                                                    "Member"
                                                }
                                            />

                                            <MemberInfo>
                                                <MemberName>
                                                    {fullName ||
                                                        "Unknown Member"}
                                                </MemberName>

                                                <MemberMeta>
                                                    {member.phone ||
                                                        member.email ||
                                                        "Member"}
                                                </MemberMeta>
                                            </MemberInfo>
                                        </MemberMain>

                                        <StatusGroup>
                                            {STATUS_OPTIONS.map(
                                                (
                                                    status,
                                                ) => (
                                                    <StatusButton
                                                        key={
                                                            status
                                                        }
                                                        type="button"
                                                        $active={
                                                            currentStatus ===
                                                            status
                                                        }
                                                        $status={
                                                            status
                                                        }
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                member._id,
                                                                status,
                                                            )
                                                        }
                                                    >
                                                        <StatusDotSmall
                                                            $status={
                                                                status
                                                            }
                                                        />

                                                        <span>
                                                            {status ===
                                                                "PRESENT"
                                                                ? "Present"
                                                                : status ===
                                                                    "ABSENT"
                                                                    ? "Absent"
                                                                    : "Excused"}
                                                        </span>
                                                    </StatusButton>
                                                ),
                                            )}
                                        </StatusGroup>
                                    </MemberRow>
                                );
                            },
                        )
                    )}
                </MemberList>

                {/* =================================
                    Footer
                ================================== */}

                <Footer>
                    <FooterInfo>
                        <FooterCount>
                            {counts.present}
                            {" "}
                            present
                        </FooterCount>

                        <span>
                            {counts.absent}
                            {" "}
                            absent
                            {" · "}
                            {counts.excused}
                            {" "}
                            excused
                        </span>
                    </FooterInfo>

                    <FooterActions>
                        <Button
                            variant="secondary"
                            onClick={
                                onClose
                            }
                            disabled={
                                submitting
                            }
                        >
                            <FaTimes />

                            Cancel
                        </Button>

                        <Button
                            variant="primary"
                            onClick={
                                handleSubmit
                            }
                            disabled={
                                submitting ||
                                !serviceId ||
                                !members.length
                            }
                        >
                            <FaCheck />

                            {submitting
                                ? "Saving..."
                                : "Save Attendance"}
                        </Button>
                    </FooterActions>
                </Footer>
            </Form>
        </Modal>
    );
};

export default TakeAttendanceModal;