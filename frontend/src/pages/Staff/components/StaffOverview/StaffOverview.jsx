import {
    SummaryGrid,
    SummaryCard,
    SummaryCardHeader,
    SummaryLabel,
    SummaryValue,
    SummaryMeta,
    SummaryIndicator,
} from "./StaffOverview.styles";


// =====================================
// Staff Overview
// =====================================

const StaffOverview = ({
    summary = {},
}) => {

    const totalStaff =
        Number(
            summary?.totalStaff,
        ) || 0;

    const activeStaff =
        Number(
            summary?.activeStaff,
        ) || 0;

    const inactiveStaff =
        Number(
            summary?.inactiveStaff,
        ) || 0;


    // =====================================
    // Render
    // =====================================

    return (

        <SummaryGrid>

            {/* =================================
                Total Staff
            ================================= */}

            <SummaryCard>

                <SummaryCardHeader>

                    <SummaryLabel>
                        Total Staff
                    </SummaryLabel>

                    <SummaryIndicator
                        $variant="neutral"
                    >
                        Total
                    </SummaryIndicator>

                </SummaryCardHeader>


                <SummaryValue>
                    {totalStaff.toLocaleString(
                        "en-NG",
                    )}
                </SummaryValue>


                <SummaryMeta>
                    Staff records in your church
                </SummaryMeta>

            </SummaryCard>


            {/* =================================
                Active Staff
            ================================= */}

            <SummaryCard>

                <SummaryCardHeader>

                    <SummaryLabel>
                        Active Staff
                    </SummaryLabel>

                    <SummaryIndicator
                        $variant="success"
                    >
                        Active
                    </SummaryIndicator>

                </SummaryCardHeader>


                <SummaryValue>
                    {activeStaff.toLocaleString(
                        "en-NG",
                    )}
                </SummaryValue>


                <SummaryMeta>
                    Currently active staff
                </SummaryMeta>

            </SummaryCard>


            {/* =================================
                Inactive Staff
            ================================= */}

            <SummaryCard>

                <SummaryCardHeader>

                    <SummaryLabel>
                        Inactive Staff
                    </SummaryLabel>

                    <SummaryIndicator
                        $variant="warning"
                    >
                        Inactive
                    </SummaryIndicator>

                </SummaryCardHeader>


                <SummaryValue>
                    {inactiveStaff.toLocaleString(
                        "en-NG",
                    )}
                </SummaryValue>


                <SummaryMeta>
                    Archived or inactive staff
                </SummaryMeta>

            </SummaryCard>

        </SummaryGrid>

    );

};


export default StaffOverview;