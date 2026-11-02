import {
    useEffect,
    useState,
} from "react";

import {
    FaCalendarAlt,
    FaFilter,
    FaTimes,
} from "react-icons/fa";

import {
    Container,
    Header,
    HeaderLeft,
    IconWrapper,
    Title,
    Description,
    ClearButton,
    Controls,
    Field,
    Label,
    Select,
    DateInput,
    Actions,
    ApplyButton,
    ErrorMessage,
} from "./FinanceAnalyticsFilters.styles";


const FinanceAnalyticsFilters = ({
    startDate = "",
    endDate = "",
    onApply,
    onClear,
    loading = false,
}) => {

    // =====================================
    // Preset
    // =====================================

    const [
        preset,
        setPreset,
    ] = useState("thisMonth");


    // =====================================
    // Custom Dates
    // =====================================

    const [
        customStartDate,
        setCustomStartDate,
    ] = useState(startDate);


    const [
        customEndDate,
        setCustomEndDate,
    ] = useState(endDate);


    // =====================================
    // Validation Error
    // =====================================

    const [
        validationError,
        setValidationError,
    ] = useState("");


    // =====================================
    // Date Formatter
    // =====================================

    const formatDate = (
        date,
    ) => {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1,
            ).padStart(
                2,
                "0",
            );

        const day =
            String(
                date.getDate(),
            ).padStart(
                2,
                "0",
            );

        return `${year}-${month}-${day}`;
    };


    // =====================================
    // Get Date Range
    // =====================================

    const getDateRange = (
        selectedPreset,
    ) => {

        const today =
            new Date();


        // =================================
        // All Time
        // =================================

        if (
            selectedPreset ===
            "all"
        ) {

            return {
                startDate: "",
                endDate: "",
            };

        }


        // =================================
        // Today
        // =================================

        if (
            selectedPreset ===
            "today"
        ) {

            const date =
                formatDate(
                    today,
                );

            return {
                startDate: date,
                endDate: date,
            };

        }


        // =================================
        // This Week
        // =================================

        if (
            selectedPreset ===
            "thisWeek"
        ) {

            const start =
                new Date(
                    today,
                );

            const day =
                start.getDay();

            const diff =
                day === 0
                    ? 6
                    : day - 1;

            start.setDate(
                start.getDate() -
                diff,
            );

            return {
                startDate:
                    formatDate(
                        start,
                    ),

                endDate:
                    formatDate(
                        today,
                    ),
            };

        }


        // =================================
        // Last 7 Days
        // =================================

        if (
            selectedPreset ===
            "last7Days"
        ) {

            const start =
                new Date(
                    today,
                );

            start.setDate(
                start.getDate() -
                6,
            );

            return {
                startDate:
                    formatDate(
                        start,
                    ),

                endDate:
                    formatDate(
                        today,
                    ),
            };

        }


        // =================================
        // This Month
        // =================================

        if (
            selectedPreset ===
            "thisMonth"
        ) {

            const start =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1,
                );

            return {
                startDate:
                    formatDate(
                        start,
                    ),

                endDate:
                    formatDate(
                        today,
                    ),
            };

        }


        // =================================
        // Last Month
        // =================================

        if (
            selectedPreset ===
            "lastMonth"
        ) {

            const start =
                new Date(
                    today.getFullYear(),
                    today.getMonth() - 1,
                    1,
                );

            const end =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    0,
                );

            return {
                startDate:
                    formatDate(
                        start,
                    ),

                endDate:
                    formatDate(
                        end,
                    ),
            };

        }


        // =================================
        // This Year
        // =================================

        if (
            selectedPreset ===
            "thisYear"
        ) {

            const start =
                new Date(
                    today.getFullYear(),
                    0,
                    1,
                );

            return {
                startDate:
                    formatDate(
                        start,
                    ),

                endDate:
                    formatDate(
                        today,
                    ),
            };

        }


        // =================================
        // Custom
        // =================================

        if (
            selectedPreset ===
            "custom"
        ) {

            return {
                startDate:
                    customStartDate,

                endDate:
                    customEndDate,
            };

        }


        return {
            startDate: "",
            endDate: "",
        };

    };


    // =====================================
    // Sync Parent Dates
    // =====================================

    useEffect(() => {

        setCustomStartDate(
            startDate || "",
        );

        setCustomEndDate(
            endDate || "",
        );


        if (
            !startDate &&
            !endDate
        ) {

            setPreset(
                "all",
            );

            return;

        }


        if (
            startDate &&
            endDate
        ) {

            const today =
                formatDate(
                    new Date(),
                );


            if (
                startDate ===
                today &&
                endDate ===
                today
            ) {

                setPreset(
                    "today",
                );

            }

        }

    }, [
        startDate,
        endDate,
    ]);


    // =====================================
    // Preset Change
    // =====================================

    const handlePresetChange = (
        event,
    ) => {

        const value =
            event.target.value;


        setPreset(
            value,
        );


        setValidationError("");


        if (
            value ===
            "custom"
        ) {

            return;

        }


        const range =
            getDateRange(
                value,
            );


        setCustomStartDate(
            range.startDate,
        );


        setCustomEndDate(
            range.endDate,
        );

    };


    // =====================================
    // Start Date Change
    // =====================================

    const handleStartDateChange = (
        event,
    ) => {

        setCustomStartDate(
            event.target.value,
        );

        setPreset(
            "custom",
        );

        setValidationError("");

    };


    // =====================================
    // End Date Change
    // =====================================

    const handleEndDateChange = (
        event,
    ) => {

        setCustomEndDate(
            event.target.value,
        );

        setPreset(
            "custom",
        );

        setValidationError("");

    };


    // =====================================
    // Apply Filter
    // =====================================

    const handleApply = () => {

        setValidationError("");


        const range =
            getDateRange(
                preset,
            );


        // =================================
        // Custom Validation
        // =================================

        if (
            preset ===
            "custom"
        ) {

            if (
                !customStartDate ||
                !customEndDate
            ) {

                setValidationError(
                    "Please select both a start date and an end date.",
                );

                return;

            }


            if (
                customStartDate >
                customEndDate
            ) {

                setValidationError(
                    "Start date cannot be after the end date.",
                );

                return;

            }

        }


        onApply?.(
            range,
        );

    };


    // =====================================
    // Clear Filter
    // =====================================

    const handleClear = () => {

        setPreset(
            "all",
        );

        setCustomStartDate(
            "",
        );

        setCustomEndDate(
            "",
        );

        setValidationError("");


        onClear?.();

    };


    // =====================================
    // Render
    // =====================================

    return (

        <Container>

            {/* =================================
                Header
            ================================== */}

            <Header>

                <HeaderLeft>

                    <IconWrapper>
                        <FaCalendarAlt />
                    </IconWrapper>


                    <div>

                        <Title>
                            Analytics Period
                        </Title>

                        <Description>
                            Choose the period for your financial analytics.
                        </Description>

                    </div>

                </HeaderLeft>


                <ClearButton
                    type="button"
                    onClick={
                        handleClear
                    }
                    disabled={
                        loading
                    }
                >

                    <FaTimes />

                    Clear

                </ClearButton>

            </Header>


            {/* =================================
                Controls
            ================================== */}

            <Controls>

                {/* =================================
                    Period
                ================================== */}

                <Field>

                    <Label>
                        Period
                    </Label>


                    <Select
                        value={
                            preset
                        }
                        onChange={
                            handlePresetChange
                        }
                        disabled={
                            loading
                        }
                    >

                        <option value="all">
                            All Time
                        </option>

                        <option value="today">
                            Today
                        </option>

                        <option value="thisWeek">
                            This Week
                        </option>

                        <option value="last7Days">
                            Last 7 Days
                        </option>

                        <option value="thisMonth">
                            This Month
                        </option>

                        <option value="lastMonth">
                            Last Month
                        </option>

                        <option value="thisYear">
                            This Year
                        </option>

                        <option value="custom">
                            Custom Range
                        </option>

                    </Select>

                </Field>


                {/* =================================
                    From
                ================================== */}

                <Field>

                    <Label>
                        From
                    </Label>


                    <DateInput
                        type="date"
                        value={
                            customStartDate
                        }
                        onChange={
                            handleStartDateChange
                        }
                        disabled={
                            loading
                        }
                    />

                </Field>


                {/* =================================
                    To
                ================================== */}

                <Field>

                    <Label>
                        To
                    </Label>


                    <DateInput
                        type="date"
                        value={
                            customEndDate
                        }
                        onChange={
                            handleEndDateChange
                        }
                        disabled={
                            loading
                        }
                    />

                </Field>

            </Controls>


            {/* =================================
                Validation
            ================================== */}

            {validationError && (

                <ErrorMessage>
                    {validationError}
                </ErrorMessage>

            )}


            {/* =================================
                Actions
            ================================== */}

            <Actions>

                <ApplyButton
                    type="button"
                    onClick={
                        handleApply
                    }
                    disabled={
                        loading
                    }
                >

                    <FaFilter />

                    {loading
                        ? "Loading..."
                        : "Apply Filter"}

                </ApplyButton>

            </Actions>

        </Container>

    );

};


export default FinanceAnalyticsFilters;