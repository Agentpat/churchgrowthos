import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";

import {
    useTheme,
} from "styled-components";

import {
    FaChartColumn,
} from "react-icons/fa6";

import {
    Card,
    Header,
    HeaderContent,
    Title,
    Description,
    ChartWrapper,
    EmptyState,
    EmptyStateContent,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateText,
    TooltipCard,
    TooltipTitle,
    TooltipRow,
    TooltipLabel,
    TooltipValue,
    TooltipBalance,
    TooltipBalanceLabel,
    TooltipBalanceValue,
} from "./MonthlyFinancialChart.styles";


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
// Month Formatter
// =====================================

const formatMonth = (
    year,
    month,
) => {

    if (
        !year ||
        !month
    ) {
        return "-";
    }

    const date = new Date(
        Number(year),
        Number(month) - 1,
        1,
    );

    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            year: "2-digit",
        },
    );

};


// =====================================
// Axis Value Formatter
// =====================================

const formatAxisValue = (
    value,
) => {

    const numericValue =
        Number(value) || 0;

    const absoluteValue =
        Math.abs(
            numericValue,
        );


    // =================================
    // Millions
    // =================================

    if (
        absoluteValue >=
        1_000_000
    ) {

        return `₦${(
            numericValue /
            1_000_000
        ).toLocaleString(
            "en-NG",
            {
                maximumFractionDigits: 1,
            },
        )}M`;

    }


    // =================================
    // Thousands
    // =================================

    if (
        absoluteValue >=
        1_000
    ) {

        return `₦${(
            numericValue /
            1_000
        ).toLocaleString(
            "en-NG",
            {
                maximumFractionDigits: 0,
            },
        )}k`;

    }


    return `₦${numericValue.toLocaleString(
        "en-NG",
    )}`;

};


// =====================================
// Normalize Monthly Data
// =====================================

const normalizeMonthlyData = (
    monthly,
) => {

    if (
        !Array.isArray(
            monthly,
        )
    ) {
        return [];
    }


    return monthly.map(
        (
            item,
        ) => {

            const income =
                Number(
                    item?.income,
                ) || 0;


            const expenses =
                Number(
                    item?.expenses,
                ) || 0;


            const balance =
                item?.balance !==
                    undefined &&
                    item?.balance !==
                    null
                    ? Number(
                        item.balance,
                    )
                    : income -
                    expenses;


            return {

                ...item,

                name:
                    formatMonth(
                        item?.year,
                        item?.month,
                    ),

                income,

                expenses,

                balance:
                    Number(
                        balance,
                    ) || 0,

            };

        },
    );

};


// =====================================
// Custom Tooltip
// =====================================

const CustomTooltip = ({
    active,
    payload,
    label,
}) => {

    if (
        !active ||
        !Array.isArray(
            payload,
        ) ||
        payload.length === 0
    ) {

        return null;

    }


    const income =
        Number(
            payload.find(
                (
                    item,
                ) =>
                    item.dataKey ===
                    "income",
            )?.value,
        ) || 0;


    const expenses =
        Number(
            payload.find(
                (
                    item,
                ) =>
                    item.dataKey ===
                    "expenses",
            )?.value,
        ) || 0;


    const balance =
        income -
        expenses;


    return (

        <TooltipCard>

            <TooltipTitle>
                {label}
            </TooltipTitle>


            {/* =========================
                Income
            ========================== */}

            <TooltipRow>

                <TooltipLabel
                    type="income"
                >
                    Income
                </TooltipLabel>

                <TooltipValue>
                    {formatCurrency(
                        income,
                    )}
                </TooltipValue>

            </TooltipRow>


            {/* =========================
                Expenses
            ========================== */}

            <TooltipRow>

                <TooltipLabel
                    type="expense"
                >
                    Expenses
                </TooltipLabel>

                <TooltipValue>
                    {formatCurrency(
                        expenses,
                    )}
                </TooltipValue>

            </TooltipRow>


            {/* =========================
                Balance
            ========================== */}

            <TooltipBalance>

                <TooltipBalanceLabel>
                    Balance
                </TooltipBalanceLabel>

                <TooltipBalanceValue
                    positive={
                        balance >= 0
                    }
                >
                    {formatCurrency(
                        balance,
                    )}
                </TooltipBalanceValue>

            </TooltipBalance>

        </TooltipCard>

    );

};


// =====================================
// Monthly Financial Chart
// =====================================

const MonthlyFinancialChart = ({
    monthly = [],
}) => {

    const theme =
        useTheme();


    // =====================================
    // Chart Data
    // =====================================

    const chartData =
        normalizeMonthlyData(
            monthly,
        );


    // =====================================
    // Empty State
    // =====================================

    if (
        chartData.length === 0
    ) {

        return (

            <Card>

                <Header>

                    <HeaderContent>

                        <Title>
                            Monthly Financial Activity
                        </Title>

                        <Description>
                            Compare church income and expenses over time.
                        </Description>

                    </HeaderContent>

                </Header>


                <EmptyState>

                    <EmptyStateContent>

                        <EmptyStateIcon>

                            <FaChartColumn />

                        </EmptyStateIcon>


                        <EmptyStateTitle>
                            No financial activity
                        </EmptyStateTitle>


                        <EmptyStateText>
                            There is no monthly financial activity available for the selected period.
                        </EmptyStateText>

                    </EmptyStateContent>

                </EmptyState>

            </Card>

        );

    }


    // =====================================
    // Render
    // =====================================

    return (

        <Card>

            <Header>

                <HeaderContent>

                    <Title>
                        Monthly Financial Activity
                    </Title>

                    <Description>
                        Compare church income and expenses over time.
                    </Description>

                </HeaderContent>

            </Header>


            <ChartWrapper>

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart
                        data={
                            chartData
                        }

                        margin={{
                            top: 8,
                            right: 8,
                            left: 0,
                            bottom: 8,
                        }}

                        barGap={6}

                        barCategoryGap="20%"
                    >

                        {/* =========================
                            Grid
                        ========================== */}

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke={
                                theme.colors
                                    .border
                                    .default
                            }
                        />


                        {/* =========================
                            X Axis
                        ========================== */}

                        <XAxis
                            dataKey="name"

                            axisLine={false}

                            tickLine={false}

                            tick={{
                                fontSize: 12,
                                fill:
                                    theme.colors
                                        .text
                                        .secondary,
                            }}
                        />


                        {/* =========================
                            Y Axis
                        ========================== */}

                        <YAxis
                            axisLine={false}

                            tickLine={false}

                            width={70}

                            tick={{
                                fontSize: 12,
                                fill:
                                    theme.colors
                                        .text
                                        .secondary,
                            }}

                            tickFormatter={
                                formatAxisValue
                            }
                        />


                        {/* =========================
                            Tooltip
                        ========================== */}

                        <Tooltip
                            content={
                                <CustomTooltip />
                            }

                            cursor={{
                                fill:
                                    theme.colors
                                        .primary
                                        .main,

                                fillOpacity: 0.04,
                            }}
                        />


                        {/* =========================
                            Legend
                        ========================== */}

                        <Legend />


                        {/* =========================
                            Income
                        ========================== */}

                        <Bar
                            dataKey="income"

                            name="Income"

                            fill={
                                theme.colors
                                    .status
                                    .success
                            }

                            radius={[
                                5,
                                5,
                                0,
                                0,
                            ]}

                            maxBarSize={42}
                        />


                        {/* =========================
                            Expenses
                        ========================== */}

                        <Bar
                            dataKey="expenses"

                            name="Expenses"

                            fill={
                                theme.colors
                                    .status
                                    .danger
                            }

                            radius={[
                                5,
                                5,
                                0,
                                0,
                            ]}

                            maxBarSize={42}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </ChartWrapper>

        </Card>

    );

};


export default MonthlyFinancialChart;