import {
    useEffect,
    useState,
} from "react";

import {
    FaTimes,
    FaMoneyBillWave,
} from "react-icons/fa";

import Button from "../../../components/ui/Button/Button";


const EditOfferingModal = ({
    isOpen,
    offering,
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
        amount: "",
        type: "OFFERING",
        paymentMethod: "CASH",
        transactionDate: "",
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
            !offering ||
            !isOpen
        ) {
            return;
        }


        let formattedDate = "";


        if (
            offering.transactionDate
        ) {

            const date =
                new Date(
                    offering.transactionDate,
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
                offering.serviceId?._id ||
                offering.serviceId ||
                "",

            amount:
                offering.amount ??
                "",

            type:
                offering.type ||
                "OFFERING",

            paymentMethod:
                offering.paymentMethod ||
                "CASH",

            transactionDate:
                formattedDate,

            notes:
                offering.notes ||
                "",

        });


        setError("");

    }, [
        offering,
        isOpen,
    ]);


    // =====================================
    // Input Change
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


        // ---------------------------------
        // Validation
        // ---------------------------------

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
            !formData.type
        ) {

            setError(
                "Please select an offering type.",
            );

            return;

        }


        if (
            !formData.paymentMethod
        ) {

            setError(
                "Please select a payment method.",
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

                amount:
                    Number(
                        formData.amount,
                    ),

                type:
                    formData.type,

                paymentMethod:
                    formData.paymentMethod,

                transactionDate:
                    formData.transactionDate
                        ? new Date(
                            `${formData.transactionDate}T00:00:00`,
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
                "UPDATE OFFERING FAILED:",
                err,
            );


            setError(
                err?.response?.data?.message ||
                err?.message ||
                "Unable to update offering.",
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
        !offering
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
                                    "#ecfdf3",

                                color:
                                    "#16a34a",
                            }}
                        >

                            <FaMoneyBillWave />

                        </div>


                        <div>

                            <h2
                                style={{
                                    margin: 0,

                                    fontSize:
                                        "20px",
                                }}
                            >

                                Edit Offering

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

                                Correct this financial record.

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
                                submitting
                                    ? "not-allowed"
                                    : "pointer",
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


                        {/* Amount */}

                        <div>

                            <label
                                htmlFor="edit-offering-amount"
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
                                id="edit-offering-amount"
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


                        {/* Service */}

                        <div>

                            <label
                                htmlFor="edit-offering-service"
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
                                id="edit-offering-service"
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


                        {/* Type */}

                        <div>

                            <label
                                htmlFor="edit-offering-type"
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

                                Offering Type

                            </label>


                            <select
                                id="edit-offering-type"
                                name="type"
                                value={
                                    formData.type
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

                                <option value="OFFERING">
                                    Offering
                                </option>

                                <option value="TITHE">
                                    Tithe
                                </option>

                                <option value="DONATION">
                                    Donation
                                </option>

                                <option value="SPECIAL_SEED">
                                    Special Seed
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* Payment Method */}

                        <div>

                            <label
                                htmlFor="edit-offering-payment"
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
                                id="edit-offering-payment"
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

                                <option value="ONLINE">
                                    Online
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>


                        {/* Transaction Date */}

                        <div>

                            <label
                                htmlFor="edit-offering-date"
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

                                Transaction Date

                            </label>


                            <input
                                id="edit-offering-date"
                                name="transactionDate"
                                type="date"
                                value={
                                    formData.transactionDate
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


                        {/* Notes */}

                        <div>

                            <label
                                htmlFor="edit-offering-notes"
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
                                id="edit-offering-notes"
                                name="notes"
                                value={
                                    formData.notes
                                }
                                onChange={
                                    handleChange
                                }
                                rows="4"
                                placeholder="Add notes about this transaction..."
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


export default EditOfferingModal;