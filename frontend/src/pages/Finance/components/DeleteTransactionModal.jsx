import {
    FaTimes,
    FaTrash,
    FaExclamationTriangle,
} from "react-icons/fa";

import Button from "../../../components/ui/Button/Button";


const formatCurrency = (
    amount,
) => {

    return `₦${Number(
        amount || 0,
    ).toLocaleString("en-NG")}`;

};


const DeleteTransactionModal = ({
    isOpen,
    transaction,
    type = "offering",
    onClose,
    onConfirm,
}) => {

    // =====================================
    // Don't Render
    // =====================================

    if (
        !isOpen ||
        !transaction
    ) {
        return null;
    }


    // =====================================
    // Transaction Type
    // =====================================

    const isExpense =
        type === "expense";


    const transactionName =
        isExpense
            ? transaction.title ||
            "Expense"
            : transaction.type === "TITHE"
                ? "Tithe"
                : transaction.type ===
                    "DONATION"
                    ? "Donation"
                    : transaction.type ===
                        "SPECIAL_SEED"
                        ? "Special Seed"
                        : transaction.type ===
                            "OTHER"
                            ? "Other"
                            : "Offering";


    // =====================================
    // Render
    // =====================================

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

                zIndex: 1300,

                background:
                    "rgba(0, 0, 0, 0.45)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                padding: "20px",
            }}
        >

            <div
                style={{
                    width: "100%",

                    maxWidth: "460px",

                    background: "#fff",

                    borderRadius: "14px",

                    boxShadow:
                        "0 20px 60px rgba(0,0,0,0.2)",

                    overflow: "hidden",
                }}
            >

                {/* =================================
                    Header
                ================================== */}

                <div
                    style={{
                        display: "flex",

                        alignItems: "center",

                        justifyContent:
                            "space-between",

                        padding:
                            "20px 24px",

                        borderBottom:
                            "1px solid #eee",
                    }}
                >

                    <div
                        style={{
                            display: "flex",

                            alignItems: "center",

                            gap: "12px",
                        }}
                    >

                        <div
                            style={{
                                width: "40px",

                                height: "40px",

                                borderRadius:
                                    "10px",

                                display: "flex",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                background:
                                    "#fef2f2",

                                color:
                                    "#dc2626",
                            }}
                        >

                            <FaTrash />

                        </div>


                        <h2
                            style={{
                                margin: 0,

                                fontSize:
                                    "20px",
                            }}
                        >

                            Delete Transaction

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

                            border:
                                "none",

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

                            color:
                                "#555",
                        }}
                    >

                        <FaTimes />

                    </button>

                </div>


                {/* =================================
                    Content
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
                                "flex",

                            gap:
                                "12px",

                            padding:
                                "14px",

                            marginBottom:
                                "20px",

                            borderRadius:
                                "10px",

                            background:
                                "#fff7ed",

                            border:
                                "1px solid #fed7aa",
                        }}
                    >

                        <FaExclamationTriangle
                            style={{
                                color:
                                    "#ea580c",

                                marginTop:
                                    "2px",

                                flexShrink:
                                    0,
                            }}
                        />


                        <div>

                            <strong
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "4px",

                                    fontSize:
                                        "14px",
                                }}
                            >

                                Are you sure?

                            </strong>


                            <p
                                style={{
                                    margin: 0,

                                    fontSize:
                                        "13px",

                                    lineHeight:
                                        1.5,

                                    color:
                                        "#666",
                                }}
                            >

                                This financial record
                                will be removed from
                                the active financial
                                records.

                            </p>

                        </div>

                    </div>


                    {/* =================================
                        Transaction Preview
                    ================================== */}

                    <div
                        style={{
                            padding:
                                "16px",

                            border:
                                "1px solid #e5e7eb",

                            borderRadius:
                                "10px",

                            background:
                                "#fafafa",
                        }}
                    >

                        <div
                            style={{
                                display:
                                    "flex",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center",

                                marginBottom:
                                    "10px",
                            }}
                        >

                            <span
                                style={{
                                    fontSize:
                                        "13px",

                                    color:
                                        "#777",
                                }}
                            >

                                Transaction

                            </span>


                            <strong
                                style={{
                                    fontSize:
                                        "14px",
                                }}
                            >

                                {
                                    transactionName
                                }

                            </strong>

                        </div>


                        <div
                            style={{
                                display:
                                    "flex",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center",
                            }}
                        >

                            <span
                                style={{
                                    fontSize:
                                        "13px",

                                    color:
                                        "#777",
                                }}
                            >

                                Amount

                            </span>


                            <strong
                                style={{
                                    fontSize:
                                        "18px",

                                    color:
                                        isExpense
                                            ? "#dc2626"
                                            : "#16a34a",
                                }}
                            >

                                {
                                    formatCurrency(
                                        transaction.amount,
                                    )
                                }

                            </strong>

                        </div>

                    </div>


                    <p
                        style={{
                            margin:
                                "16px 0 0",

                            fontSize:
                                "13px",

                            color:
                                "#777",

                            lineHeight:
                                1.5,
                        }}
                    >

                        This action uses a soft delete.
                        The record will not be physically
                        removed from the database.

                    </p>

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

                        gap:
                            "10px",

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

                        Cancel

                    </Button>


                    <Button
                        type="button"
                        variant="danger"
                        onClick={
                            onConfirm
                        }
                    >

                        <FaTrash />

                        Delete

                    </Button>

                </div>

            </div>

        </div>

    );

};


export default DeleteTransactionModal;