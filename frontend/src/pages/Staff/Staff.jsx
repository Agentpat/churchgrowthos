import {
  useMemo,
  useState,
} from "react";

import useStaff from "./hooks/useStaff";

import StaffOverview from "./components/StaffOverview/StaffOverview";
import StaffFilters from "./components/StaffFilters/StaffFilters";
import StaffTable from "./components/StaffTable/StaffTable";
import StaffModal from "./components/StaffModal/StaffModal";
import StaffDetails from "./components/StaffDetails/StaffDetails";

import {
  Page,
  PageContainer,
  PageHeader,
  HeaderContent,
  Title,
  Description,
  HeaderActions,

  ContentCard,
  ContentHeader,
  ContentHeaderText,
  SectionTitle,
  SectionDescription,

  EmptyState,
  EmptyStateTitle,
  EmptyStateText,

  Pagination,
  PaginationInfo,
  PaginationActions,
  PaginationButton,

  LoadingState,
  ErrorState,
  ErrorText,

  PrimaryButton,
  SecondaryButton,
} from "./Staff.styles";


// =====================================
// Staff Page
// =====================================

const Staff = () => {

  // =====================================
  // Staff Hook
  // =====================================

  const {
    staff,
    summary,
    pagination,

    loading,
    error,

    createStaff,
    updateStaff,
    deleteStaff,

    changePage,
    applyFilters,
    reload,

  } = useStaff();


  // =====================================
  // Filter State
  // =====================================

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    department,
    setDepartment,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("");


  // =====================================
  // Create / Edit Modal
  // =====================================

  const [
    showStaffModal,
    setShowStaffModal,
  ] = useState(false);

  const [
    modalMode,
    setModalMode,
  ] = useState("create");

  const [
    selectedStaff,
    setSelectedStaff,
  ] = useState(null);


  // =====================================
  // View Details Modal
  // =====================================

  const [
    showStaffDetails,
    setShowStaffDetails,
  ] = useState(false);

  const [
    viewingStaff,
    setViewingStaff,
  ] = useState(null);


  // =====================================
  // Action Loading
  // =====================================

  const [
    actionLoading,
    setActionLoading,
  ] = useState(false);


  // =====================================
  // Department Options
  // =====================================

  const departments = useMemo(
    () => {

      if (!Array.isArray(staff)) {
        return [];
      }


      const values = staff
        .map(
          (staffMember) =>
            staffMember?.department,
        )
        .filter(Boolean);


      return [
        ...new Set(values),
      ].sort();

    },
    [staff],
  );


  // =====================================
  // Open Create Modal
  // =====================================

  const handleOpenStaffModal = () => {

    setSelectedStaff(null);

    setModalMode("create");

    setShowStaffModal(true);

  };


  // =====================================
  // Open Edit Modal
  // =====================================

  const handleEditStaff = (
    staffMember,
  ) => {

    setSelectedStaff(
      staffMember,
    );

    setModalMode("edit");

    setShowStaffModal(true);

  };


  // =====================================
  // Open View Details
  // =====================================

  const handleViewStaff = (
    staffMember,
  ) => {

    setViewingStaff(
      staffMember,
    );

    setShowStaffDetails(
      true,
    );

  };


  // =====================================
  // Close View Details
  // =====================================

  const handleCloseStaffDetails =
    () => {

      setShowStaffDetails(
        false,
      );

      setViewingStaff(
        null,
      );

    };


  // =====================================
  // Close Create / Edit Modal
  // =====================================

  const handleCloseStaffModal = () => {

    if (actionLoading) {
      return;
    }


    setShowStaffModal(
      false,
    );

    setSelectedStaff(
      null,
    );

    setModalMode(
      "create",
    );

  };


  // =====================================
  // Submit Staff
  // =====================================

  const handleSubmitStaff = async (
    data,
  ) => {

    try {

      setActionLoading(
        true,
      );


      // =================================
      // Create
      // =================================

      if (
        modalMode ===
        "create"
      ) {

        await createStaff(
          data,
        );

      }


      // =================================
      // Edit
      // =================================

      if (
        modalMode ===
        "edit"
      ) {

        const staffId =
          selectedStaff?._id ||
          selectedStaff?.id;


        if (!staffId) {

          throw new Error(
            "Staff ID is missing.",
          );

        }


        await updateStaff(
          staffId,
          data,
        );

      }


      // =================================
      // Close Modal
      // =================================

      setShowStaffModal(
        false,
      );

      setSelectedStaff(
        null,
      );

      setModalMode(
        "create",
      );

    } catch (err) {

      console.error(
        "STAFF SUBMIT FAILED:",
        err,
      );

      throw err;

    } finally {

      setActionLoading(
        false,
      );

    }

  };


  // =====================================
  // Archive Staff
  // =====================================

  const handleArchiveStaff =
    async (
      staffMember,
    ) => {

      const staffId =
        staffMember?._id ||
        staffMember?.id;


      if (!staffId) {

        console.error(
          "STAFF ID IS MISSING.",
        );

        return;

      }


      // =================================
      // Member Information
      // =================================

      const member =
        staffMember?.memberId ||
        {};


      const memberName =
        member?.fullName ||
        `${member?.firstName || ""} ${member?.lastName || ""
          }`.trim() ||
        staffMember?.fullName ||
        "this staff member";


      // =================================
      // Confirm
      // =================================

      const confirmed =
        window.confirm(
          `Archive ${memberName}?`,
        );


      if (!confirmed) {
        return;
      }


      try {

        setActionLoading(
          true,
        );


        await deleteStaff(
          staffId,
        );


        // =================================
        // Close Details If Open
        // =================================

        if (
          viewingStaff?._id ===
          staffId
        ) {

          setShowStaffDetails(
            false,
          );

          setViewingStaff(
            null,
          );

        }

      } catch (err) {

        console.error(
          "ARCHIVE STAFF FAILED:",
          err,
        );

      } finally {

        setActionLoading(
          false,
        );

      }

    };


  // =====================================
  // Apply Filters
  // =====================================

  const handleApplyFilters =
    async () => {

      await applyFilters({

        search:
          search.trim(),

        department,

        status,

      });

    };


  // =====================================
  // Clear Filters
  // =====================================

  const handleClearFilters =
    async () => {

      setSearch("");

      setDepartment("");

      setStatus("");


      await applyFilters({});

    };


  // =====================================
  // Loading State
  // =====================================

  if (
    loading &&
    (!Array.isArray(staff) ||
      staff.length === 0)
  ) {

    return (

      <Page>

        <PageContainer>

          <PageHeader>

            <HeaderContent>

              <Title>
                Staff
              </Title>

              <Description>
                Manage your church staff
                and ministry team.
              </Description>

            </HeaderContent>

          </PageHeader>


          <LoadingState>
            Loading staff...
          </LoadingState>

        </PageContainer>

      </Page>

    );

  }


  // =====================================
  // Error State
  // =====================================

  if (
    error &&
    (!Array.isArray(staff) ||
      staff.length === 0)
  ) {

    return (

      <Page>

        <PageContainer>

          <PageHeader>

            <HeaderContent>

              <Title>
                Staff
              </Title>

              <Description>
                Manage your church staff
                and ministry team.
              </Description>

            </HeaderContent>

          </PageHeader>


          <ErrorState>

            <ErrorText>
              {error}
            </ErrorText>


            <SecondaryButton
              type="button"
              onClick={reload}
            >
              Try Again
            </SecondaryButton>

          </ErrorState>

        </PageContainer>

      </Page>

    );

  }


  // =====================================
  // Render
  // =====================================

  return (

    <Page>

      <PageContainer>

        {/* =================================
            Page Header
        ================================= */}

        <PageHeader>

          <HeaderContent>

            <Title>
              Staff
            </Title>

            <Description>
              Manage your church staff
              and ministry team.
            </Description>

          </HeaderContent>


          <HeaderActions>

            <PrimaryButton
              type="button"
              onClick={
                handleOpenStaffModal
              }
              disabled={
                actionLoading
              }
            >
              Add Staff
            </PrimaryButton>

          </HeaderActions>

        </PageHeader>


        {/* =================================
            Staff Overview
        ================================= */}

        <StaffOverview
          summary={summary}
        />


        {/* =================================
            Staff Content
        ================================= */}

        <ContentCard>

          {/* =================================
              Content Header
          ================================= */}

          <ContentHeader>

            <ContentHeaderText>

              <SectionTitle>
                Church Staff
              </SectionTitle>

              <SectionDescription>
                View and manage members
                of your church staff
                and ministry team.
              </SectionDescription>

            </ContentHeaderText>

          </ContentHeader>


          {/* =================================
              Filters
          ================================= */}

          <StaffFilters
            search={
              search
            }

            department={
              department
            }

            status={
              status
            }

            departments={
              departments
            }

            loading={
              loading ||
              actionLoading
            }

            onSearchChange={
              setSearch
            }

            onDepartmentChange={
              setDepartment
            }

            onStatusChange={
              setStatus
            }

            onApply={
              handleApplyFilters
            }

            onClear={
              handleClearFilters
            }
          />


          {/* =================================
              Staff Table
          ================================= */}

          {staff.length === 0 ? (

            <EmptyState>

              <EmptyStateTitle>
                No staff found
              </EmptyStateTitle>

              <EmptyStateText>
                There are currently
                no staff records to
                display.
              </EmptyStateText>

            </EmptyState>

          ) : (

            <StaffTable
              staff={
                staff
              }

              loading={
                loading ||
                actionLoading
              }

              onView={
                handleViewStaff
              }

              onEdit={
                handleEditStaff
              }

              onArchive={
                handleArchiveStaff
              }
            />

          )}


          {/* =================================
              Pagination
          ================================= */}

          {pagination?.pages > 1 && (

            <Pagination>

              <PaginationInfo>

                Page{" "}
                {pagination.page}{" "}
                of{" "}
                {pagination.pages}

              </PaginationInfo>


              <PaginationActions>

                <PaginationButton
                  type="button"

                  disabled={
                    pagination.page <=
                    1 ||
                    loading ||
                    actionLoading
                  }

                  onClick={() =>
                    changePage(
                      pagination.page -
                      1,
                    )
                  }
                >
                  Previous
                </PaginationButton>


                <PaginationButton
                  type="button"

                  disabled={
                    pagination.page >=
                    pagination.pages ||
                    loading ||
                    actionLoading
                  }

                  onClick={() =>
                    changePage(
                      pagination.page +
                      1,
                    )
                  }
                >
                  Next
                </PaginationButton>

              </PaginationActions>

            </Pagination>

          )}

        </ContentCard>


        {/* =================================
            Create / Edit Staff Modal
        ================================= */}

        <StaffModal
          open={
            showStaffModal
          }

          mode={
            modalMode
          }

          staff={
            selectedStaff
          }

          loading={
            loading ||
            actionLoading
          }

          error={
            error
          }

          onClose={
            handleCloseStaffModal
          }

          onSubmit={
            handleSubmitStaff
          }
        />


        {/* =================================
            View Staff Details
        ================================= */}

        <StaffDetails
          open={
            showStaffDetails
          }

          staff={
            viewingStaff
          }

          onClose={
            handleCloseStaffDetails
          }
        />

      </PageContainer>

    </Page>

  );

};

export default Staff;