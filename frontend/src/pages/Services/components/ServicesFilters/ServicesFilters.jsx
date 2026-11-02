import Input from "../../../../components/ui/Input/Input";
import Select from "../../../../components/ui/Select/Select";

import Filters from "../../../../components/ui/Filters";

const ServicesFilters = ({
  filters,
  setFilters,
}) => {

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setFilters((previous) => ({

      ...previous,

      [name]: value,

    }));

  };

  return (

    <Filters>

      <Input
        name="search"
        placeholder="Search services..."
        value={filters.search}
        onChange={handleChange}
      />

      <Select
        name="serviceType"
        value={filters.serviceType}
        onChange={handleChange}
      >

        <option value="">
          All Types
        </option>

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

      <Select
        name="status"
        value={filters.status}
        onChange={handleChange}
      >

        <option value="">
          All Status
        </option>

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

      <Input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
      />

    </Filters>

  );

};

export default ServicesFilters;