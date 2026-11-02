import {
    FaEye,
    FaQrcode,
    FaUserCheck,
    FaMobileAlt,
    FaUserEdit,
} from "react-icons/fa";
import {
    ServiceCell,
    ServiceTitle,
    ServiceType,
    Method,
    MethodIcon,
    MethodText,
    DateCell,
    TimeCell,
    ActionCell,
} from "./AttendanceTable.styles";

import Table from "../../../../components/ui/Table/Table";
import Button from "../../../../components/ui/Button/Button";
import Avatar from "../../../../components/ui/Avatar/Avatar";
import Badge from "../../../../components/ui/Badge/Badge";


const AttendanceTable = ({
    attendance = [],
    onView,
}) => {

    // =====================================
    // Status
    // =====================================

    const getStatusVariant = (status) => {

        switch (status) {

            case "PRESENT":
                return "success";

            case "ABSENT":
                return "danger";

            case "EXCUSED":
                return "warning";

            default:
                return "default";
        }
    };


    // =====================================
    // Check-in Method
    // =====================================

    const getCheckInMethod = (method) => {

        switch (method) {

            case "QR_CODE":
                return {
                    label: "QR",
                    icon: FaQrcode,
                };

            case "SELF_CHECK_IN":
                return {
                    label: "Self check-in",
                    icon: FaMobileAlt,
                };

            case "MANUAL":
                return {
                    label: "Manual",
                    icon: FaUserEdit,
                };

            case "SMS":
                return {
                    label: "SMS",
                    icon: FaMobileAlt,
                };

            default:
                return {
                    label: "Unknown",
                    icon: FaUserCheck,
                };
        }
    };


    // =====================================
    // Format Date
    // =====================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-NG",
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            },
        );
    };


    // =====================================
    // Format Time
    // =====================================

    const formatTime = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleTimeString(
            "en-NG",
            {
                hour: "2-digit",
                minute: "2-digit",
            },
        );
    };


    // =====================================
    // Columns
    // =====================================

    const columns = [

        // =================================
        // Member
        // =================================

        {
            header: "Member",

            accessor: (record) => {

                if (!record.memberId) {

                    return (
                        <Avatar
                            name="Unknown Member"
                            subtitle="No member record"
                        />
                    );
                }

                const fullName =
                    `${record.memberId.firstName || ""} ${record.memberId.lastName || ""}`
                        .trim();


                return (
                    <Avatar
                        name={
                            fullName ||
                            "Unknown Member"
                        }
                        subtitle={
                            record.memberId.membershipStatus ||
                            "Member"
                        }
                    />
                );
            },
        },


        // =================================
        // Service
        // =================================

        {
            header: "Service",

            accessor: (record) => (

                <ServiceCell>

                    <ServiceTitle>
                        {
                            record.serviceId?.title ||
                            record.serviceId?.name ||
                            "Unknown service"
                        }
                    </ServiceTitle>

                    {record.serviceId?.serviceType && (

                        <ServiceType>
                            {
                                record.serviceId.serviceType
                            }
                        </ServiceType>

                    )}

                </ServiceCell>

            ),
        },


        // =================================
        // Check-in Method
        // =================================

        {
            header: "Check-in",

            width: "145px",

            accessor: (record) => {

                const method =
                    getCheckInMethod(
                        record.checkInMethod,
                    );

                const Icon =
                    method.icon;


                return (
                    <Method>

                        <MethodIcon>
                            <Icon />
                        </MethodIcon>

                        <MethodText>
                            {method.label}
                        </MethodText>

                    </Method>
                );
            },
        },


        // =================================
        // Status
        // =================================

        {
            header: "Status",

            align: "center",

            width: "120px",

            accessor: (record) => (

                <Badge
                    variant={
                        getStatusVariant(
                            record.status,
                        )
                    }
                >
                    {
                        record.status ||
                        "UNKNOWN"
                    }
                </Badge>

            ),
        },


        // =================================
        // Date
        // =================================

        {
            header: "Date",

            width: "125px",

            accessor: (record) => (

                <DateCell>

                    {formatDate(
                        record.checkedInAt,
                    )}

                </DateCell>

            ),
        },


        // =================================
        // Time
        // =================================

        {
            header: "Time",

            width: "100px",

            accessor: (record) => (

                <TimeCell>

                    {formatTime(
                        record.checkedInAt,
                    )}

                </TimeCell>

            ),
        },


        // =================================
        // Action
        // =================================

        {
            header: "",

            align: "right",

            width: "90px",

            accessor: (record) => (

                <ActionCell>

                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                            onView(record)
                        }
                        aria-label="View attendance"
                    >

                        <FaEye />

                        <span>
                            View
                        </span>

                    </Button>

                </ActionCell>

            ),
        },

    ];


    return (

        <Table
            columns={columns}
            data={attendance}
            emptyMessage="No attendance records found."
        />

    );
};


export default AttendanceTable;