import {
    useEffect,
    useState,
} from "react";

import {
    FaTimes,
    FaReceipt,
} from "react-icons/fa";

import Button from "../../../components/ui/Button/Button";


const EditExpenseModal = ({
    isOpen,
    expense,
    services = [],
    onClose,
    onSubmit,
}) => {

    // =====================================
    // Form State
    // =====================================

    const [
        formData,
        setFormData,
    ] = useState({
        serviceId: "",
        title: "",
        description: "",
        category: "OTHER",
        amount: "",
        paymentMethod: "CASH",
        expenseDate: "",
        notes: "",
    });


    const [
        submitting,
        setSubmitting,
    ] = useState(false);


    const [
        error,
        setError,
    ] = useState("");


    // =====================================
    // Populate Form
    // =====================================

    useEffect(() => {

        if (
            !expense ||
            !isOpen
        ) {
            return;
        }


        let formattedDate = "";


        if (
            expense.expenseDate
        ) {

            const date =
                new Date(
                    expense.expenseDate,
                );


            if (
                !Number.isNaN(
                    date.getTime(),
                )
            ) {

                formattedDate =
                    date
                        .toISOString()
                        .split("T")[0];

            }

        }


        setFormData({

            serviceId:
                expense.serviceId?._id ||
                expense.serviceId ||
                "",

            title:
                expense.title ||
                "",

            description:
                expense.description ||
                "",

            category:
                expense.category ||
                "OTHER",

            amount:
                expense.amount ??
                "",

            paymentMethod:
                expense.paymentMethod ||
                "CASH",

            expenseDate:
                formattedDate,

            notes:
                expense.notes ||
                "",

        });


        setError("");

    }, [
        expense,
        isOpen,
    ]);


    // =====================================
    // Change Handler
    // =====================================

    const handleChange = (
        event,
    ) => {

        const {
            name,
            value,
        } = event.target;


        setFormData(
            (previous) => ({
                ...previous,

                [name]: value,
            }),
        );

    };


    // =====================================
    // Submit
    // =====================================

    const handleSubmit = async (
        event,
    ) => {

        event.preventDefault();

        setError("");


        // =================================
        // Validation
        // =================================

        if (
            !formData.title.trim()
        ) {

            setError(
                "Expense title is required.",
            );

            return;

        }


        if (
            !formData.amount ||
            Number(formData.amount) <= 0
        ) {

            setError(
                "Please enter a valid amount.",
            );

            return;

        }


        if (
            !formData.category
        ) {

            setError(
                "Please select an expense category.",
            );

            return;

        }


        try {

            setSubmitting(
                true,
            );


            const payload = {

                serviceId:
                    formData.serviceId ||
                    null,

                title:
                    formData.title.trim(),

                description:
                    formData.description.trim(),

                category:
                    formData.category,

                amount:
                    Number(
                        formData.amount,
                    ),

                paymentMethod:
                    formData.paymentMethod,

                expenseDate:
                    formData.expenseDate
                        ? new Date(
                            `${formData.expenseDate}T00:00:00`,
                        ).toISOString()
                        : undefined,

                notes:
                    formData.notes.trim(),

            };


            await onSubmit?.(
                payload,
            );

        } catch (
        err
        ) {

            console.error(
                "UPDATE EXPENSE FAILED:",
                err,
            );


            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to update expense.",
            );

        } finally {

            setSubmitting(
                false,
            );

        }

    };


    // =====================================
    // Close
    // =====================================

    const handleClose = () => {

        if (
            submitting
        ) {
            return;
        }

        setError("");

        onClose?.();

    };


    // =====================================
    // Don't Render
    // =====================================

    if (
        !isOpen ||
        !expense
    ) {

        return null;

    }


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

                    handleClose();

                }

            }}
            style={{
                position: "fixed",

                inset: 0,

                zIndex: 1200,

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
                                    "#fff7ed",

                                color:
                                    "#ea580c",
                            }}
                        >

                            <FaReceipt />

                        </div>


                        <div>

                            <h2
                                style={{
                                    margin: 0,

                                    fontSize:
                                        "20px",
                                }}
                            >

                                Edit Expense

                            </h2>


                            <p
                                style={{
                                    margin:
                                        "4px 0 0",

                                    fontSize:
                                        "13px",

                                    color:
                                        "#777",
                                }}
                            >

                                Correct this expense record.

                            </p>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={
                            handleClose
                        }
                        disabled={
                            submitting
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
                        }}
                    >

                        <FaTimes />

                    </button>

                </div>


                {/* =================================
                    Form
                ================================== */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <div
                        style={{
                            padding:
                                "24px",

                            display:
                                "flex",

                            flexDirection:
                                "column",

                            gap:
                                "18px",
                        }}
                    >

                        {/* Error */}

                        {error && (

                            <div
                                style={{
                                    padding:
                                        "12px 14px",

                                    borderRadius:
                                        "8px",

                                    background:
                                        "#fef2f2",

                                    color:
                                        "#dc2626",

                                    fontSize:
                                        "14px",
                                }}
                            >

                                {error}

                            </div>

                        )}


                        {/* Title */}

                        <div>

                            <label
                                htmlFor="edit-expense-title"
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "7px",

                                    fontSize:
                                        "14px",

                                    fontWeight:
                                        600,
                                }}
                            >

                                Expense Title

                            </label>


                            <input
                                id="edit-expense-title"
                                name="title"
                                type="text"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. Generator fuel"
                                required
                                disabled={
                                    submitting
                                }
                                style={{
                                    width:
                                        "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "11px 12px",

                                    border:
                                        "1px solid #d1d5db",

                                    borderRadius:
                                        "8px",

                                    fontSize:
                                        "14px",
                                }}
                            />

                        </div>


                        {/* Amount */}

                        <div>

                            <label
                                htmlFor="edit-expense-amount"
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "7px",

                                    fontSize:
                                        "14px",

                                    fontWeight:
                                        600,
                                }}
                            >

                                Amount

                            </label>


                            <input
                                id="edit-expense-amount"
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                    formData.amount
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter amount"
                                required
                                disabled={
                                    submitting
                                }
                                style={{
                                    width:
                                        "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "11px 12px",

                                    border:
                                        "1px solid #d1d5db",

                                    borderRadius:
                                        "8px",

                                    fontSize:
                                        "14px",
                                }}
                            />

                        </div>


                        {/* Category */}

                        <div>

                            <label
                                htmlFor="edit-expense-category"
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "7px",

                                    fontSize:
                                        "14px",

                                    fontWeight:
                                        600,
                                }}
                            >

                                Category

                            </label>


                            <select
                                id="edit-expense-category"
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    submitting
                                }
                                style={{
                                    width:
                                        "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "11px 12px",

                                    border:
                                        "1px solid #d1d5db",

                                    borderRadius:
                                        "8px",

                                    fontSize:
                                        "14px",

                                    background:
                                        "#fff",
                                }}
                            >

                                <option value="SALARY">
                                    Salary
                                </option>

                                <option value="RENT">
                                    Rent
                                </option>

                                <option value="UTILITY">
                                    Utility
                                </option>

                                <option value="EVENT">
                                    Event
                                </option>

                                <option value="EQUIPMENT">
                                    Equipment
                                </option>

                                <option value="TRANSPORT">
                                    Transport
                                </option>

                                <option value="MAINTENANCE">
                                    Maintenance
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* Payment Method */}

                        <div>

                            <label
                                htmlFor="edit-expense-payment"
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "7px",

                                    fontSize:
                                        "14px",

                                    fontWeight:
                                        600,
                                }}
                            >

                                Payment Method

                            </label>


                            <select
                                id="edit-expense-payment"
                                name="paymentMethod"
                                value={
                                    formData.paymentMethod
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    submitting
                                }
                                style={{
                                    width:
                                        "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "11px 12px",

                                    border:
                                        "1px solid #d1d5db",

                                    borderRadius:
                                        "8px",

                                    fontSize:
                                        "14px",

                                    background:
                                        "#fff",
                                }}
                            >

                                <option value="CASH">
                                    Cash
                                </option>

                                <option value="TRANSFER">
                                    Transfer
                                </option>

                                <option value="CARD">
                                    Card
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* Service */}

                        <div>

                            <label
                                htmlFor="edit-expense-service"
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "7px",

                                    fontSize:
                                        "14px",

                                    fontWeight:
                                        600,
                                }}
                            >

                                Service

                            </label>


                            <select
                                id="edit-expense-service"
                                name="serviceId"
                                value={
                                    formData.serviceId
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    submitting
                                }
                                style={{
                                    width:
                                        "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "11px 12px",

                                    border:
                                        "1px solid #d1d5db",

                                    borderRadius:
                                        "8px",

                                    fontSize:
                                        "14px",

                                    background:
                                        "#fff",
                                }}
                            >

                                <option value="">
                                    No service
                                </option>


                                {services.map(
                                    (
                                        service,
                                    ) => (

                                        <option
                                            key={
                                                service._id
                                            }
                                            value={
                                                service._id
                                            }
                                        >

                                            {
                                                service.title
                                            }

                                        </option>

                                    ),
                                )}

                            </select>

                        </div>


                        {/* Expense Date */}

                        <div>

                            <label
                                htmlFor="edit-expense-date"
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "7px",

                                    fontSize:
                                        "14px",

                                    fontWeight:
                                        600,
                                }}
                            >

                                Expense Date

                            </label>


                            <input
                                id="edit-expense-date"
                                name="expenseDate"
                                type="date"
                                value={
                                    formData.expenseDate
                                }
                                onChange={
                                    handleChange
                                }
                                disabled={
                                    submitting
                                }
                                style={{
                                    width:
                                        "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "11px 12px",

                                    border:
                                        "1px solid #d1d5db",

                                    borderRadius:
                                        "8px",

                                    fontSize:
                                        "14px",
                                }}
                            />

                        </div>


                        {/* Description */}

                        <div>

                            <label
                                htmlFor="edit-expense-description"
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "7px",

                                    fontSize:
                                        "14px",

                                    fontWeight:
                                        600,
                                }}
                            >

                                Description

                            </label>


                            <textarea
                                id="edit-expense-description"
                                name="description"
                                value={
                                    formData.description
                                }
                                onChange={
                                    handleChange
                                }
                                rows="3"
                                placeholder="Describe this expense..."
                                disabled={
                                    submitting
                                }
                                style={{
                                    width:
                                        "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "11px 12px",

                                    border:
                                        "1px solid #d1d5db",

                                    borderRadius:
                                        "8px",

                                    fontSize:
                                        "14px",

                                    resize:
                                        "vertical",
                                }}
                            />

                        </div>


                        {/* Notes */}

                        <div>

                            <label
                                htmlFor="edit-expense-notes"
                                style={{
                                    display:
                                        "block",

                                    marginBottom:
                                        "7px",

                                    fontSize:
                                        "14px",

                                    fontWeight:
                                        600,
                                }}
                            >

                                Notes

                            </label>


                            <textarea
                                id="edit-expense-notes"
                                name="notes"
                                value={
                                    formData.notes
                                }
                                onChange={
                                    handleChange
                                }
                                rows="3"
                                placeholder="Add notes..."
                                disabled={
                                    submitting
                                }
                                style={{
                                    width:
                                        "100%",

                                    boxSizing:
                                        "border-box",

                                    padding:
                                        "11px 12px",

                                    border:
                                        "1px solid #d1d5db",

                                    borderRadius:
                                        "8px",

                                    fontSize:
                                        "14px",

                                    resize:
                                        "vertical",
                                }}
                            />

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
                            disabled={
                                submitting
                            }
                            onClick={
                                handleClose
                            }
                        >

                            Cancel

                        </Button>


                        <Button
                            type="submit"
                            disabled={
                                submitting
                            }
                        >

                            {submitting
                                ? "Saving..."
                                : "Save Changes"}

                        </Button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default EditExpenseModal;