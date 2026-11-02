import { useMemo } from "react";

const useServiceFilters = (services = [], filters = {}) => {
  return useMemo(() => {
    const search = (filters.search || "").trim().toLowerCase();

    const serviceType = filters.serviceType || "";

    const status = filters.status || "";

    const date = filters.date || "";

    return services.filter((service) => {
      // =====================================
      // Search
      // =====================================

      const title = (service.title || "").toLowerCase();

      const description = (service.description || "").toLowerCase();

      const matchesSearch =
        !search || title.includes(search) || description.includes(search);

      // =====================================
      // Service Type
      // =====================================

      const matchesServiceType =
        !serviceType || service.serviceType === serviceType;

      // =====================================
      // Status
      // =====================================

      const matchesStatus = !status || service.status === status;

      // =====================================
      // Date
      // =====================================

      const serviceDate = service.serviceDate
        ? new Date(service.serviceDate).toISOString().slice(0, 10)
        : "";

      const matchesDate = !date || serviceDate === date;

      return (
        matchesSearch && matchesServiceType && matchesStatus && matchesDate
      );
    });
  }, [services, filters]);
};

export default useServiceFilters;
