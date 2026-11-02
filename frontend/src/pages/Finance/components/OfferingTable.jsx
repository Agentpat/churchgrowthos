import {
  FaEye,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import Table from "../../../components/ui/Table/Table";
import Badge from "../../../components/ui/Badge/Badge";
import Button from "../../../components/ui/Button/Button";


const getOfferingTypeLabel = (
  type,
) => {

  const labels = {

    OFFERING:
      "Offering",

    TITHE:
      "Tithe",

    DONATION:
      "Donation",

    SPECIAL_SEED:
      "Special Seed",

    OTHER:
      "Other",

  };


  return (
    labels[type] ||
    "Other"
  );

};


const getPaymentMethodLabel = (
  method,
) => {

  const labels = {

    CASH:
      "Cash",

    TRANSFER:
      "Transfer",

    CARD:
      "Card",

    ONLINE:
      "Online",

    OTHER:
      "Other",

  };


  return (
    labels[method] ||
    "Other"
  );

};


const formatCurrency = (
  amount,
) => {

  return `₦${Number(
    amount || 0,
  ).toLocaleString(
    "en-NG",
  )}`;

};


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
      day:
        "2-digit",

      month:
        "short",

      year:
        "numeric",
    },
  );

};


const OfferingsTable = ({
  offerings = [],

  pagination = {},

  onPageChange,

  onView,

  onEdit,

  onDelete,
}) => {

  // =====================================
  // Pagination Values
  // =====================================

  const currentPage =
    Number(
      pagination?.page,
    ) || 1;


  const totalPages =
    Number(
      pagination?.pages,
    ) || 1;


  const totalRecords =
    Number(
      pagination?.total,
    ) || offerings.length;


  const limit =
    Number(
      pagination?.limit,
    ) || 10;


  const startRecord =
    totalRecords === 0
      ? 0
      : (
        (currentPage - 1) *
        limit
      ) + 1;


  const endRecord =
    Math.min(
      currentPage * limit,
      totalRecords,
    );


  // =====================================
  // Table Columns
  // =====================================

  const columns = [

    // =================================
    // Date
    // =================================

    {
      header:
        "Date",

      accessor: (
        offering,
      ) =>
        formatDate(
          offering.transactionDate,
        ),
    },


    // =================================
    // Type
    // =================================

    {
      header:
        "Type",

      accessor: (
        offering,
      ) => (

        <Badge
          variant="success"
        >

          {
            getOfferingTypeLabel(
              offering.type,
            )
          }

        </Badge>

      ),
    },


    // =================================
    // Amount
    // =================================

    {
      header:
        "Amount",

      accessor: (
        offering,
      ) => (

        <strong>

          {
            formatCurrency(
              offering.amount,
            )
          }

        </strong>

      ),
    },


    // =================================
    // Payment Method
    // =================================

    {
      header:
        "Payment",

      accessor: (
        offering,
      ) =>
        getPaymentMethodLabel(
          offering.paymentMethod,
        ),
    },


    // =================================
    // Service
    // =================================

    {
      header:
        "Service",

      accessor: (
        offering,
      ) =>
        offering.serviceId
          ?.title ||
        "-",
    },


    // =================================
    // Recorded By
    // =================================

    {
      header:
        "Recorded By",

      accessor: (
        offering,
      ) => {

        const user =
          offering.recordedBy;


        if (!user) {

          return "-";

        }


        return (

          `${user.firstName || ""} ${user.lastName || ""
            }`.trim() ||

          user.email ||

          "-"

        );

      },
    },


    // =================================
    // Actions
    // =================================

    {
      header:
        "Action",

      accessor: (
        offering,
      ) => (

        <div
          style={{
            display:
              "flex",

            gap:
              "8px",

            flexWrap:
              "wrap",
          }}
        >

          <Button
            size="small"
            variant="secondary"
            type="button"
            onClick={() =>
              onView?.(
                offering,
              )
            }
          >

            <FaEye />

            View

          </Button>


          <Button
            size="small"
            type="button"
            onClick={() =>
              onEdit?.(
                offering,
              )
            }
          >

            <FaEdit />

            Edit

          </Button>


          <Button
            size="small"
            variant="danger"
            type="button"
            onClick={() =>
              onDelete?.(
                offering,
              )
            }
          >

            <FaTrash />

            Delete

          </Button>

        </div>

      ),
    },

  ];


  // =====================================
  // Page Change
  // =====================================

  const handlePageChange = (
    page,
  ) => {

    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {

      return;

    }


    onPageChange?.(page);

  };


  // =====================================
  // Render
  // =====================================

  return (

    <div>

      <Table

        columns={
          columns
        }

        data={
          offerings
        }

      />


      {/* =================================
                Pagination Information
            ================================== */}

      {totalRecords > 0 && (

        <div
          style={{
            display:
              "flex",

            justifyContent:
              "space-between",

            alignItems:
              "center",

            gap:
              "16px",

            marginTop:
              "20px",

            flexWrap:
              "wrap",
          }}
        >

          <span
            style={{
              fontSize:
                "14px",
            }}
          >

            Showing{" "}

            <strong>
              {
                startRecord
              }
            </strong>

            {" "}-
            {" "}

            <strong>
              {
                endRecord
              }
            </strong>

            {" "}of{" "}

            <strong>
              {
                totalRecords
              }
            </strong>

          </span>


          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                "8px",
            }}
          >

            <Button
              size="small"
              variant="secondary"
              type="button"
              disabled={
                currentPage <=
                1
              }
              onClick={() =>
                handlePageChange(
                  currentPage -
                  1,
                )
              }
            >

              <FaChevronLeft />

              Previous

            </Button>


            {Array.from(
              {
                length:
                  totalPages,
              },
              (
                _,
                index,
              ) =>
                index + 1,
            ).map(
              (page) => (

                <Button
                  key={
                    page
                  }
                  size="small"
                  type="button"
                  variant={
                    page ===
                      currentPage
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    handlePageChange(
                      page,
                    )
                  }
                >

                  {
                    page
                  }

                </Button>

              ),
            )}


            <Button
              size="small"
              variant="secondary"
              type="button"
              disabled={
                currentPage >=
                totalPages
              }
              onClick={() =>
                handlePageChange(
                  currentPage +
                  1,
                )
              }
            >

              Next

              <FaChevronRight />

            </Button>

          </div>

        </div>

      )}

    </div>

  );

};


export default OfferingsTable;