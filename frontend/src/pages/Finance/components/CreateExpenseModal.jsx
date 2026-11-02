import {
  useEffect,
  useState,
} from "react";

import Button from "../../../components/ui/Button/Button";


// =====================================
// Constants
// =====================================

const INITIAL_FORM = {
  title: "",
  description: "",
  category: "OTHER",
  amount: "",
  paymentMethod: "CASH",
  serviceId: "",
  expenseDate: "",
  notes: "",
};


// =====================================
// Component
// =====================================

const CreateExpenseModal = ({
  isOpen,
  onClose,
  onSubmit,
  services = [],
}) => {

  // =====================================
  // Form State
  // =====================================

  const [
    form,
    setForm,
  ] = useState(
    INITIAL_FORM,
  );


  // =====================================
  // Submission State
  // =====================================

  const [
    submitting,
    setSubmitting,
  ] = useState(false);


  // =====================================
  // Error State
  // =====================================

  const [
    error,
    setError,
  ] = useState("");


  // =====================================
  // Reset Form
  // =====================================

  useEffect(() => {

    if (!isOpen) {

      setForm(
        INITIAL_FORM,
      );

      setError("");

      setSubmitting(false);

    }

  }, [isOpen]);


  // =====================================
  // Handle Input
  // =====================================

  const handleChange = (
    event,
  ) => {

    const {
      name,
      value,
    } = event.target;


    setForm(
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

    if (!form.title.trim()) {

      setError(
        "Expense title is required.",
      );

      return;

    }


    if (
      !form.amount ||
      Number(form.amount) <= 0
    ) {

      setError(
        "Enter a valid expense amount.",
      );

      return;

    }


    try {

      setSubmitting(true);


      // =================================
      // Payload
      // =================================

      const payload = {

        title:
          form.title.trim(),

        description:
          form.description.trim(),

        category:
          form.category,

        amount:
          Number(
            form.amount,
          ),

        paymentMethod:
          form.paymentMethod,

        serviceId:
          form.serviceId ||
          null,

        expenseDate:
          form.expenseDate ||
          undefined,

        notes:
          form.notes.trim(),

      };


      console.log(
        "========== CREATE EXPENSE ==========",
      );

      console.log(
        "EXPENSE PAYLOAD:",
        payload,
      );


      await onSubmit(
        payload,
      );


      // =================================
      // Close After Success
      // =================================

      setForm(
        INITIAL_FORM,
      );

      onClose?.();

    } catch (err) {

      console.error(
        "CREATE EXPENSE FAILED:",
        err,
      );


      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to record expense.",
      );

    } finally {

      setSubmitting(false);

    }

  };


  // =====================================
  // Don't Render
  // =====================================

  if (!isOpen) {

    return null;

  }


  // =====================================
  // Render
  // =====================================

  return (

    <div
      style={{
        position: "fixed",

        inset: 0,

        background:
          "rgba(0, 0, 0, 0.45)",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        padding: "20px",

        zIndex: 1000,
      }}
    >

      <div
        style={{
          width: "100%",

          maxWidth: "600px",

          maxHeight: "90vh",

          overflowY: "auto",

          background: "#fff",

          borderRadius: "12px",

          padding: "24px",

          boxShadow:
            "0 20px 50px rgba(0,0,0,0.2)",
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

            marginBottom: "24px",
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,

                fontSize: "22px",
              }}
            >

              Record Expense

            </h2>

            <p
              style={{
                margin:
                  "6px 0 0",

                color:
                  "#666",

                fontSize:
                  "14px",
              }}
            >

              Record money spent by the church.

            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            style={{
              border: "none",

              background:
                "transparent",

              fontSize: "24px",

              cursor:
                submitting
                  ? "not-allowed"
                  : "pointer",

              color: "#666",
            }}
          >

            ×

          </button>

        </div>


        {/* =================================
                    Error
                ================================== */}

        {error && (

          <div
            style={{
              marginBottom:
                "18px",

              padding:
                "12px 14px",

              borderRadius:
                "8px",

              background:
                "#fee2e2",

              color:
                "#991b1b",

              fontSize:
                "14px",
            }}
          >

            {error}

          </div>

        )}


        {/* =================================
                    Form
                ================================== */}

        <form
          onSubmit={
            handleSubmit
          }
        >

          {/* =================================
                        Expense Title
                    ================================== */}

          <div
            style={{
              marginBottom:
                "16px",
            }}
          >

            <label
              htmlFor="expense-title"
              style={{
                display:
                  "block",

                marginBottom:
                  "7px",

                fontWeight:
                  600,

                fontSize:
                  "14px",
              }}
            >

              Expense Title

            </label>

            <input
              id="expense-title"
              name="title"
              type="text"
              value={
                form.title
              }
              onChange={
                handleChange
              }
              placeholder="e.g. Electricity bill"
              disabled={
                submitting
              }
              style={{
                width: "100%",

                padding:
                  "11px 12px",

                border:
                  "1px solid #ddd",

                borderRadius:
                  "8px",

                boxSizing:
                  "border-box",
              }}
            />

          </div>


          {/* =================================
                        Description
                    ================================== */}

          <div
            style={{
              marginBottom:
                "16px",
            }}
          >

            <label
              htmlFor="expense-description"
              style={{
                display:
                  "block",

                marginBottom:
                  "7px",

                fontWeight:
                  600,

                fontSize:
                  "14px",
              }}
            >

              Description

            </label>

            <textarea
              id="expense-description"
              name="description"
              value={
                form.description
              }
              onChange={
                handleChange
              }
              placeholder="Add more details about this expense"
              rows={3}
              disabled={
                submitting
              }
              style={{
                width: "100%",

                padding:
                  "11px 12px",

                border:
                  "1px solid #ddd",

                borderRadius:
                  "8px",

                boxSizing:
                  "border-box",

                resize:
                  "vertical",
              }}
            />

          </div>


          {/* =================================
                        Category + Amount
                    ================================== */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "1fr 1fr",

              gap: "16px",

              marginBottom:
                "16px",
            }}
          >

            {/* Category */}

            <div>

              <label
                htmlFor="expense-category"
                style={{
                  display:
                    "block",

                  marginBottom:
                    "7px",

                  fontWeight:
                    600,

                  fontSize:
                    "14px",
                }}
              >

                Category

              </label>

              <select
                id="expense-category"
                name="category"
                value={
                  form.category
                }
                onChange={
                  handleChange
                }
                disabled={
                  submitting
                }
                style={{
                  width: "100%",

                  padding:
                    "11px 12px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

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


            {/* Amount */}

            <div>

              <label
                htmlFor="expense-amount"
                style={{
                  display:
                    "block",

                  marginBottom:
                    "7px",

                  fontWeight:
                    600,

                  fontSize:
                    "14px",
                }}
              >

                Amount

              </label>

              <input
                id="expense-amount"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                value={
                  form.amount
                }
                onChange={
                  handleChange
                }
                placeholder="0"
                disabled={
                  submitting
                }
                style={{
                  width: "100%",

                  padding:
                    "11px 12px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

                  boxSizing:
                    "border-box",
                }}
              />

            </div>

          </div>


          {/* =================================
                        Payment + Service
                    ================================== */}

          <div
            style={{
              display: "grid",

              gridTemplateColumns:
                "1fr 1fr",

              gap: "16px",

              marginBottom:
                "16px",
            }}
          >

            {/* Payment */}

            <div>

              <label
                htmlFor="expense-payment"
                style={{
                  display:
                    "block",

                  marginBottom:
                    "7px",

                  fontWeight:
                    600,

                  fontSize:
                    "14px",
                }}
              >

                Payment Method

              </label>

              <select
                id="expense-payment"
                name="paymentMethod"
                value={
                  form.paymentMethod
                }
                onChange={
                  handleChange
                }
                disabled={
                  submitting
                }
                style={{
                  width: "100%",

                  padding:
                    "11px 12px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

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
                htmlFor="expense-service"
                style={{
                  display:
                    "block",

                  marginBottom:
                    "7px",

                  fontWeight:
                    600,

                  fontSize:
                    "14px",
                }}
              >

                Service

              </label>

              <select
                id="expense-service"
                name="serviceId"
                value={
                  form.serviceId
                }
                onChange={
                  handleChange
                }
                disabled={
                  submitting
                }
                style={{
                  width: "100%",

                  padding:
                    "11px 12px",

                  border:
                    "1px solid #ddd",

                  borderRadius:
                    "8px",

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

          </div>


          {/* =================================
                        Expense Date
                    ================================== */}

          <div
            style={{
              marginBottom:
                "16px",
            }}
          >

            <label
              htmlFor="expense-date"
              style={{
                display:
                  "block",

                marginBottom:
                  "7px",

                fontWeight:
                  600,

                fontSize:
                  "14px",
              }}
            >

              Expense Date

            </label>

            <input
              id="expense-date"
              name="expenseDate"
              type="date"
              value={
                form.expenseDate
              }
              onChange={
                handleChange
              }
              disabled={
                submitting
              }
              style={{
                width: "100%",

                padding:
                  "11px 12px",

                border:
                  "1px solid #ddd",

                borderRadius:
                  "8px",

                boxSizing:
                  "border-box",
              }}
            />

          </div>


          {/* =================================
                        Notes
                    ================================== */}

          <div
            style={{
              marginBottom:
                "24px",
            }}
          >

            <label
              htmlFor="expense-notes"
              style={{
                display:
                  "block",

                marginBottom:
                  "7px",

                fontWeight:
                  600,

                fontSize:
                  "14px",
              }}
            >

              Notes

            </label>

            <textarea
              id="expense-notes"
              name="notes"
              value={
                form.notes
              }
              onChange={
                handleChange
              }
              placeholder="Optional notes"
              rows={3}
              disabled={
                submitting
              }
              style={{
                width: "100%",

                padding:
                  "11px 12px",

                border:
                  "1px solid #ddd",

                borderRadius:
                  "8px",

                boxSizing:
                  "border-box",

                resize:
                  "vertical",
              }}
            />

          </div>


          {/* =================================
                        Actions
                    ================================== */}

          <div
            style={{
              display: "flex",

              justifyContent:
                "flex-end",

              gap: "10px",
            }}
          >

            <Button
              type="button"
              variant="secondary"
              onClick={
                onClose
              }
              disabled={
                submitting
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
                ? "Recording..."
                : "Record Expense"}

            </Button>

          </div>

        </form>

      </div>

    </div>

  );

};


export default CreateExpenseModal;