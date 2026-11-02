import {
    useEffect,
    useState,
} from "react";

import {
    FaTimes,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationCircle,
    FaStickyNote,
} from "react-icons/fa";

import Modal from "../../../../components/ui/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";

import attendanceService from "../../../../services/attendanceService";

import {
    Form,
    RecordHeader,
    RecordInfo,
    MemberName,
    ServiceName,
    StatusSection,
    SectionLabel,
    StatusOptions,
    StatusOption,
    StatusIcon,
    StatusContent,
    StatusTitle,
    StatusDescription,
    NotesSection,
    NotesLabel,
    NotesWrapper,
    NotesIcon,
    NotesInput,
    Footer,
    CancelButton,
    SaveButton,
} from "./EditAttendanceModal.styles";


const STATUS_OPTIONS = [
    {
        value: "PRESENT",
        label: "Present",
        description: "Member attended the service.",
        icon: FaCheckCircle,
        type: "present",
    },
    {
        value: "ABSENT",
        label: "Absent",
        description: "Member did not attend.",
        icon: FaTimesCircle,
        type: "absent",
    },
    {
        value: "EXCUSED",
        label: "Excused",
        description: "Absence was approved.",
        icon: FaExclamationCircle,
        type: "excused",
    },
];


const EditAttendanceModal = ({
    isOpen,
    attendance,
    onClose,
    onSuccess,
}) => {

    const [status, setStatus] =
        useState("PRESENT");

    const [notes, setNotes] =
        useState("");

    const [saving, setSaving] =
        useState(false);


    // =====================================
    // Initialize
    // =====================================

    useEffect(() => {

        if (!attendance) {
            return;
        }

        setStatus(
            attendance.status || "PRESENT",
        );

        setNotes(
            attendance.notes || "",
        );

    }, [attendance]);


    // =====================================
    // Submit
    // =====================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!attendance) {
            return;
        }

        try {

            setSaving(true);

            await attendanceService.updateAttendance(
                attendance._id,
                {
                    status,
                    notes,
                },
            );

            await onSuccess?.();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update attendance.",
            );

        } finally {

            setSaving(false);

        }

    };


    // =====================================
    // Member
    // =====================================

    const member =
        attendance?.memberId ||
        attendance?.member;

    const memberName =
        member
            ? `${member.firstName || ""} ${member.lastName || ""}`.trim()
            : "Attendance Record";


    // =====================================
    // Service
    // =====================================

    const service =
        attendance?.serviceId ||
        attendance?.service;

    const serviceName =
        service?.title ||
        service?.name ||
        "Service attendance";


    return (

        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Attendance"
        >

            <Form onSubmit={handleSubmit}>

                {/* =================================
                    Record Header
                ================================== */}

                <RecordHeader>

                    <RecordInfo>

                        <MemberName>
                            {memberName}
                        </MemberName>

                        <ServiceName>
                            {serviceName}
                        </ServiceName>

                    </RecordInfo>

                </RecordHeader>


                {/* =================================
                    Status
                ================================== */}

                <StatusSection>

                    <SectionLabel>
                        Attendance Status
                    </SectionLabel>

                    <StatusOptions>

                        {STATUS_OPTIONS.map((option) => {

                            const Icon = option.icon;

                            const active =
                                status === option.value;

                            return (

                                <StatusOption
                                    key={option.value}
                                    type="button"
                                    $active={active}
                                    $type={option.type}
                                    onClick={() =>
                                        setStatus(
                                            option.value,
                                        )
                                    }
                                >

                                    <StatusIcon
                                        $active={active}
                                        $type={option.type}
                                    >

                                        <Icon />

                                    </StatusIcon>

                                    <StatusContent>

                                        <StatusTitle>
                                            {option.label}
                                        </StatusTitle>

                                        <StatusDescription>
                                            {option.description}
                                        </StatusDescription>

                                    </StatusContent>

                                    <span
                                        className="radio"
                                    />

                                </StatusOption>

                            );

                        })}

                    </StatusOptions>

                </StatusSection>


                {/* =================================
                    Notes
                ================================== */}

                <NotesSection>

                    <NotesLabel>
                        Notes
                    </NotesLabel>

                    <NotesWrapper>

                        <NotesIcon>
                            <FaStickyNote />
                        </NotesIcon>

                        <NotesInput
                            value={notes}
                            placeholder="Add an optional note..."
                            onChange={(e) =>
                                setNotes(
                                    e.target.value,
                                )
                            }
                            rows={3}
                        />

                    </NotesWrapper>

                </NotesSection>


                {/* =================================
                    Footer
                ================================== */}

                <Footer>

                    <CancelButton
                        type="button"
                        onClick={onClose}
                    >

                        Cancel

                    </CancelButton>

                    <SaveButton
                        type="submit"
                        disabled={saving}
                    >

                        <FaCheckCircle />

                        {saving
                            ? "Saving..."
                            : "Save Changes"}

                    </SaveButton>

                </Footer>

            </Form>

        </Modal>

    );

};


export default EditAttendanceModal;