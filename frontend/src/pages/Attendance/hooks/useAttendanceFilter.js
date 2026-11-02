import { useMemo } from "react";

const useAttendanceFilters = (attendance = [], filters = {}) => {
  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const keyword = (filters.search || "").trim().toLowerCase();

      const memberName =
        `${record.memberId?.firstName || ""} ${record.memberId?.lastName || ""}`
          .trim()
          .toLowerCase();

      const serviceName = (
        record.serviceId?.title ||
        record.serviceId?.name ||
        ""
      ).toLowerCase();

      const matchesSearch =
        !keyword ||
        memberName.includes(keyword) ||
        serviceName.includes(keyword);

      const matchesService =
        !filters.service || record.serviceId?._id === filters.service;

      const matchesStatus = !filters.status || record.status === filters.status;

      const matchesDate =
        !filters.date || record.checkedInAt?.slice(0, 10) === filters.date;

      return matchesSearch && matchesService && matchesStatus && matchesDate;
    });
  }, [attendance, filters]);

  return filteredAttendance;
};

export default useAttendanceFilters;
