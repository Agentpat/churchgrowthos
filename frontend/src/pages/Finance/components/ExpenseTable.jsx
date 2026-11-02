import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import Table from "../../../components/ui/Table/Table";
import Badge from "../../../components/ui/Badge/Badge";
import Button from "../../../components/ui/Button/Button";

const getCategoryLabel = (
  category,
) => {
  const labels = {
    SALARY: "Salary",
    RENT: "Rent",
    UTILITY: "Utility",
    EVENT: "Event",
    EQUIPMENT: "Equipment",
    TRANSPORT: "Transport",
    MAINTENANCE: "Maintenance",
    OTHER: "Other",
  };

  return (
    labels[category] ||
    "Other"
  );
};

const getPaymentMethodLabel = (
  method,
) => {
  const labels = {
    CASH: "Cash",
    TRANSFER: "Transfer",
    CARD: "Card",
    OTHER: "Other",
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
  ).toLocaleString("en-NG")}`;
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
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
};

const ExpensesTable = ({
  expenses = [],
  onView,
  onEdit,
  onDelete,
}) => {
  const columns = [
    // =====================================
    // Date
    // =====================================

    {
      header: "Date",

      accessor: (
        expense,
      ) =>
        formatDate(
          expense.expenseDate,
        ),
    },

    // =====================================
    // Expense
    // =====================================

    {
      header: "Expense",

      accessor: (
        expense,
      ) => (
        <strong>
          {expense.title ||
            "Untitled Expense"}
        </strong>
      ),
    },

    // =====================================
    // Category
    // =====================================

    {
      header: "Category",

      accessor: (
        expense,
      ) => (
        <Badge variant="default">
          {getCategoryLabel(
            expense.category,
          )}
        </Badge>
      ),
    },

    // =====================================
    // Amount
    // =====================================

    {
      header: "Amount",

      accessor: (
        expense,
      ) => (
        <strong>
          {formatCurrency(
            expense.amount,
          )}
        </strong>
      ),
    },

    // =====================================
    // Payment Method
    // =====================================

    {
      header: "Payment",

      accessor: (
        expense,
      ) =>
        getPaymentMethodLabel(
          expense.paymentMethod,
        ),
    },

    // =====================================
    // Service
    // =====================================

    {
      header: "Service",

      accessor: (
        expense,
      ) =>
        expense.serviceId
          ?.title ||
        "-",
    },

    // =====================================
    // Recorded By
    // =====================================

    {
      header: "Recorded By",

      accessor: (
        expense,
      ) => {
        const user =
          expense.recordedBy;

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

    // =====================================
    // Actions
    // =====================================

    {
      header: "Action",

      accessor: (
        expense,
      ) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <Button
            size="small"
            variant="secondary"
            type="button"
            onClick={() =>
              onView?.(
                expense,
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
                expense,
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
                expense,
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

  return (
    <Table
      columns={columns}
      data={expenses}
      emptyMessage="No expenses recorded."
    />
  );
};

export default ExpensesTable;