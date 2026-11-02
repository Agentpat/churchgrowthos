import { useState } from "react";

import Modal from "../../../../components/ui/Modal/Modal";
import Input from "../../../../components/ui/Input/Input";
import Select from "../../../../components/ui/Select/Select";
import Button from "../../../../components/ui/Button/Button";

import {
  Form,
  FieldGroup,
  Field,
  Label,
  Textarea,
  Footer,
  ErrorMessage,
} from "./CreateServiceModal.styles";

const INITIAL_FORM = {
  title: "",
  serviceType: "",
  serviceDate: "",
  startTime: "",
  endTime: "",
  description: "",
  notes: "",
};

const CreateServiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState(INITIAL_FORM);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  // =====================================
  // Handle Change
  // =====================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // =====================================
  // Reset
  // =====================================

  const resetForm = () => {
    setForm(INITIAL_FORM);

    setError("");

    setSubmitting(false);
  };

  // =====================================
  // Close
  // =====================================

  const handleClose = () => {
    if (submitting) {
      return;
    }

    resetForm();

    onClose?.();
  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    // =================================
    // Required Fields
    // =================================

    if (
      !form.title.trim() ||
      !form.serviceType ||
      !form.serviceDate ||
      !form.startTime
    ) {
      setError("Please complete all required fields.");

      return;
    }

    // =================================
    // Validate End Time
    // =================================

    if (form.endTime && form.endTime <= form.startTime) {
      setError("End time must be later than start time.");

      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        title: form.title.trim(),

        serviceType: form.serviceType,

        serviceDate: form.serviceDate,

        startTime: form.startTime,

        endTime: form.endTime,

        description: form.description.trim(),

        notes: form.notes.trim(),
      };

      await onSubmit?.(payload);

      resetForm();

      onClose?.();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to create service.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Service">
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {/* =================================
                    Basic Information
                ================================== */}

        <Field>
          <Label>Service Title *</Label>

          <Input
            name="title"
            placeholder="e.g. Sunday Worship"
            value={form.title}
            onChange={handleChange}
            disabled={submitting}
          />
        </Field>

        <Field>
          <Label>Service Type *</Label>

          <Select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            disabled={submitting}
          >
            <option value="">Select service type</option>

            <option value="SUNDAY_SERVICE">Sunday Service</option>

            <option value="MIDWEEK_SERVICE">Midweek Service</option>

            <option value="PRAYER_MEETING">Prayer Meeting</option>

            <option value="WORKERS_MEETING">Workers Meeting</option>

            <option value="SPECIAL_PROGRAMME">Special Programme</option>

            <option value="BIBLE_STUDY">Bible Study</option>

            <option value="VIGIL">Vigil</option>

            <option value="OTHER">Other</option>
          </Select>
        </Field>

        {/* =================================
                    Schedule
                ================================== */}

        <FieldGroup>
          <Field>
            <Label>Service Date *</Label>

            <Input
              type="date"
              name="serviceDate"
              value={form.serviceDate}
              onChange={handleChange}
              disabled={submitting}
            />
          </Field>

          <Field>
            <Label>Start Time *</Label>

            <Input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              disabled={submitting}
            />
          </Field>
        </FieldGroup>

        <Field>
          <Label>End Time</Label>

          <Input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            disabled={submitting}
          />
        </Field>

        {/* =================================
                    Description
                ================================== */}

        <Field>
          <Label>Description</Label>

          <Textarea
            name="description"
            placeholder="Brief description of this service..."
            value={form.description}
            onChange={handleChange}
            disabled={submitting}
            rows={3}
          />
        </Field>

        {/* =================================
                    Notes
                ================================== */}

        <Field>
          <Label>Notes</Label>

          <Textarea
            name="notes"
            placeholder="Optional notes..."
            value={form.notes}
            onChange={handleChange}
            disabled={submitting}
            rows={3}
          />
        </Field>

        {/* =================================
                    Footer
                ================================== */}

        <Footer>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={submitting}
          >
            Cancel
          </Button>

          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? "Creating..." : "Create Service"}
          </Button>
        </Footer>
      </Form>
    </Modal>
  );
};

export default CreateServiceModal;
