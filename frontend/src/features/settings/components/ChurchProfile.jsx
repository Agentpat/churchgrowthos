
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FaChurch,
  FaSave,
  FaCheckCircle,
  FaUpload,
  FaTimes,
} from "react-icons/fa";

import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import Card from "../../../components/ui/Card/Card";

import churchService from "../../../services/churchService";
import { useAuth } from "../../../context/AuthContext";

import {
  ProfileHeader,
  ProfileTitleGroup,
  ProfileIcon,
  ProfileTitle,
  ProfileDescription,
  FormGrid,
  FullWidthField,
  LogoSection,
  LogoPreview,
  LogoPlaceholder,
  LogoInfo,
  LogoTitle,
  LogoDescription,
  LogoInput,
  FileInput,
  FileInputLabel,
  FileInputText,
  FileInputHint,
  RemoveLogoButton,
  ColorField,
  ColorFieldLabel,
  ColorPickerRow,
  ColorPicker,
  ColorValue,
  ColorPreview,
  ColorDescription,
  FormActions,
  SaveStatus,
  ErrorMessage,
  LoadingState,
} from "./ChurchProfile.styles";

const MAX_LOGO_SIZE = 100 * 1024;

const ALLOWED_LOGO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const DEFAULT_PRIMARY_COLOR = "#2563EB";

const INITIAL_FORM_DATA = {
  churchName: "",
  pastorName: "",
  description: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "Nigeria",
  logo: "",
  primaryColor: DEFAULT_PRIMARY_COLOR,
};

const ChurchProfile = () => {
  const fileInputRef = useRef(null);

  const { updateChurchProfile } = useAuth();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [saved, setSaved] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  // =====================================
  // LOAD CHURCH PROFILE
  // =====================================

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await churchService.getProfile();

        const profile = response?.data || response;

        if (!mounted) {
          return;
        }

        setFormData({
          churchName: profile?.churchName || "",
          pastorName: profile?.pastorName || "",
          description: profile?.description || "",
          email: profile?.email || "",
          phone: profile?.phone || "",
          address: profile?.address || "",
          city: profile?.city || "",
          state: profile?.state || "",
          country: profile?.country || "Nigeria",
          logo: profile?.logo || "",
          primaryColor:
            profile?.primaryColor || DEFAULT_PRIMARY_COLOR,
        });

        setLogoFile(null);
      } catch (err) {
        console.error(
          "Failed to load church profile:",
          err,
        );

        if (!mounted) {
          return;
        }

        setError(
          err?.response?.data?.message ||
            "Unable to load church profile.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================
  // HANDLE TEXT CHANGES
  // =====================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);

    if (fieldErrors[name]) {
      setFieldErrors((previous) => {
        const next = {
          ...previous,
        };

        delete next[name];

        return next;
      });
    }

    if (error) {
      setError("");
    }
  };

  // =====================================
  // HANDLE PRIMARY COLOR
  // =====================================

  const handlePrimaryColorChange = (event) => {
    const { value } = event.target;

    setFormData((previous) => ({
      ...previous,
      primaryColor: value.toUpperCase(),
    }));

    setSaved(false);

    if (fieldErrors.primaryColor) {
      setFieldErrors((previous) => {
        const next = {
          ...previous,
        };

        delete next.primaryColor;

        return next;
      });
    }

    if (error) {
      setError("");
    }
  };

  // =====================================
  // HANDLE LOGO SELECTION
  // =====================================

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSaved(false);
    setError("");

    if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
      setError(
        "Logo must be a JPG, PNG, WEBP, or GIF image.",
      );

      event.target.value = "";

      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      setError(
        "Church logo must not exceed 100 KB.",
      );

      event.target.value = "";

      return;
    }

    setLogoFile(file);

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;

      if (typeof result !== "string") {
        setError(
          "Unable to preview the selected logo.",
        );

        return;
      }

      setFormData((previous) => ({
        ...previous,
        logo: result,
      }));
    };

    reader.onerror = () => {
      setError(
        "Unable to read the selected logo.",
      );
    };

    reader.readAsDataURL(file);
  };

  // =====================================
  // REMOVE LOGO
  // =====================================

  const handleRemoveLogo = () => {
    setLogoFile(null);

    setFormData((previous) => ({
      ...previous,
      logo: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSaved(false);
    setError("");
  };

  // =====================================
  // VALIDATION
  // =====================================

  const validate = () => {
    const errors = {};

    const churchName = formData.churchName.trim();
    const email = formData.email.trim();
    const primaryColor = formData.primaryColor.trim();

    if (!churchName) {
      errors.churchName =
        "Church name is required.";
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      errors.email =
        "Enter a valid email address.";
    }

    if (
      !/^#[0-9A-Fa-f]{6}$/.test(
        primaryColor,
      )
    ) {
      errors.primaryColor =
        "Select a valid brand color.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // =====================================
  // SAVE PROFILE
  // =====================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaved(false);
    setError("");

    if (!validate()) {
      return;
    }

    try {
      setSaving(true);

      const profileData = {
        churchName: formData.churchName.trim(),
        pastorName: formData.pastorName.trim(),
        description: formData.description.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        country: formData.country.trim() || "Nigeria",
        logo: formData.logo || "",
        primaryColor:
          formData.primaryColor.trim() ||
          DEFAULT_PRIMARY_COLOR,
      };

      const response =
        await churchService.updateProfile(
          profileData,
        );

      const updatedProfile =
        response?.data || response;

      const normalizedProfile = {
        churchName:
          updatedProfile?.churchName ??
          profileData.churchName,

        pastorName:
          updatedProfile?.pastorName ??
          profileData.pastorName,

        description:
          updatedProfile?.description ??
          profileData.description,

        email:
          updatedProfile?.email ??
          profileData.email,

        phone:
          updatedProfile?.phone ??
          profileData.phone,

        address:
          updatedProfile?.address ??
          profileData.address,

        city:
          updatedProfile?.city ??
          profileData.city,

        state:
          updatedProfile?.state ??
          profileData.state,

        country:
          updatedProfile?.country ??
          profileData.country,

        logo:
          updatedProfile?.logo ??
          profileData.logo,

        primaryColor:
          updatedProfile?.primaryColor ??
          profileData.primaryColor,
      };

      setFormData({
        churchName:
          normalizedProfile.churchName,

        pastorName:
          normalizedProfile.pastorName,

        description:
          normalizedProfile.description,

        email:
          normalizedProfile.email,

        phone:
          normalizedProfile.phone,

        address:
          normalizedProfile.address,

        city:
          normalizedProfile.city,

        state:
          normalizedProfile.state,

        country:
          normalizedProfile.country,

        logo:
          normalizedProfile.logo,

        primaryColor:
          normalizedProfile.primaryColor,
      });

      /*
       * Update the global church profile.
       *
       * This immediately updates every component
       * consuming churchProfile through AuthContext.
       *
       * It also allows ThemeProvider to react to
       * the newly saved primary color without a
       * page refresh.
       */
      updateChurchProfile(
        normalizedProfile,
      );

      setLogoFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setSaved(true);
    } catch (err) {
      console.error(
        "Failed to update church profile:",
        err,
      );

      setError(
        err?.response?.data?.message ||
          "Unable to save church profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return (
      <Card padding="large">
        <LoadingState>
          Loading church profile...
        </LoadingState>
      </Card>
    );
  }

  // =====================================
  // RENDER
  // =====================================

  return (
    <Card padding="large">
      <ProfileHeader>
        <ProfileTitleGroup>
          <ProfileIcon>
            <FaChurch />
          </ProfileIcon>

          <div>
            <ProfileTitle>
              Church Profile
            </ProfileTitle>

            <ProfileDescription>
              Manage your church information
              and branding.
            </ProfileDescription>
          </div>
        </ProfileTitleGroup>
      </ProfileHeader>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <form onSubmit={handleSubmit}>
        {/* =====================================
            CHURCH LOGO
        ====================================== */}

        <LogoSection>
          <LogoPreview>
            {formData.logo ? (
              <img
                src={formData.logo}
                alt={`${formData.churchName || "Church"} logo`}
              />
            ) : (
              <LogoPlaceholder>
                <FaChurch />
              </LogoPlaceholder>
            )}
          </LogoPreview>

          <LogoInfo>
            <LogoTitle>
              Church Logo
            </LogoTitle>

            <LogoDescription>
              Upload your church logo.
              JPG, PNG, WEBP, or GIF files
              up to 100 KB.
            </LogoDescription>

            <LogoInput>
              <FileInput
                id="church-logo"
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleLogoChange}
              />

              <FileInputLabel htmlFor="church-logo">
                <FaUpload />

                <FileInputText>
                  {logoFile
                    ? logoFile.name
                    : "Choose logo image"}
                </FileInputText>
              </FileInputLabel>

              <FileInputHint>
                Maximum file size: 100 KB
              </FileInputHint>

              {formData.logo && (
                <RemoveLogoButton
                  type="button"
                  onClick={handleRemoveLogo}
                >
                  <FaTimes />
                  Remove logo
                </RemoveLogoButton>
              )}
            </LogoInput>
          </LogoInfo>
        </LogoSection>

        {/* =====================================
            CHURCH INFORMATION
        ====================================== */}

        <FormGrid>
          <Input
            label="Church Name"
            name="churchName"
            value={formData.churchName}
            onChange={handleChange}
            placeholder="Enter church name"
            error={fieldErrors.churchName}
            required
          />

          <Input
            label="Pastor Name"
            name="pastorName"
            value={formData.pastorName}
            onChange={handleChange}
            placeholder="Enter pastor name"
          />

          <Input
            label="Church Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="church@example.com"
            error={fieldErrors.email}
          />

          <Input
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+234 800 000 0000"
          />

          <FullWidthField>
            <Input
              label="Church Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter church address"
            />
          </FullWidthField>

          <Input
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
          />

          <Input
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
          />

          <Input
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
          />

          {/* =====================================
              PRIMARY BRAND COLOR
          ====================================== */}

          <ColorField>
            <ColorFieldLabel>
              Primary Brand Color
            </ColorFieldLabel>

            <ColorPickerRow>
              <ColorPicker
                type="color"
                value={formData.primaryColor}
                onChange={
                  handlePrimaryColorChange
                }
                aria-label="Choose primary brand color"
              />

              <ColorValue>
                {formData.primaryColor}
              </ColorValue>

              <ColorPreview
                $color={
                  formData.primaryColor
                }
              />
            </ColorPickerRow>

            <ColorDescription>
              Choose the main color used
              to represent your church
              across the platform.
            </ColorDescription>

            {fieldErrors.primaryColor && (
              <ErrorMessage>
                {fieldErrors.primaryColor}
              </ErrorMessage>
            )}
          </ColorField>

          <FullWidthField>
            <Input
              label="Church Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe your church"
            />
          </FullWidthField>
        </FormGrid>

        {/* =====================================
            ACTIONS
        ====================================== */}

        <FormActions>
          {saved && (
            <SaveStatus>
              <FaCheckCircle />
              Changes saved
            </SaveStatus>
          )}

          <Button
            type="submit"
            disabled={saving}
          >
            <FaSave />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </FormActions>
      </form>
    </Card>
  );
};

export default ChurchProfile;
