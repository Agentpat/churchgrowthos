import {
  useEffect,
  useState,
} from "react";

import membersService from "../../../../services/memberService";

import {
  Form,
  FormGrid,
  Field,
  FieldFull,
  Label,
  Required,
  Input,
  Select,
  Textarea,

  ServiceAreas,
  ServiceAreaInput,
  AddServiceAreaButton,
  ServiceAreaList,
  ServiceAreaItem,
  RemoveServiceAreaButton,

  FormActions,
  CancelButton,
  SubmitButton,

  ErrorMessage,
} from "./StaffForm.styles";


// =====================================
// Initial Form State
// =====================================

const initialFormData = {
  memberId: "",

  department: "",

  role: "",

  serviceAreas: [],

  status: "ACTIVE",

  notes: "",
};


// =====================================
// Staff Form
// =====================================

const StaffForm = ({
  initialData = null,

  onSubmit,
  onCancel,

  loading = false,
  error = "",
}) => {

  // =====================================
  // Form State
  // =====================================

  const [
    formData,
    setFormData,
  ] = useState(
    initialFormData,
  );


  // =====================================
  // Members
  // =====================================

  const [
    members,
    setMembers,
  ] = useState([]);


  // =====================================
  // Members Loading
  // =====================================

  const [
    membersLoading,
    setMembersLoading,
  ] = useState(false);


  // =====================================
  // Members Error
  // =====================================

  const [
    membersError,
    setMembersError,
  ] = useState("");


  // =====================================
  // Service Area Input
  // =====================================

  const [
    serviceAreaInput,
    setServiceAreaInput,
  ] = useState("");


  // =====================================
  // Validation Error
  // =====================================

  const [
    validationError,
    setValidationError,
  ] = useState("");


  // =====================================
  // Load Members
  // =====================================

  useEffect(() => {

    let mounted = true;


    const loadMembers =
      async () => {

        try {

          setMembersLoading(true);

          setMembersError("");


          const response =
            await membersService.getMembers();


          // =================================
          // Normalize Members Response
          // =================================
          //
          // Actual API response:
          //
          // {
          //   success: true,
          //   data: {
          //     members: [],
          //     pagination: {}
          //   }
          // }
          //
          // =================================

          const memberData =
            response?.data?.members ||
            response?.members ||
            (
              Array.isArray(
                response?.data,
              )
                ? response.data
                : []
            );


          if (!mounted) {
            return;
          }


          setMembers(
            Array.isArray(
              memberData,
            )
              ? memberData
              : [],
          );

        } catch (err) {

          if (!mounted) {
            return;
          }


          console.error(
            "FAILED TO LOAD MEMBERS:",
            err,
          );


          setMembersError(
            err?.response?.data
              ?.message ||
            err?.message ||
            "Unable to load members.",
          );

        } finally {

          if (mounted) {

            setMembersLoading(
              false,
            );

          }

        }

      };


    loadMembers();


    return () => {

      mounted = false;

    };

  }, []);


  // =====================================
  // Populate Form
  // =====================================

  useEffect(() => {

    if (!initialData) {

      setFormData({
        ...initialFormData,
      });

      setServiceAreaInput("");

      setValidationError("");

      return;

    }


    // =================================
    // Resolve Member ID
    // =================================

    const memberId =
      typeof initialData.memberId ===
        "object"
        ? (
          initialData.memberId?._id ||
          initialData.memberId?.id ||
          ""
        )
        : (
          initialData.memberId ||
          initialData.member?._id ||
          initialData.member?.id ||
          ""
        );


    setFormData({

      memberId,

      department:
        initialData.department ||
        "",

      role:
        initialData.role ||
        "",

      serviceAreas:
        Array.isArray(
          initialData.serviceAreas,
        )
          ? initialData.serviceAreas
          : [],

      status:
        initialData.status ||
        "ACTIVE",

      notes:
        initialData.notes ||
        "",

    });


    setServiceAreaInput("");

    setValidationError("");

  }, [initialData]);


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
      (current) => ({
        ...current,

        [name]: value,

      }),
    );


    if (validationError) {

      setValidationError("");

    }

  };


  // =====================================
  // Add Service Area
  // =====================================

  const handleAddServiceArea =
    () => {

      const value =
        serviceAreaInput.trim();


      if (!value) {
        return;
      }


      const alreadyExists =
        formData.serviceAreas.some(
          (area) =>
            area.toLowerCase() ===
            value.toLowerCase(),
        );


      if (alreadyExists) {

        setServiceAreaInput("");

        return;

      }


      setFormData(
        (current) => ({
          ...current,

          serviceAreas: [
            ...current.serviceAreas,
            value,
          ],

        }),
      );


      setServiceAreaInput("");

    };


  // =====================================
  // Remove Service Area
  // =====================================

  const handleRemoveServiceArea =
    (area) => {

      setFormData(
        (current) => ({
          ...current,

          serviceAreas:
            current.serviceAreas.filter(
              (item) =>
                item !== area,
            ),

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


    // =================================
    // Validate Member
    // =================================

    if (!formData.memberId) {

      setValidationError(
        "Please select a member.",
      );

      return;

    }


    // =================================
    // Validate Department
    // =================================

    if (
      !formData.department.trim()
    ) {

      setValidationError(
        "Department is required.",
      );

      return;

    }


    // =================================
    // Validate Role
    // =================================

    if (
      !formData.role.trim()
    ) {

      setValidationError(
        "Staff role is required.",
      );

      return;

    }


    setValidationError("");


    // =================================
    // Payload
    // =================================

    const payload = {

      memberId:
        formData.memberId,

      department:
        formData.department.trim(),

      role:
        formData.role.trim(),

      serviceAreas:
        formData.serviceAreas,

      status:
        formData.status,

      notes:
        formData.notes.trim(),

    };


    try {

      await onSubmit?.(
        payload,
      );

    } catch (err) {

      console.error(
        "STAFF FORM SUBMIT FAILED:",
        err,
      );

    }

  };


  // =====================================
  // Selected Member
  // =====================================

  const selectedMember =
    members.find(
      (member) =>
        (
          member?._id ||
          member?.id
        ) === formData.memberId,
    );


  // =====================================
  // Render
  // =====================================

  return (

    <Form
      onSubmit={
        handleSubmit
      }
    >

      <FormGrid>

        {/* =================================
            Member
        ================================= */}

        <FieldFull>

          <Label
            htmlFor="staff-member"
          >
            Member
            <Required>*</Required>
          </Label>


          <Select
            id="staff-member"
            name="memberId"
            value={
              formData.memberId
            }
            onChange={
              handleChange
            }
            disabled={
              loading ||
              membersLoading
            }
          >

            <option value="">

              {membersLoading
                ? "Loading members..."
                : members.length === 0
                  ? "No members available"
                  : "Select a member"}

            </option>


            {members.map(
              (member) => {

                const memberId =
                  member?._id ||
                  member?.id;


                if (!memberId) {
                  return null;
                }


                const firstName =
                  member?.firstName ||
                  "";

                const lastName =
                  member?.lastName ||
                  "";

                const fullName =
                  member?.fullName ||
                  `${firstName} ${lastName}`
                    .trim();


                return (

                  <option
                    key={memberId}
                    value={memberId}
                  >

                    {fullName ||
                      "Unnamed Member"}

                    {member?.email
                      ? ` — ${member.email}`
                      : ""}

                  </option>

                );

              },
            )}

          </Select>


          {selectedMember && (

            <div
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "var(--text-muted, #64748b)",
              }}
            >

              Selected:

              {" "}

              <strong>
                {selectedMember.fullName ||
                  `${selectedMember.firstName || ""} ${selectedMember.lastName || ""
                    }`.trim()}
              </strong>

              {selectedMember.phone && (
                <>
                  {" · "}
                  {selectedMember.phone}
                </>
              )}

            </div>

          )}


          {membersError && (

            <ErrorMessage>
              {membersError}
            </ErrorMessage>

          )}

        </FieldFull>


        {/* =================================
            Department
        ================================= */}

        <Field>

          <Label
            htmlFor="staff-department"
          >
            Department
            <Required>*</Required>
          </Label>


          <Input
            id="staff-department"
            name="department"
            type="text"
            value={
              formData.department
            }
            onChange={
              handleChange
            }
            placeholder="e.g. Ministry"
            disabled={
              loading
            }
          />

        </Field>


        {/* =================================
            Role
        ================================= */}

        <Field>

          <Label
            htmlFor="staff-role"
          >
            Staff Role
            <Required>*</Required>
          </Label>


          <Input
            id="staff-role"
            name="role"
            type="text"
            value={
              formData.role
            }
            onChange={
              handleChange
            }
            placeholder="e.g. Ministry Coordinator"
            disabled={
              loading
            }
          />

        </Field>


        {/* =================================
            Status
        ================================= */}

        <Field>

          <Label
            htmlFor="staff-status"
          >
            Status
          </Label>


          <Select
            id="staff-status"
            name="status"
            value={
              formData.status
            }
            onChange={
              handleChange
            }
            disabled={
              loading
            }
          >

            <option value="ACTIVE">
              Active
            </option>

            <option value="INACTIVE">
              Inactive
            </option>

          </Select>

        </Field>


        {/* =================================
            Service Areas
        ================================= */}

        <FieldFull>

          <Label>
            Service Areas
          </Label>


          <ServiceAreas>

            <ServiceAreaInput
              type="text"
              value={
                serviceAreaInput
              }
              placeholder="e.g. Worship, Youth, Media"
              disabled={
                loading
              }
              onChange={(
                event,
              ) =>
                setServiceAreaInput(
                  event.target.value,
                )
              }
              onKeyDown={(
                event,
              ) => {

                if (
                  event.key ===
                  "Enter"
                ) {

                  event.preventDefault();

                  handleAddServiceArea();

                }

              }}
            />


            <AddServiceAreaButton
              type="button"
              onClick={
                handleAddServiceArea
              }
              disabled={
                loading ||
                !serviceAreaInput.trim()
              }
            >
              Add
            </AddServiceAreaButton>

          </ServiceAreas>


          {formData.serviceAreas.length >
            0 && (

              <ServiceAreaList>

                {formData.serviceAreas.map(
                  (area) => (

                    <ServiceAreaItem
                      key={area}
                    >

                      <span>
                        {area}
                      </span>


                      <RemoveServiceAreaButton
                        type="button"
                        onClick={() =>
                          handleRemoveServiceArea(
                            area,
                          )
                        }
                        disabled={
                          loading
                        }
                        aria-label={`Remove ${area}`}
                      >
                        ×
                      </RemoveServiceAreaButton>

                    </ServiceAreaItem>

                  ),
                )}

              </ServiceAreaList>

            )}

        </FieldFull>


        {/* =================================
            Notes
        ================================= */}

        <FieldFull>

          <Label
            htmlFor="staff-notes"
          >
            Notes
          </Label>


          <Textarea
            id="staff-notes"
            name="notes"
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
            placeholder="Add any relevant notes about this staff member..."
            rows={4}
            disabled={
              loading
            }
          />

        </FieldFull>

      </FormGrid>


      {/* =================================
          Form Errors
      ================================= */}

      {(validationError ||
        error) && (

          <ErrorMessage>
            {validationError ||
              error}
          </ErrorMessage>

        )}


      {/* =================================
          Form Actions
      ================================= */}

      <FormActions>

        <CancelButton
          type="button"
          onClick={
            onCancel
          }
          disabled={
            loading
          }
        >
          Cancel
        </CancelButton>


        <SubmitButton
          type="submit"
          disabled={
            loading ||
            membersLoading ||
            members.length === 0
          }
        >

          {loading
            ? "Saving..."
            : initialData
              ? "Update Staff"
              : "Add Staff"}

        </SubmitButton>

      </FormActions>

    </Form>

  );

};


export default StaffForm;