import {
    FaTimes,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaCreditCard,
    FaChurch,
    FaUser,
    FaFileAlt,
} from "react-icons/fa";

import Button from "../../../components/ui/Button/Button";


const getOfferingTypeLabel = (
    type,
) => {

    const labels = {
        OFFERING: "Offering",
        TITHE: "Tithe",
        DONATION: "Donation",
        SPECIAL_SEED: "Special Seed",
        OTHER: "Other",
    };

    return labels[type] || "Other";
};


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

    return labels[category] || "Other";
};


const getPaymentMethodLabel = (
    method,
) => {

    const labels = {
        CASH: "Cash",
        TRANSFER: "Transfer",
        CARD: "Card",
        ONLINE: "Online",
        OTHER: "Other",
    };

    return labels[method] || "Other";
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
            month: "long",
            year: "numeric",
        },
    );

};


const getRecordedBy = (
    transaction,
) => {

    const user =
        transaction?.recordedBy;

    if (!user) {
        return "-";
    }

    return (
        `${user.firstName || ""} ${user.lastName || ""
            }`.trim() ||
        user.email ||
        "-"
    );

};


const TransactionDetailsModal = ({
    isOpen,
    onClose,
    transaction,
}) => {

    if (
        !isOpen ||
        !transaction
    ) {

        return null;

    }


    const isExpense =
        Boolean(
            transaction.category,
        );


    const typeLabel = isExpense
        ? getCategoryLabel(
            transaction.category,
        )
        : getOfferingTypeLabel(
            transaction.type,
        );


    const date = isExpense
        ? transaction.expenseDate
        : transaction.transactionDate;


    const serviceName =
        transaction.serviceId?.title ||
        "-";


    const description =
        transaction.description ||
        "-";


    const notes =
        transaction.notes ||
        "-";


    return (

        <div
            onMouseDown={(
                event,
            ) => {

                if (
                    event.target ===
                    event.currentTarget
                ) {

                    onClose?.();

                }

            }}
            style={{
                position: "fixed",

                inset: 0,

                zIndex: 1100,

                background:
                    "rgba(0, 0, 0, 0.45)",

                display: "flex",

                alignItems: "center",

                justifyContent:
                    "center",

                padding: "20px",
            }}
        >

            <div
                style={{
                    width: "100%",

                    maxWidth: "560px",

                    maxHeight: "90vh",

                    overflowY: "auto",

                    background: "#fff",

                    borderRadius: "14px",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.2)",
                }}
            >

                {/* =================================
                    Header
                ================================== */}

                <div
                    style={{
                        display: "flex",

                        alignItems:
                            "flex-start",

                        justifyContent:
                            "space-between",

                        padding:
                            "22px 24px",

                        borderBottom:
                            "1px solid #eee",
                    }}
                >

                    <div>

                        <p
                            style={{
                                margin: 0,

                                fontSize:
                                    "13px",

                                color:
                                    "#777",

                                marginBottom:
                                    "5px",
                            }}
                        >

                            Financial Transaction

                        </p>


                        <h2
                            style={{
                                margin: 0,

                                fontSize:
                                    "22px",
                            }}
                        >

                            {isExpense
                                ? transaction.title ||
                                "Expense"
                                : typeLabel}

                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={
                            onClose
                        }
                        style={{
                            width:
                                "34px",

                            height:
                                "34px",

                            border: "none",

                            borderRadius:
                                "8px",

                            background:
                                "#f3f4f6",

                            display:
                                "flex",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",

                            cursor:
                                "pointer",

                            fontSize:
                                "15px",
                        }}
                    >

                        <FaTimes />

                    </button>

                </div>


                {/* =================================
                    Amount
                ================================== */}

                <div
                    style={{
                        padding:
                            "24px",

                        background:
                            isExpense
                                ? "#fff7f7"
                                : "#f5fbf7",

                        borderBottom:
                            "1px solid #eee",
                    }}
                >

                    <div
                        style={{
                            display:
                                "flex",

                            alignItems:
                                "center",

                            gap:
                                "12px",
                        }}
                    >

                        <div
                            style={{
                                width:
                                    "44px",

                                height:
                                    "44px",

                                borderRadius:
                                    "12px",

                                display:
                                    "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                background:
                                    isExpense
                                        ? "#fee2e2"
                                        : "#dcfce7",

                                color:
                                    isExpense
                                        ? "#dc2626"
                                        : "#16a34a",
                            }}
                        >

                            <FaMoneyBillWave />

                        </div>


                        <div>

                            <p
                                style={{
                                    margin: 0,

                                    fontSize:
                                        "13px",

                                    color:
                                        "#777",
                                }}
                            >

                                {isExpense
                                    ? "Expense Amount"
                                    : "Amount Received"}

                            </p>


                            <h1
                                style={{
                                    margin:
                                        "3px 0 0",

                                    fontSize:
                                        "30px",
                                }}
                            >

                                {formatCurrency(
                                    transaction.amount,
                                )}

                            </h1>

                        </div>

                    </div>

                </div>


                {/* =================================
                    Details
                ================================== */}

                <div
                    style={{
                        padding:
                            "24px",
                    }}
                >

                    <div
                        style={{
                            display:
                                "grid",

                            gridTemplateColumns:
                                "1fr 1fr",

                            gap:
                                "18px",
                        }}
                    >

                        {/* Date */}

                        <div>

                            <DetailLabel
                                icon={
                                    <FaCalendarAlt />
                                }
                                label="Date"
                            />

                            <DetailValue>
                                {formatDate(
                                    date,
                                )}
                            </DetailValue>

                        </div>


                        {/* Type / Category */}

                        <div>

                            <DetailLabel
                                icon={
                                    <FaFileAlt />
                                }
                                label={
                                    isExpense
                                        ? "Category"
                                        : "Type"
                                }
                            />

                            <DetailValue>
                                {typeLabel}
                            </DetailValue>

                        </div>


                        {/* Payment */}

                        <div>

                            <DetailLabel
                                icon={
                                    <FaCreditCard />
                                }
                                label="Payment Method"
                            />

                            <DetailValue>
                                {
                                    getPaymentMethodLabel(
                                        transaction.paymentMethod,
                                    )
                                }
                            </DetailValue>

                        </div>


                        {/* Service */}

                        <div>

                            <DetailLabel
                                icon={
                                    <FaChurch />
                                }
                                label="Service"
                            />

                            <DetailValue>
                                {
                                    serviceName
                                }
                            </DetailValue>

                        </div>


                        {/* Recorded By */}

                        <div
                            style={{
                                gridColumn:
                                    "1 / -1",
                            }}
                        >

                            <DetailLabel
                                icon={
                                    <FaUser />
                                }
                                label="Recorded By"
                            />

                            <DetailValue>
                                {
                                    getRecordedBy(
                                        transaction,
                                    )
                                }
                            </DetailValue>

                        </div>


                        {/* Description */}

                        {isExpense && (

                            <div
                                style={{
                                    gridColumn:
                                        "1 / -1",
                                }}
                            >

                                <DetailLabel
                                    icon={
                                        <FaFileAlt />
                                    }
                                    label="Description"
                                />

                                <DetailValue>
                                    {
                                        description
                                    }
                                </DetailValue>

                            </div>

                        )}


                        {/* Notes */}

                        <div
                            style={{
                                gridColumn:
                                    "1 / -1",
                            }}
                        >

                            <DetailLabel
                                icon={
                                    <FaFileAlt />
                                }
                                label="Notes"
                            />

                            <DetailValue>
                                {notes}
                            </DetailValue>

                        </div>

                    </div>

                </div>


                {/* =================================
                    Footer
                ================================== */}

                <div
                    style={{
                        display:
                            "flex",

                        justifyContent:
                            "flex-end",

                        padding:
                            "16px 24px",

                        borderTop:
                            "1px solid #eee",
                    }}
                >

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={
                            onClose
                        }
                    >

                        Close

                    </Button>

                </div>

            </div>

        </div>

    );

};


// =====================================
// Small Internal Components
// =====================================

const DetailLabel = ({
    icon,
    label,
}) => (

    <div
        style={{
            display:
                "flex",

            alignItems:
                "center",

            gap:
                "7px",

            marginBottom:
                "6px",

            color:
                "#777",

            fontSize:
                "12px",

            fontWeight:
                600,

            textTransform:
                "uppercase",
        }}
    >

        {icon}

        {label}

    </div>

);


const DetailValue = ({
    children,
}) => (

    <div
        style={{
            fontSize:
                "14px",

            fontWeight:
                600,

            color:
                "#222",

            lineHeight:
                1.5,
        }}
    >

        {children}

    </div>

);


export default TransactionDetailsModal;