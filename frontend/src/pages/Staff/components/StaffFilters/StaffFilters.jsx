import {
  FiltersContainer,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  SelectWrapper,
  Select,
  FilterActions,
  SearchButton,
  ClearButton,
} from "./StaffFilters.styles";


// =====================================
// Staff Filters
// =====================================

const StaffFilters = ({
  search = "",
  department = "",
  status = "",

  departments = [],

  onSearchChange,
  onDepartmentChange,
  onStatusChange,

  onApply,
  onClear,

  loading = false,
}) => {

  // =====================================
  // Submit Filters
  // =====================================

  const handleSubmit = (event) => {

    event.preventDefault();

    if (loading) {
      return;
    }

    onApply?.();

  };


  // =====================================
  // Clear Filters
  // =====================================

  const handleClear = () => {

    if (loading) {
      return;
    }

    onClear?.();

  };


  // =====================================
  // Render
  // =====================================

  return (

    <FiltersContainer
      as="form"
      onSubmit={handleSubmit}
    >

      {/* =================================
          Search
      ================================= */}

      <SearchWrapper>

        <SearchIcon
          aria-hidden="true"
        >
          ⌕
        </SearchIcon>


        <SearchInput
          type="search"
          value={search}
          placeholder="Search staff..."
          aria-label="Search staff"
          onChange={(event) =>
            onSearchChange?.(
              event.target.value,
            )
          }
        />

      </SearchWrapper>


      {/* =================================
          Department
      ================================= */}

      <SelectWrapper>

        <Select
          value={department}
          aria-label="Filter by department"
          onChange={(event) =>
            onDepartmentChange?.(
              event.target.value,
            )
          }
        >

          <option value="">
            All Departments
          </option>


          {departments.map(
            (item) => (

              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            ),
          )}

        </Select>

      </SelectWrapper>


      {/* =================================
          Status
      ================================= */}

      <SelectWrapper>

        <Select
          value={status}
          aria-label="Filter by status"
          onChange={(event) =>
            onStatusChange?.(
              event.target.value,
            )
          }
        >

          <option value="">
            All Statuses
          </option>


          <option value="ACTIVE">
            Active
          </option>


          <option value="INACTIVE">
            Inactive
          </option>

        </Select>

      </SelectWrapper>


      {/* =================================
          Actions
      ================================= */}

      <FilterActions>

        <SearchButton
          type="submit"
          disabled={loading}
        >

          <span
            aria-hidden="true"
          >
            ⌕
          </span>

          <span>
            {loading
              ? "Searching..."
              : "Search"}
          </span>

        </SearchButton>


        <ClearButton
          type="button"
          disabled={loading}
          onClick={handleClear}
        >

          <span
            aria-hidden="true"
          >
            ×
          </span>

          <span>
            Clear
          </span>

        </ClearButton>

      </FilterActions>

    </FiltersContainer>

  );

};


export default StaffFilters;