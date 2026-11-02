import {
  FaEye,
} from "react-icons/fa";

import Table from "../../../../components/ui/Table/Table";
import Badge from "../../../../components/ui/Badge/Badge";
import Button from "../../../../components/ui/Button/Button";


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

    case "COMPLETED":
      return "default";

    case "CANCELLED":
      return "danger";

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
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

};


// =====================================
// Format Time
// =====================================

const formatTime = (
  startTime,
  endTime,
) => {

  if (!startTime) {

    return "-";

  }

  if (!endTime) {

    return startTime;

  }

  return `${startTime} - ${endTime}`;

};


// =====================================
// Services Table
// =====================================

const ServicesTable = ({
  services = [],
  onView,
}) => {

  const columns = [

    // =================================
    // Service
    // =================================

    {
      header: "Service",

      accessor: (service) => (

        <strong>

          {service.title ||
            "Untitled Service"}

        </strong>

      ),

    },

    // =================================
    // Type
    // =================================

    {
      header: "Type",

      accessor: (service) => (

        <span>

          {getServiceTypeLabel(
            service.serviceType,
          )}

        </span>

      ),

    },

    // =================================
    // Date
    // =================================

    {
      header: "Date",

      accessor: (service) =>

        formatDate(
          service.serviceDate,
        ),

    },

    // =================================
    // Time
    // =================================

    {
      header: "Time",

      accessor: (service) =>

        formatTime(
          service.startTime,
          service.endTime,
        ),

    },

    // =================================
    // Status
    // =================================

    {
      header: "Status",

      accessor: (service) => (

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

      ),

    },

    // =================================
    // Attendance
    // =================================

    {
      header: "Attendance",

      accessor: (service) => (

        <span>

          {service.totalAttendance ??
            0}

        </span>

      ),

    },

    // =================================
    // Action
    // =================================

    {
      header: "Action",

      accessor: (service) => (

        <Button
          type="button"
          size="sm"
          variant="secondary"
          onClick={() =>
            onView?.(service)
          }
        >

          <FaEye />

          View

        </Button>

      ),

    },

  ];

  return (

    <Table

      columns={columns}

      data={services}

      emptyMessage="No services found."

    />

  );

};

export default ServicesTable;