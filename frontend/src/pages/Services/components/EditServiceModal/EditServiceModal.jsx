import {
  useEffect,
  useState,
} from "react";

import Modal from "../../../../components/ui/Modal/Modal";
import Button from "../../../../components/ui/Button/Button";

import {
  Form,
  FieldGroup,
  Field,
  Label,
  Input,
  Select,
  Textarea,
  Footer,
  ErrorMessage,
} from "./EditServiceModal.styles";

const INITIAL_FORM = {
  title: "",
  serviceType: "SUNDAY_SERVICE",
  serviceDate: "",
  startTime: "",
  endTime: "",
  description: "",
  status: "SCHEDULED",
  notes: "",
};

const EditServiceModal = ({
  isOpen,
  service,
  onClose,
  onSubmit,
}) => {

  const [
    form,
    setForm,
  ] = useState(INITIAL_FORM);

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

    if (!service) {
      return;
    }

    setForm({

      title:
        service.title || "",

      serviceType:
        service.serviceType ||
        "SUNDAY_SERVICE",

      serviceDate:
        service.serviceDate
          ? new Date(
            service.serviceDate,
          )
            .toISOString()
            .slice(0, 10)
          : "",

      startTime:
        service.startTime || "",

      endTime:
        service.endTime || "",

      description:
        service.description || "",

      status:
        service.status ||
        "SCHEDULED",

      notes:
        service.notes || "",

    });

    setError("");

  }, [service]);

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

    setForm((current) => ({

      ...current,

      [name]: value,

    }));

  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async (
    event,
  ) => {

    event.preventDefault();

    if (!service?._id) {
      return;
    }

    try {

      setSubmitting(true);

      setError("");

      await onSubmit(
        service._id,
        form,
      );

      onClose?.();

    }

    catch (error) {

      setError(

        error.response?.data
          ?.message ||

        error.message ||

        "Unable to update service.",

      );

    }

    finally {

      setSubmitting(false);

    }

  };

  return (

    <Modal

      isOpen={isOpen}

      onClose={() => {

        if (!submitting) {
          onClose?.();
        }

      }}

      title="Edit Service"

    >

      <Form
        onSubmit={handleSubmit}
      >

        {/* =========================
                    Basic Information
                ========================== */}

        <Field>

          <Label htmlFor="title">
            Service Title
          </Label>

          <Input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={
              handleChange
            }
            placeholder="e.g. Sunday Worship Service"
            required
            disabled={submitting}
          />

        </Field>

        <Field>

          <Label htmlFor="serviceType">
            Service Type
          </Label>

          <Select
            id="serviceType"
            name="serviceType"
            value={
              form.serviceType
            }
            onChange={
              handleChange
            }
            disabled={submitting}
          >

            <option value="SUNDAY_SERVICE">
              Sunday Service
            </option>

            <option value="MIDWEEK_SERVICE">
              Midweek Service
            </option>

            <option value="PRAYER_MEETING">
              Prayer Meeting
            </option>

            <option value="WORKERS_MEETING">
              Workers Meeting
            </option>

            <option value="SPECIAL_PROGRAMME">
              Special Programme
            </option>

            <option value="BIBLE_STUDY">
              Bible Study
            </option>

            <option value="VIGIL">
              Vigil
            </option>

            <option value="OTHER">
              Other
            </option>

          </Select>

        </Field>

        {/* =========================
                    Schedule
                ========================== */}

        <FieldGroup>

          <Field>

            <Label htmlFor="serviceDate">
              Service Date
            </Label>

            <Input
              id="serviceDate"
              name="serviceDate"
              type="date"
              value={
                form.serviceDate
              }
              onChange={
                handleChange
              }
              required
              disabled={submitting}
            />

          </Field>

          <Field>

            <Label htmlFor="startTime">
              Start Time
            </Label>

            <Input
              id="startTime"
              name="startTime"
              type="time"
              value={
                form.startTime
              }
              onChange={
                handleChange
              }
              required
              disabled={submitting}
            />

          </Field>

        </FieldGroup>

        <Field>

          <Label htmlFor="endTime">
            End Time
          </Label>

          <Input
            id="endTime"
            name="endTime"
            type="time"
            value={
              form.endTime
            }
            onChange={
              handleChange
            }
            disabled={submitting}
          />

        </Field>

        {/* =========================
                    Status
                ========================== */}

        <Field>

          <Label htmlFor="status">
            Status
          </Label>

          <Select
            id="status"
            name="status"
            value={
              form.status
            }
            onChange={
              handleChange
            }
            disabled={submitting}
          >

            <option value="SCHEDULED">
              Scheduled
            </option>

            <option value="LIVE">
              Live
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>

          </Select>

        </Field>

        {/* =========================
                    Description
                ========================== */}

        <Field>

          <Label htmlFor="description">
            Description
          </Label>

          <Textarea
            id="description"
            name="description"
            value={
              form.description
            }
            onChange={
              handleChange
            }
            placeholder="Brief description of this service..."
            disabled={submitting}
          />

        </Field>

        {/* =========================
                    Notes
                ========================== */}

        <Field>

          <Label htmlFor="notes">
            Notes
          </Label>

          <Textarea
            id="notes"
            name="notes"
            value={
              form.notes
            }
            onChange={
              handleChange
            }
            placeholder="Internal notes..."
            disabled={submitting}
          />

        </Field>

        {/* =========================
                    Error
                ========================== */}

        {error && (

          <ErrorMessage>

            {error}

          </ErrorMessage>

        )}

        {/* =========================
                    Footer
                ========================== */}

        <Footer>

          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={submitting}
          >

            Cancel

          </Button>

          <Button
            type="submit"
            disabled={submitting}
          >

            {submitting
              ? "Saving..."
              : "Save Changes"}

          </Button>

        </Footer>

      </Form>

    </Modal>

  );

};

export default EditServiceModal;