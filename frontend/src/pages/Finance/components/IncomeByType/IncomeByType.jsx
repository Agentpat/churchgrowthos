import {
    FaChartPie,
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
    ItemName,
    ItemTransactions,
    ItemAmount,
    ProgressTrack,
    ProgressBar,
    EmptyState,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateText,
} from "./IncomeByType.styles";


// =====================================
// Labels
// =====================================

const TYPE_LABELS = {
    OFFERING: "Offering",
    TITHE: "Tithe",
    DONATION: "Donation",
    SPECIAL_SEED: "Special Seed",
    OTHER: "Other",
};


// =====================================
// Get Type Label
// =====================================

const getTypeLabel = (
    type,
) => {

    return (
        TYPE_LABELS[type] ||
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

const normalizeData = (
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

                type:
                    item?.type ||
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


    const total =
        normalized.reduce(
            (
                sum,
                item,
            ) =>
                sum +
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
                    total > 0
                        ? (
                            item.amount /
                            total
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
// Income By Type
// =====================================

const IncomeByType = ({
    data = [],
}) => {

    const breakdown =
        normalizeData(
            data,
        );


    // =====================================
    // Empty State
    // =====================================

    if (
        breakdown.length === 0
    ) {

        return (

            <Card>

                <Header>

                    <HeaderContent>

                        <Title>
                            Income by Type
                        </Title>

                        <Description>
                            See where church income is coming from.
                        </Description>

                    </HeaderContent>

                </Header>


                <EmptyState>

                    <EmptyStateIcon>
                        <FaChartPie />
                    </EmptyStateIcon>


                    <EmptyStateTitle>
                        No income data
                    </EmptyStateTitle>


                    <EmptyStateText>
                        There is no income breakdown available for the selected period.
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
                        Income by Type
                    </Title>

                    <Description>
                        See where church income is coming from.
                    </Description>

                </HeaderContent>

            </Header>


            <Content>

                <BreakdownList>

                    {breakdown.map(
                        (
                            item,
                        ) => (

                            <BreakdownItem
                                key={
                                    item.type
                                }
                            >

                                <ItemHeader>

                                    <ItemInfo>

                                        <ItemIcon>
                                            <FaChartPie />
                                        </ItemIcon>


                                        <div>

                                            <ItemName>
                                                {
                                                    getTypeLabel(
                                                        item.type,
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

                                        </div>

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


export default IncomeByType;