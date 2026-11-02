import Input from "../../../../components/ui/Input/Input";
import Select from "../../../../components/ui/Select/Select";
import Textarea from "../../../../components/ui/Textarea/Textarea";

import {
  FormGrid,
  FullWidth,
} from "../../../../components/ui/Form";

const VisitorForm = ({
  formData,
  errors = {},
  onChange,
}) => {
  return (
    <FormGrid>
      <Input
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={onChange}
        error={errors.firstName}
        required
      />

      <Input
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={onChange}
        error={errors.lastName}
        required
      />

      <Input
        label="Phone Number"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        error={errors.phone}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={onChange}
      />

      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={onChange}
      />

      <Select
        label="Visit Source"
        name="source"
        value={formData.source}
        onChange={onChange}
      >
        <option value="SERVICE">
          Service
        </option>

        <option value="ONLINE">
          Online
        </option>

        <option value="EVENT">
          Event
        </option>

        <option value="REFERRAL">
          Referral
        </option>

        <option value="OTHER">
          Other
        </option>
      </Select>

      <FullWidth>
        <Input
          label="Invited By"
          name="invitedBy"
          value={formData.invitedBy}
          onChange={onChange}
        />
      </FullWidth>

      <FullWidth>
        <Textarea
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={onChange}
          placeholder="Additional information..."
        />
      </FullWidth>
    </FormGrid>
  );
};

export default VisitorForm;