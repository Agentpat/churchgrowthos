import {
  FaSearch,
} from "react-icons/fa";

import {
  Container,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  FilterGroup,
  Select,
} from "./VisitorFilters.styles";

const VisitorFilters = ({
  filters = {},
  setFilters,
}) => {

  const safeFilters = {

    search: "",

    status: "",

    source: "",

    followUpStage: "",

    ...filters,

  };



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



  return (

    <Container>

      <SearchWrapper>

        <SearchIcon>

          <FaSearch />

        </SearchIcon>

        <SearchInput

          type="text"

          name="search"

          placeholder="Search visitors..."

          value={safeFilters.search}

          onChange={handleChange}

        />

      </SearchWrapper>



      <FilterGroup>

        <Select

          name="status"

          value={safeFilters.status}

          onChange={handleChange}

        >

          <option value="">

            All Status

          </option>

          <option value="NEW">

            New

          </option>

          <option value="CONTACTED">

            Contacted

          </option>

          <option value="FOLLOWING_UP">

            Following Up

          </option>

          <option value="CONNECTED">

            Connected

          </option>

          <option value="CONVERTED">

            Converted

          </option>

          <option value="INACTIVE">

            Inactive

          </option>

        </Select>



        <Select

          name="source"

          value={safeFilters.source}

          onChange={handleChange}

        >

          <option value="">

            All Sources

          </option>

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



        <Select

          name="followUpStage"

          value={safeFilters.followUpStage}

          onChange={handleChange}

        >

          <option value="">

            All Follow Up

          </option>

          <option value="WELCOME">

            Welcome

          </option>

          <option value="DAY_3">

            Day 3

          </option>

          <option value="DAY_7">

            Day 7

          </option>

          <option value="COMPLETED">

            Completed

          </option>

        </Select>

      </FilterGroup>

    </Container>

  );

};

export default VisitorFilters;