import {
  FaSearch,
} from "react-icons/fa";


import {
  Container,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  Select,
  FilterGroup,
} from "./MemberFilters.styles";



const MemberFilters = ({
  filters = {},
  setFilters,
}) => {


  const safeFilters = {

    search: "",

    status: "",

    gender: "",

    membershipStatus: "",

    engagement: "",

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

          placeholder="Search members..."

          value={
            safeFilters.search
          }

          onChange={
            handleChange
          }

        />


      </SearchWrapper>





      <FilterGroup>



        <Select

          name="status"

          value={
            safeFilters.status
          }

          onChange={
            handleChange
          }

        >

          <option value="">
            All Status
          </option>


          <option value="active">
            Active
          </option>


          <option value="inactive">
            Inactive
          </option>


        </Select>






        <Select

          name="membershipStatus"

          value={
            safeFilters.membershipStatus
          }

          onChange={
            handleChange
          }

        >

          <option value="">
            All Members
          </option>


          <option value="FIRST_TIMER">
            First Timers
          </option>


          <option value="MEMBER">
            Members
          </option>


          <option value="WORKER">
            Workers
          </option>


        </Select>







        <Select

          name="engagement"

          value={
            safeFilters.engagement
          }

          onChange={
            handleChange
          }

        >

          <option value="">
            All Engagement
          </option>


          <option value="ENGAGED">
            Engaged
          </option>


          <option value="ACTIVE">
            Active
          </option>


          <option value="NEEDS_FOLLOW_UP">
            Needs Follow Up
          </option>


        </Select>








        <Select

          name="gender"

          value={
            safeFilters.gender
          }

          onChange={
            handleChange
          }

        >


          <option value="">
            All Gender
          </option>



          <option value="male">
            Male
          </option>



          <option value="female">
            Female
          </option>



        </Select>




      </FilterGroup>




    </Container>

  );

};


export default MemberFilters;