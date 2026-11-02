import {
    FaArrowUp,
    FaArrowDown,
    FaWallet,
    FaReceipt,
    FaCreditCard,
} from "react-icons/fa";

import MonthlyFinancialChart from "./Overview/FinanceOverview/MonthlyFinancialChart";
import IncomeByType from "./IncomeByType/IncomeByType";
import ExpensesByCategory from "./ExpensesByCategory/ExpensesByCategory";

import {
    OverviewContainer,

    Section,
    SectionHeader,
    SectionHeaderContent,
    SectionTitle,
    SectionDescription,
    SectionIcon,

    PositionGrid,
    PositionCard,
    PositionLabel,
    PositionValue,
    PositionMeta,

    IncomePosition,
    ExpensePosition,
    BalancePosition,

    ProgressSection,
    ProgressLabels,
    ProgressTrack,
    IncomeProgress,
    ExpenseProgress,

    BreakdownGrid,

    PaymentGrid,
    PaymentCard,
    PaymentMethod,
    PaymentAmount,
    PaymentTransactions,

    RecentActivityList,
    ActivityItem,
    ActivityLeft,
    ActivityIcon,
    ActivityInfo,
    ActivityTitle,
    ActivityMeta,
    ActivityAmount,

    EmptyState,
} from "./FinanceOverview.styles";


// =====================================
// Constants
// =====================================

const PAYMENT_METHOD_LABELS = {
    CASH: "Cash",
    TRANSFER: "Transfer",
    CARD: "Card",
    ONLINE: "Online",
    OTHER: "Other",
};

const INCOME_TYPE_LABELS = {
    OFFERING: "Offering",
    TITHE: "Tithe",
    DONATION: "Donation",
    SPECIAL_SEED: "Special Seed",
    OTHER: "Other",
};


// =====================================
// Finance Overview
// =====================================

const FinanceOverview = ({
    summary = {},
    analytics = {},
    offerings = [],
    expenses = [],
}) => {

    // =====================================
    // Currency Formatter
    // =====================================

    const formatCurrency = (value) => {
        return `₦${Number(
            value || 0,
        ).toLocaleString(
            "en-NG",
        )}`;
    };


    // =====================================
    // Date Formatter
    // =====================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        const parsedDate =
            new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime(),
            )
        ) {
            return "-";
        }

        return parsedDate.toLocaleDateString(
            undefined,
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            },
        );
    };


    // =====================================
    // Analytics Data
    // =====================================

    const analyticsSummary =
        analytics?.summary || {};


    const incomeByType =
        Array.isArray(
            analytics?.incomeByType,
        )
            ? analytics.incomeByType
            : [];


    const expensesByCategory =
        Array.isArray(
            analytics?.expensesByCategory,
        )
            ? analytics.expensesByCategory
            : [];


    const monthly =
        Array.isArray(
            analytics?.monthly,
        )
            ? analytics.monthly
            : [];


    const paymentMethods =
        Array.isArray(
            analytics?.paymentMethods,
        )
            ? analytics.paymentMethods
            : [];


    // =====================================
    // Financial Totals
    // =====================================

    const totalIncome =
        Number(
            analyticsSummary.totalIncome ??
            summary.totalIncome,
        ) || 0;


    const totalExpenses =
        Number(
            analyticsSummary.totalExpenses ??
            summary.totalExpenses,
        ) || 0;


    const balance =
        analyticsSummary.balance !== undefined
            ? Number(
                analyticsSummary.balance,
            ) || 0
            : Number(
                summary.balance,
            ) ||
            (
                totalIncome -
                totalExpenses
            );


    const transactions =
        Number(
            analyticsSummary.transactions ??
            summary.transactions,
        ) || 0;


    const incomeTransactions =
        Number(
            analyticsSummary.incomeTransactions ??
            summary.incomeTransactions,
        ) || 0;


    const expenseTransactions =
        Number(
            analyticsSummary.expenseTransactions ??
            summary.expenseTransactions,
        ) || 0;


    // =====================================
    // Income / Expense Ratio
    // =====================================

    const totalMovement =
        totalIncome +
        totalExpenses;


    const incomePercentage =
        totalMovement > 0
            ? (
                totalIncome /
                totalMovement
            ) * 100
            : 0;


    const expensePercentage =
        totalMovement > 0
            ? (
                totalExpenses /
                totalMovement
            ) * 100
            : 0;


    // =====================================
    // Recent Activity
    // =====================================

    const recentActivity = [

        ...(
            Array.isArray(
                offerings,
            )
                ? offerings
                : []
        ).map(
            (
                offering,
            ) => ({

                ...offering,

                transactionKind:
                    "income",

                activityDate:
                    offering.transactionDate,

            }),
        ),

        ...(
            Array.isArray(
                expenses,
            )
                ? expenses
                : []
        ).map(
            (
                expense,
            ) => ({

                ...expense,

                transactionKind:
                    "expense",

                activityDate:
                    expense.expenseDate,

            }),
        ),

    ]
        .sort(
            (
                a,
                b,
            ) =>
                new Date(
                    b.activityDate || 0,
                ) -
                new Date(
                    a.activityDate || 0,
                ),
        )
        .slice(
            0,
            8,
        );


    // =====================================
    // Render
    // =====================================

    return (

        <OverviewContainer>

            {/* =================================
                Financial Position
            ================================== */}

            <Section>

                <SectionHeader>

                    <SectionIcon>
                        <FaWallet />
                    </SectionIcon>


                    <SectionHeaderContent>

                        <SectionTitle>
                            Financial Position
                        </SectionTitle>


                        <SectionDescription>
                            Overall church financial position
                        </SectionDescription>

                    </SectionHeaderContent>

                </SectionHeader>


                <PositionGrid>

                    {/* =========================
                        Income
                    ========================== */}

                    <PositionCard
                        variant="income"
                    >

                        <PositionLabel>

                            <IncomePosition>
                                <FaArrowUp />
                                Income
                            </IncomePosition>

                        </PositionLabel>


                        <PositionValue>
                            {
                                formatCurrency(
                                    totalIncome,
                                )
                            }
                        </PositionValue>


                        <PositionMeta>
                            {
                                incomeTransactions
                            }{" "}
                            income transactions
                        </PositionMeta>

                    </PositionCard>


                    {/* =========================
                        Expenses
                    ========================== */}

                    <PositionCard
                        variant="expense"
                    >

                        <PositionLabel>

                            <ExpensePosition>
                                <FaArrowDown />
                                Expenses
                            </ExpensePosition>

                        </PositionLabel>


                        <PositionValue>
                            {
                                formatCurrency(
                                    totalExpenses,
                                )
                            }
                        </PositionValue>


                        <PositionMeta>
                            {
                                expenseTransactions
                            }{" "}
                            expense transactions
                        </PositionMeta>

                    </PositionCard>


                    {/* =========================
                        Balance
                    ========================== */}

                    <PositionCard
                        variant={
                            balance >= 0
                                ? "balance"
                                : "negative"
                        }
                    >

                        <PositionLabel>

                            <BalancePosition
                                positive={
                                    balance >= 0
                                }
                            >

                                <FaWallet />
                                Balance

                            </BalancePosition>

                        </PositionLabel>


                        <PositionValue>
                            {
                                formatCurrency(
                                    balance,
                                )
                            }
                        </PositionValue>


                        <PositionMeta>
                            {
                                transactions
                            }{" "}
                            total transactions
                        </PositionMeta>

                    </PositionCard>

                </PositionGrid>


                {/* =========================
                    Income / Expense Ratio
                ========================== */}

                <ProgressSection>

                    <ProgressLabels>

                        <span>
                            Income{" "}
                            {
                                incomePercentage.toFixed(
                                    1,
                                )
                            }%
                        </span>


                        <span>
                            Expenses{" "}
                            {
                                expensePercentage.toFixed(
                                    1,
                                )
                            }%
                        </span>

                    </ProgressLabels>


                    <ProgressTrack>

                        <IncomeProgress
                            percentage={
                                incomePercentage
                            }
                        />


                        <ExpenseProgress
                            percentage={
                                expensePercentage
                            }
                        />

                    </ProgressTrack>

                </ProgressSection>

            </Section>


            {/* =================================
                Income + Expense Breakdown
            ================================== */}

            <BreakdownGrid>

                <IncomeByType
                    data={
                        incomeByType
                    }
                />


                <ExpensesByCategory
                    data={
                        expensesByCategory
                    }
                />

            </BreakdownGrid>


            {/* =================================
                Monthly Financial Activity
            ================================== */}

            <MonthlyFinancialChart
                monthly={
                    monthly
                }
            />


            {/* =================================
                Payment Methods
            ================================== */}

            <Section>

                <SectionHeader>

                    <SectionIcon>
                        <FaCreditCard />
                    </SectionIcon>


                    <SectionHeaderContent>

                        <SectionTitle>
                            Payment Methods
                        </SectionTitle>


                        <SectionDescription>
                            How church income is being received
                        </SectionDescription>

                    </SectionHeaderContent>

                </SectionHeader>


                {paymentMethods.length === 0 ? (

                    <EmptyState>
                        No payment method data available.
                    </EmptyState>

                ) : (

                    <PaymentGrid>

                        {paymentMethods.map(
                            (
                                item,
                            ) => (

                                <PaymentCard
                                    key={
                                        item.paymentMethod
                                    }
                                >

                                    <PaymentMethod>
                                        {
                                            PAYMENT_METHOD_LABELS[
                                            item.paymentMethod
                                            ] ||
                                            "Other"
                                        }
                                    </PaymentMethod>


                                    <PaymentAmount>
                                        {
                                            formatCurrency(
                                                item.amount,
                                            )
                                        }
                                    </PaymentAmount>


                                    <PaymentTransactions>
                                        {
                                            item.transactions ||
                                            0
                                        }{" "}
                                        transaction
                                        {
                                            item.transactions === 1
                                                ? ""
                                                : "s"
                                        }
                                    </PaymentTransactions>

                                </PaymentCard>

                            ),
                        )}

                    </PaymentGrid>

                )}

            </Section>


            {/* =================================
                Recent Financial Activity
            ================================== */}

            <Section>

                <SectionHeader>

                    <SectionIcon>
                        <FaReceipt />
                    </SectionIcon>


                    <SectionHeaderContent>

                        <SectionTitle>
                            Recent Financial Activity
                        </SectionTitle>


                        <SectionDescription>
                            Latest recorded financial transactions
                        </SectionDescription>

                    </SectionHeaderContent>

                </SectionHeader>


                {recentActivity.length === 0 ? (

                    <EmptyState>
                        No financial activity recorded yet.
                    </EmptyState>

                ) : (

                    <RecentActivityList>

                        {recentActivity.map(
                            (
                                transaction,
                                index,
                            ) => {

                                const isIncome =
                                    transaction.transactionKind ===
                                    "income";


                                const user =
                                    transaction.recordedBy;


                                const recordedBy =
                                    user
                                        ? (
                                            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                                            user.email ||
                                            "-"
                                        )
                                        : "-";


                                const transactionName =
                                    isIncome
                                        ? (
                                            INCOME_TYPE_LABELS[
                                            transaction.type
                                            ] ||
                                            "Offering"
                                        )
                                        : (
                                            transaction.title ||
                                            "Expense"
                                        );


                                return (

                                    <ActivityItem
                                        key={
                                            transaction._id ||
                                            index
                                        }
                                    >

                                        <ActivityLeft>

                                            <ActivityIcon
                                                variant={
                                                    isIncome
                                                        ? "income"
                                                        : "expense"
                                                }
                                            >

                                                {isIncome
                                                    ? (
                                                        <FaArrowUp />
                                                    )
                                                    : (
                                                        <FaArrowDown />
                                                    )}

                                            </ActivityIcon>


                                            <ActivityInfo>

                                                <ActivityTitle>
                                                    {
                                                        transactionName
                                                    }
                                                </ActivityTitle>


                                                <ActivityMeta>

                                                    {
                                                        formatDate(
                                                            transaction.activityDate,
                                                        )
                                                    }

                                                    {" · "}

                                                    {
                                                        recordedBy
                                                    }

                                                </ActivityMeta>

                                            </ActivityInfo>

                                        </ActivityLeft>


                                        <ActivityAmount
                                            variant={
                                                isIncome
                                                    ? "income"
                                                    : "expense"
                                            }
                                        >

                                            {isIncome
                                                ? "+"
                                                : "-"}

                                            {
                                                formatCurrency(
                                                    transaction.amount,
                                                )
                                            }

                                        </ActivityAmount>

                                    </ActivityItem>

                                );

                            },
                        )}

                    </RecentActivityList>

                )}

            </Section>

        </OverviewContainer>

    );
};


export default FinanceOverview;