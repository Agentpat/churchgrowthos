import {
    FaReceipt,
} from "react-icons/fa";

import {
    Card,
    Header,
    HeaderContent,
    Title,
    Description,
    Content,
    BreakdownList,
    BreakdownItem,
    ItemHeader,
    ItemInfo,
    ItemIcon,
    ItemDetails,
    ItemName,
    ItemTransactions,
    ItemAmount,
    ProgressTrack,
    ProgressBar,
    EmptyState,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateText,
} from "./ExpensesByCategory.styles";


// =====================================
// Expense Category Labels
// =====================================

const EXPENSE_CATEGORY_LABELS = {
    SALARY: "Salary",
    RENT: "Rent",
    UTILITY: "Utility",
    EVENT: "Event",
    EQUIPMENT: "Equipment",
    TRANSPORT: "Transport",
    MAINTENANCE: "Maintenance",
    OTHER: "Other",
};


// =====================================
// Get Category Label
// =====================================

const getCategoryLabel = (
    category,
) => {

    return (
        EXPENSE_CATEGORY_LABELS[
        category
        ] ||
        "Other"
    );

};


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
// Normalize Data
// =====================================

const normalizeExpenseData = (
    data,
) => {

    if (
        !Array.isArray(
            data,
        )
    ) {
        return [];
    }


    const normalized =
        data.map(
            (
                item,
            ) => ({

                category:
                    item?.category ||
                    "OTHER",

                amount:
                    Number(
                        item?.amount,
                    ) || 0,

                transactions:
                    Number(
                        item?.transactions,
                    ) || 0,

            }),
        );


    const totalExpenses =
        normalized.reduce(
            (
                total,
                item,
            ) =>
                total +
                item.amount,
            0,
        );


    return normalized
        .map(
            (
                item,
            ) => ({

                ...item,

                percentage:
                    totalExpenses > 0
                        ? (
                            item.amount /
                            totalExpenses
                        ) * 100
                        : 0,

            }),
        )
        .sort(
            (
                a,
                b,
            ) =>
                b.amount -
                a.amount,
        );

};


// =====================================
// Expenses By Category
// =====================================

const ExpensesByCategory = ({
    data = [],
}) => {

    const expenseData =
        normalizeExpenseData(
            data,
        );


    // =====================================
    // Empty State
    // =====================================

    if (
        expenseData.length === 0
    ) {

        return (

            <Card>

                <Header>

                    <HeaderContent>

                        <Title>
                            Expenses by Category
                        </Title>

                        <Description>
                            See where church funds are being spent.
                        </Description>

                    </HeaderContent>

                </Header>


                <EmptyState>

                    <EmptyStateIcon>
                        <FaReceipt />
                    </EmptyStateIcon>


                    <EmptyStateTitle>
                        No expense data
                    </EmptyStateTitle>


                    <EmptyStateText>
                        There is no expense breakdown available for the selected period.
                    </EmptyStateText>

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
                        Expenses by Category
                    </Title>

                    <Description>
                        See where church funds are being spent.
                    </Description>

                </HeaderContent>

            </Header>


            <Content>

                <BreakdownList>

                    {expenseData.map(
                        (
                            item,
                        ) => (

                            <BreakdownItem
                                key={
                                    item.category
                                }
                            >

                                <ItemHeader>

                                    <ItemInfo>

                                        <ItemIcon>
                                            <FaReceipt />
                                        </ItemIcon>


                                        <ItemDetails>

                                            <ItemName>
                                                {
                                                    getCategoryLabel(
                                                        item.category,
                                                    )
                                                }
                                            </ItemName>


                                            <ItemTransactions>
                                                {
                                                    item.transactions
                                                }{" "}
                                                transaction
                                                {
                                                    item.transactions ===
                                                        1
                                                        ? ""
                                                        : "s"
                                                }
                                            </ItemTransactions>

                                        </ItemDetails>

                                    </ItemInfo>


                                    <ItemAmount>
                                        {
                                            formatCurrency(
                                                item.amount,
                                            )
                                        }
                                    </ItemAmount>

                                </ItemHeader>


                                <ProgressTrack>

                                    <ProgressBar
                                        percentage={
                                            item.percentage
                                        }
                                    />

                                </ProgressTrack>

                            </BreakdownItem>

                        ),
                    )}

                </BreakdownList>

            </Content>

        </Card>

    );

};


export default ExpensesByCategory;