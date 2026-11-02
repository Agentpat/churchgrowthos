import {
    useState,
} from "react";

import {
    FaFilter,
    FaChevronDown,
    FaChevronUp,
    FaTimes,
} from "react-icons/fa";

import Input from "../../../../components/ui/Input/Input";
import Select from "../../../../components/ui/Select/Select";
import Filters from "../../../../components/ui/Filters";

import {
    DesktopFilters,
    MobileFilterContainer,
    MobileSearch,
    MobileFilterTrigger,
    FilterIcon,
    FilterTriggerText,
    FilterCount,
    MobileFilterPanel,
    MobileFilterHeader,
    MobileFilterTitle,
    MobileCloseButton,
    MobileFilterFields,
    MobileFilterField,
    MobileFilterActions,
    ClearButton,
    ApplyButton,
} from "./AttendanceFilters.styles";


// ============================================================
// COMPONENT
// ============================================================

const AttendanceFilters = ({
    filters = {},
    setFilters,
    services = [],
}) => {

    const [isOpen, setIsOpen] = useState(false);


    // ============================================================
    // CHANGE FILTER
    // ============================================================

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // ============================================================
    // ACTIVE FILTER COUNT
    // ============================================================

    const activeFilterCount = [
        filters?.service,
        filters?.status,
        filters?.date,
    ].filter(Boolean).length;


    // ============================================================
    // CLEAR FILTERS
    // ============================================================

    const handleClear = () => {

        setFilters({
            search: "",
            service: "",
            status: "",
            date: "",
        });

    };


    // ============================================================
    // APPLY FILTERS
    // ============================================================

    const handleApply = () => {

        setIsOpen(false);

    };


    // ============================================================
    // RENDER
    // ============================================================

    return (

        <>

            {/* ====================================================
                DESKTOP FILTERS
            ===================================================== */}

            <DesktopFilters>

                <Filters>

                    <Input
                        name="search"
                        placeholder="Search member..."
                        value={filters.search || ""}
                        onChange={handleChange}
                        compact
                    />


                    <Select
                        name="service"
                        value={filters.service || ""}
                        onChange={handleChange}
                        compact
                    >

                        <option value="">
                            All Services
                        </option>

                        {services.map((service) => (

                            <option
                                key={service._id}
                                value={service._id}
                            >
                                {service.title ||
                                    service.name}
                            </option>

                        ))}

                    </Select>


                    <Select
                        name="status"
                        value={filters.status || ""}
                        onChange={handleChange}
                        compact
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="PRESENT">
                            Present
                        </option>

                        <option value="ABSENT">
                            Absent
                        </option>

                        <option value="EXCUSED">
                            Excused
                        </option>

                    </Select>


                    <Input
                        type="date"
                        name="date"
                        value={filters.date || ""}
                        onChange={handleChange}
                        compact
                    />

                </Filters>

            </DesktopFilters>


            {/* ====================================================
                MOBILE FILTER BAR
            ===================================================== */}

            <MobileFilterContainer>


                {/* ==================================================
                    SEARCH
                =================================================== */}

                <MobileSearch>

                    <Input
                        name="search"
                        placeholder="Search members..."
                        value={filters.search || ""}
                        onChange={handleChange}
                    />

                </MobileSearch>


                {/* ==================================================
                    FILTER TRIGGER
                =================================================== */}

                <MobileFilterTrigger
                    type="button"
                    onClick={() =>
                        setIsOpen((prev) => !prev)
                    }
                    aria-expanded={isOpen}
                    aria-label={
                        isOpen
                            ? "Close attendance filters"
                            : "Open attendance filters"
                    }
                >

                    <FilterIcon>

                        <FaFilter />

                    </FilterIcon>


                    <FilterTriggerText>
                        Filters
                    </FilterTriggerText>


                    {activeFilterCount > 0 && (

                        <FilterCount>
                            {activeFilterCount}
                        </FilterCount>

                    )}


                    {isOpen ? (

                        <FaChevronUp />

                    ) : (

                        <FaChevronDown />

                    )}

                </MobileFilterTrigger>


                {/* ==================================================
                    MOBILE FILTER DROPDOWN
                =================================================== */}

                {isOpen && (

                    <MobileFilterPanel>


                        {/* ==========================================
                            PANEL HEADER
                        =========================================== */}

                        <MobileFilterHeader>

                            <MobileFilterTitle>
                                Attendance filters
                            </MobileFilterTitle>


                            <MobileCloseButton
                                type="button"
                                onClick={() =>
                                    setIsOpen(false)
                                }
                                aria-label="Close filters"
                            >

                                <FaTimes />

                            </MobileCloseButton>

                        </MobileFilterHeader>


                        {/* ==========================================
                            FILTER FIELDS
                        =========================================== */}

                        <MobileFilterFields>


                            {/* ======================================
                                SERVICE
                            ======================================= */}

                            <MobileFilterField
                                $direction="left"
                            >

                                <Select
                                    label="Service"
                                    name="service"
                                    value={
                                        filters.service || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        All Services
                                    </option>

                                    {services.map(
                                        (service) => (

                                            <option
                                                key={
                                                    service._id
                                                }
                                                value={
                                                    service._id
                                                }
                                            >

                                                {service.title ||
                                                    service.name}

                                            </option>

                                        ),
                                    )}

                                </Select>

                            </MobileFilterField>


                            {/* ======================================
                                STATUS
                            ======================================= */}

                            <MobileFilterField
                                $direction="right"
                            >

                                <Select
                                    label="Status"
                                    name="status"
                                    value={
                                        filters.status || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        All Status
                                    </option>

                                    <option value="PRESENT">
                                        Present
                                    </option>

                                    <option value="ABSENT">
                                        Absent
                                    </option>

                                    <option value="EXCUSED">
                                        Excused
                                    </option>

                                </Select>

                            </MobileFilterField>


                            {/* ======================================
                                DATE
                            ======================================= */}

                            <MobileFilterField
                                $direction="left"
                            >

                                <Input
                                    label="Date"
                                    type="date"
                                    name="date"
                                    value={
                                        filters.date || ""
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </MobileFilterField>

                        </MobileFilterFields>


                        {/* ==========================================
                            ACTIONS
                        =========================================== */}

                        <MobileFilterActions>

                            <ClearButton
                                type="button"
                                onClick={handleClear}
                            >
                                Clear
                            </ClearButton>


                            <ApplyButton
                                type="button"
                                onClick={handleApply}
                            >
                                Apply filters
                            </ApplyButton>

                        </MobileFilterActions>

                    </MobileFilterPanel>

                )}

            </MobileFilterContainer>

        </>

    );

};


export default AttendanceFilters;