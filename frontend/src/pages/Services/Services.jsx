import {
  useState,
} from "react";

import Loader from "../../components/ui/Loader/Loader";

import ServicesHeader from "./components/ServicesHeader";
import ServicesStats from "./components/ServicesStats";
import ServicesFilters from "./components/ServicesFilters";
import ServicesTable from "./components/ServicesTable";
import CreateServiceModal from "./components/CreateServiceModal";
import ServiceProfile from "./components/ServiceProfile";
import EditServiceModal from "./components/EditServiceModal";
import DeleteServiceModal from "./components/DeleteServiceModal";

import useServices from "./hooks/useServices";
import useServiceFilters from "./hooks/useServiceFilters";

import {
  MembersContainer as ServicesContainer,
  Content,
  ErrorBox,
} from "../Members/Members.styles";

const Services = () => {

  // =====================================
  // Services
  // =====================================

  const {
    services,
    loading,
    error,
    createService,
    updateService,
    deleteService,
  } = useServices();

  // =====================================
  // Create Modal
  // =====================================

  const [
    showCreateService,
    setShowCreateService,
  ] = useState(false);

  // =====================================
  // Selected Service
  // =====================================

  const [
    selectedService,
    setSelectedService,
  ] = useState(null);

  // =====================================
  // Editing Service
  // =====================================

  const [
    editingService,
    setEditingService,
  ] = useState(null);


  // =====================================
  // Delete Service Modal
  //
  const [
    deletingService,
    setDeletingService,
  ] = useState(null);


  // =====================================
  // Filters
  // =====================================

  const [
    filters,
    setFilters,
  ] = useState({

    search: "",

    serviceType: "",

    status: "",

    date: "",

  });

  // =====================================
  // Filter Services
  // =====================================

  const filteredServices =
    useServiceFilters(
      services,
      filters,
    );

  // =====================================
  // Create Service
  // =====================================

  const handleCreateService =
    async (serviceData) => {

      await createService(
        serviceData,
      );

    };

  // =====================================
  // Update Service
  // =====================================

  const handleDeleteService =
    async () => {

      if (!deletingService?._id) {
        return;
      }

      await deleteService(
        deletingService._id,
      );

      setDeletingService(null);

    };


  const handleUpdateService =
    async (
      id,
      serviceData,
    ) => {

      await updateService(
        id,
        serviceData,
      );

      setEditingService(null);

      setSelectedService(null);

    };

  // =====================================
  // Loading
  // =====================================

  if (loading) {

    return (

      <Loader
        text="Loading services..."
      />

    );

  }

  // =====================================
  // Error
  // =====================================

  if (error) {

    return (

      <ErrorBox>

        {error}

      </ErrorBox>

    );

  }

  return (

    <ServicesContainer>

      {/* =================================
                Header
            ================================== */}

      <ServicesHeader

        onCreate={() =>
          setShowCreateService(
            true,
          )
        }

      />

      <Content>

        {/* =================================
                    Statistics
                ================================== */}

        <ServicesStats

          services={services}

        />

        {/* =================================
                    Filters
                ================================== */}

        <ServicesFilters

          filters={filters}

          setFilters={setFilters}

        />

        {/* =================================
                    Table
                ================================== */}

        <ServicesTable

          services={
            filteredServices
          }

          onView={
            setSelectedService
          }

        />

      </Content>

      {/* =================================
                Service Profile
            ================================== */}

      {selectedService && (

        <ServiceProfile

          service={
            selectedService
          }

          onClose={() =>
            setSelectedService(
              null,
            )
          }

          onEdit={(service) => {

            setSelectedService(
              null,
            );

            setEditingService(
              service,
            );

          }}

          onDelete={(service) => {

            setSelectedService(
              null,
            );

            setDeletingService(
              service,
            );

          }}

        />

      )}

      {/* =================================
                Create Service Modal
            ================================== */}

      <CreateServiceModal

        isOpen={
          showCreateService
        }

        onClose={() =>
          setShowCreateService(
            false,
          )
        }

        onSubmit={
          handleCreateService
        }

      />

      {/* =================================
                Edit Service Modal
            ================================== */}

      <EditServiceModal

        isOpen={
          Boolean(
            editingService,
          )
        }

        service={
          editingService
        }

        onClose={() =>
          setEditingService(
            null,
          )
        }

        onSubmit={
          handleUpdateService
        }

      />

      <DeleteServiceModal

        isOpen={
          Boolean(
            deletingService,
          )
        }

        service={
          deletingService
        }

        onClose={() =>
          setDeletingService(
            null,
          )
        }

        onConfirm={
          handleDeleteService
        }

      />

    </ServicesContainer>

  );

};

export default Services;