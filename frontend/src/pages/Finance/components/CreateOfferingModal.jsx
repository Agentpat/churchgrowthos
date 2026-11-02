import {
  useEffect,
  useState,
} from "react";

import Modal from "../../../components/ui/Modal/Modal";
import Button from "../../../components/ui/Button/Button";

import {
  Form,
  FieldGroup,
  Field,
  Label,
  Input,
  Select,
  Textarea,
  Actions,
  ErrorMessage,
} from "./CreateOfferingModal.styles";

const initialForm = {
  serviceId: "",
  amount: "",
  type: "OFFERING",
  paymentMethod: "CASH",
  transactionDate: "",
  notes: "",
};

const CreateOfferingModal = ({
  isOpen,
  onClose,
  onSubmit,
  services = [],
}) => {

  const [
    form,
    setForm,
  ] = useState(initialForm);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");


  // =====================================
  // Reset Form
  // =====================================

  useEffect(() => {

    if (isOpen) {

      setForm({
        ...initialForm,

        transactionDate:
          new Date()
            .toISOString()
            .split("T")[0],
      });

      setError("");

    }

  }, [isOpen]);


  // =====================================
  // Handle Change
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


    const amount =
      Number(form.amount);


    if (!form.amount) {

      setError(
        "Amount is required.",
      );

      return;

    }


    if (
      Number.isNaN(amount) ||
      amount <= 0
    ) {

      setError(
        "Enter a valid amount.",
      );

      return;

    }


    try {

      setSubmitting(true);


      const payload = {
        serviceId:
          form.serviceId ||
          undefined,

        amount,

        type:
          form.type,

        paymentMethod:
          form.paymentMethod,

        transactionDate:
          form.transactionDate ||
          undefined,

        notes:
          form.notes.trim(),
      };


      await onSubmit(
        payload,
      );


      onClose?.();

    } catch (err) {

      console.error(
        "FAILED TO CREATE OFFERING:",
        err,
      );

      setError(
        err.response?.data
          ?.message ||
        err.message ||
        "Unable to record offering.",
      );

    } finally {

      setSubmitting(false);

    }

  };


  if (!isOpen) {

    return null;

  }


  return (

    <Modal
      isOpen={isOpen}
      onClose={
        submitting
          ? undefined
          : onClose
      }
      title="Record Offering"
    >

      <Form
        onSubmit={
          handleSubmit
        }
      >

        {/* =================================
                    Error
                ================================== */}

        {error && (

          <ErrorMessage>
            {error}
          </ErrorMessage>

        )}


        {/* =================================
                    Amount
                ================================== */}

        <FieldGroup>

          <Field>

            <Label>
              Amount
            </Label>

            <Input
              type="number"
              name="amount"
              value={
                form.amount
              }
              onChange={
                handleChange
              }
              min="0"
              step="0.01"
              placeholder="Enter amount"
              required
            />

          </Field>

        </FieldGroup>


        {/* =================================
                    Offering Type
                ================================== */}

        <FieldGroup>

          <Field>

            <Label>
              Type
            </Label>

            <Select
              name="type"
              value={
                form.type
              }
              onChange={
                handleChange
              }
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

            </Select>

          </Field>


          <Field>

            <Label>
              Payment Method
            </Label>

            <Select
              name="paymentMethod"
              value={
                form.paymentMethod
              }
              onChange={
                handleChange
              }
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

            </Select>

          </Field>

        </FieldGroup>


        {/* =================================
                    Service + Date
                ================================== */}

        <FieldGroup>

          <Field>

            <Label>
              Service
            </Label>

            <Select
              name="serviceId"
              value={
                form.serviceId
              }
              onChange={
                handleChange
              }
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

            </Select>

          </Field>


          <Field>

            <Label>
              Transaction Date
            </Label>

            <Input
              type="date"
              name="transactionDate"
              value={
                form.transactionDate
              }
              onChange={
                handleChange
              }
            />

          </Field>

        </FieldGroup>


        {/* =================================
                    Notes
                ================================== */}

        <Field>

          <Label>
            Notes
          </Label>

          <Textarea
            name="notes"
            value={
              form.notes
            }
            onChange={
              handleChange
            }
            placeholder="Add any notes about this transaction..."
            rows={4}
          />

        </Field>


        {/* =================================
                    Actions
                ================================== */}

        <Actions>

          <Button
            type="button"
            variant="secondary"
            disabled={
              submitting
            }
            onClick={
              onClose
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
              : "Record Offering"}
          </Button>

        </Actions>

      </Form>

    </Modal>

  );

};

export default CreateOfferingModal;