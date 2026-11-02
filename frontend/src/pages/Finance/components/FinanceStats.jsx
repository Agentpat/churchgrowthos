import {
  FaArrowDown,
  FaArrowUp,
  FaWallet,
  FaReceipt,
} from "react-icons/fa";

import StatsCard from "../../../components/ui/StatsCard/StatsCard";

import {
  StatsGrid,
} from "./FinanceStats.styles";

const FinanceStats = ({
  summary = {},
  offerings = [],
  expenses = [],
}) => {

  // =====================================
  // Total Income
  // =====================================

  const totalIncome =
    Number(
      summary?.totalIncome,
    ) ||
    offerings.reduce(
      (
        total,
        offering,
      ) =>
        total +
        (
          Number(
            offering.amount,
          ) || 0
        ),
      0,
    );


  // =====================================
  // Total Expenses
  // =====================================

  const totalExpenses =
    Number(
      summary?.totalExpenses,
    ) ||
    expenses.reduce(
      (
        total,
        expense,
      ) =>
        total +
        (
          Number(
            expense.amount,
          ) || 0
        ),
      0,
    );


  // =====================================
  // Balance
  // =====================================

  const balance =
    totalIncome -
    totalExpenses;


  // =====================================
  // Total Transactions
  // IMPORTANT:
  // Use backend summary because offerings
  // are paginated.
  // =====================================

  const transactions =
    Number(
      summary?.transactions,
    ) || 0;


  // =====================================
  // Currency Formatter
  // =====================================

  const formatCurrency = (
    value,
  ) => {

    return `₦${Number(
      value || 0,
    ).toLocaleString(
      "en-NG",
    )}`;

  };


  // =====================================
  // Statistics
  // =====================================

  const stats = [

    {
      label:
        "Total Income",

      value:
        formatCurrency(
          totalIncome,
        ),

      icon:
        <FaArrowUp />,

      trend:
        "Money recorded",

      trendType:
        "positive",
    },


    {
      label:
        "Total Expenses",

      value:
        formatCurrency(
          totalExpenses,
        ),

      icon:
        <FaArrowDown />,

      trend:
        "Money spent",

      trendType:
        "negative",
    },


    {
      label:
        "Current Balance",

      value:
        formatCurrency(
          balance,
        ),

      icon:
        <FaWallet />,

      trend:
        "Income minus expenses",

      trendType:
        balance >= 0
          ? "positive"
          : "negative",
    },


    {
      label:
        "Transactions",

      value:
        transactions,

      icon:
        <FaReceipt />,

      trend:
        "Financial records",

      trendType:
        "default",
    },

  ];


  // =====================================
  // Render
  // =====================================

  return (

    <StatsGrid>

      {stats.map(
        (stat) => (

          <StatsCard

            key={
              stat.label
            }

            label={
              stat.label
            }

            value={
              stat.value
            }

            icon={
              stat.icon
            }

            trend={
              stat.trend
            }

            trendType={
              stat.trendType
            }

          />

        ),
      )}

    </StatsGrid>

  );

};

export default FinanceStats;