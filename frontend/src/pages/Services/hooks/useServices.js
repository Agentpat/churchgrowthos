import { useCallback, useEffect, useState } from "react";

import serviceService from "../../../services/serviceService";

const useServices = () => {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================
  // Load Services
  // =====================================

  const loadServices = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const response = await serviceService.getServices();

    

      const servicesData =
        response?.data?.services || response?.services || response?.data || [];

     

      setServices(Array.isArray(servicesData) ? servicesData : []);
    } catch (error) {
      console.error("FAILED TO LOAD SERVICES:", error);

      setError(error.response?.data?.message || "Unable to load services.");
    } finally {
      setLoading(false);
    }
  }, []);

  // =====================================
  // Create Service
  // =====================================

  const createService = useCallback(
    async (serviceData) => {
      console.log("CREATING SERVICE:", serviceData);

      const response = await serviceService.createService(serviceData);

      

      await loadServices();

      return response;
    },
    [loadServices],
  );

  // =====================================
  // Update Service
  // =====================================

  const updateService = useCallback(
    async (id, serviceData) => {
      const response = await serviceService.updateService(id, serviceData);

      await loadServices();

      return response;
    },
    [loadServices],
  );

  // =====================================
  // Delete Service
  // =====================================

  const deleteService = useCallback(
    async (id) => {
      const response = await serviceService.deleteService(id);

      await loadServices();

      return response;
    },
    [loadServices],
  );

  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return {
    services,

    loading,

    error,

    reload: loadServices,

    createService,

    updateService,

    deleteService,
  };
};

export default useServices;
