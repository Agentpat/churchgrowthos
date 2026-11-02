import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaUserPlus,
} from "react-icons/fa";

import {
  MembersContainer as VisitorsContainer,
  Header,
  HeaderContent,
  Title,
  Description,
  AddButton,
  Content,
  ErrorBox,
} from "../Members/Members.styles";

import VisitorStats from "./components/VisitorStats/VisitorStats";
import VisitorFilters from "./components/VisitorFilters/VisitorFilters";
import VisitorTable from "./components/VisitorTable/VisitorTable";
import VisitorProfile from "./VisitorProfile/VisitorProfile";
import AddVisitorModal from "./components/AddVisitorModal/AddVisitorModal";
import EditVisitorModal from "./components/EditVisitorModal";
import ConvertVisitorModal from "./components/ConvertVisitorModal";
import visitorService from "../../services/visitorService";

import Loader from "../../components/ui/Loader/Loader";

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [editingVisitor, setEditingVisitor] = useState(null);

  const [convertingVisitor, setConvertingVisitor] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    source: "",
    followUpStage: "",
  });

  // =====================================
  // Load Visitors
  // =====================================

  const loadVisitors = async () => {
    try {
      setLoading(true);

      setError("");

      const response =
        await visitorService.getVisitors();

      const visitorList =
        response?.data?.visitors ||

        response?.visitors ||

        response?.data ||

        [];

      setVisitors(visitorList);
    }

    catch (error) {
      setError(
        error.response?.data?.message ||

        "Unable to load visitors.",
      );
    }

    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  // =====================================
  // Create Visitor
  // =====================================

  const handleCreateVisitor = async (visitorData) => {
    try {
      await visitorService.createVisitor(
        visitorData,
      );

      // Close modal
      setShowAddModal(false);

      // Refresh table
      await loadVisitors();
    }

    catch (error) {
      throw error;
    }
  };

  // =====================================
  // Update Visitor
  // =====================================

  const handleUpdateVisitor = async (
    id,
    visitorData,
  ) => {
    await visitorService.updateVisitor(
      id,
      visitorData,
    );

    await loadVisitors();

    setEditingVisitor(null);

    if (
      selectedVisitor &&
      selectedVisitor._id === id
    ) {
      const updated =
        await visitorService.getVisitorById(id);

      setSelectedVisitor(
        updated.data || updated,
      );
    }
  };

  // =====================================
  // Archive Visitor
  // =====================================

  const handleArchiveVisitor = async (id) => {
    try {
      await visitorService.archiveVisitor(id);

      setSelectedVisitor(null);

      await loadVisitors();
    }

    catch (error) {
      console.error(error);
    }
  };

  // =====================================
  // Convert Visitor
  // =====================================

  const handleConvertVisitor = async (visitor) => {
    try {
      await visitorService.convertVisitor(
        visitor._id,
      );

      setConvertingVisitor(null);

      setSelectedVisitor(null);

      await loadVisitors();
    }

    catch (error) {
      throw error;
    }
  };

  // =====================================
  // Filter Visitors
  // =====================================

  const filteredVisitors = useMemo(() => {
    return visitors.filter((visitor) => {
      const search =
        filters.search.toLowerCase();

      const fullName =
        `${visitor.firstName || ""} ${visitor.lastName || ""}`
          .toLowerCase();

      const matchesSearch =
        fullName.includes(search) ||

        visitor.phone
          ?.toLowerCase()
          .includes(search) ||

        visitor.email
          ?.toLowerCase()
          .includes(search);

      const matchesStatus =
        !filters.status ||

        visitor.status === filters.status;

      const matchesSource =
        !filters.source ||

        visitor.source === filters.source;

      const matchesStage =
        !filters.followUpStage ||

        visitor.followUpStage ===
        filters.followUpStage;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource &&
        matchesStage
      );
    });
  }, [visitors, filters]);

  // =====================================
  // Stats
  // =====================================

  const totalVisitors = visitors.length;

  const convertedVisitors =
    visitors.filter(
      (visitor) =>
        visitor.convertedToMember,
    ).length;

  const followingUpVisitors =
    visitors.filter(
      (visitor) =>
        visitor.status ===
        "FOLLOWING_UP",
    ).length;

  const newVisitorsThisMonth =
    visitors.filter((visitor) => {
      if (!visitor.createdAt) {
        return false;
      }

      const created =
        new Date(visitor.createdAt);

      const today =
        new Date();

      return (
        created.getMonth() ===
        today.getMonth() &&

        created.getFullYear() ===
        today.getFullYear()
      );
    }).length;

  if (loading) {
    return (
      <Loader
        text="Loading visitors..."
      />
    );
  }

  if (error) {
    return (
      <ErrorBox>
        {error}
      </ErrorBox>
    );
  }

  return (
    <VisitorsContainer>
      <Header>
        <HeaderContent>
          <Title>
            Visitors
          </Title>

          <Description>
            Manage first-time guests and
            follow them through their
            journey.
          </Description>
        </HeaderContent>

        <AddButton
          onClick={() =>
            setShowAddModal(true)
          }
        >
          <FaUserPlus />
          Add Visitor
        </AddButton>
      </Header>

      <Content>
        <VisitorStats
          total={totalVisitors}
          newThisMonth={
            newVisitorsThisMonth
          }
          followingUp={
            followingUpVisitors
          }
          converted={
            convertedVisitors
          }
        />

        <VisitorFilters
          filters={filters}
          setFilters={setFilters}
        />

        <VisitorTable
          visitors={filteredVisitors}
          onView={setSelectedVisitor}
        />
      </Content>

      {selectedVisitor && (
        <VisitorProfile
          visitor={selectedVisitor}
          onClose={() =>
            setSelectedVisitor(null)
          }
          onEdit={(visitor) => {
            // Close the profile first
            setSelectedVisitor(null);

            // Open the edit modal on the next frame
            requestAnimationFrame(() => {
              setEditingVisitor(visitor);
            });
          }}
          onArchive={() =>
            handleArchiveVisitor(
              selectedVisitor._id,
            )
          }
          onConvert={(visitor) => {
            setSelectedVisitor(null);

            requestAnimationFrame(() => {
              setConvertingVisitor(visitor);
            });
          }}
          onRefresh={loadVisitors}
        />
      )}

      <AddVisitorModal
        isOpen={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
        onSuccess={
          handleCreateVisitor
        }
      />

      <EditVisitorModal
        isOpen={Boolean(editingVisitor)}
        visitor={editingVisitor}
        onClose={() => {
          setEditingVisitor(null);
        }}
        onSuccess={handleUpdateVisitor}
      />

      <ConvertVisitorModal
        isOpen={Boolean(convertingVisitor)}
        visitor={convertingVisitor}
        onClose={() =>
          setConvertingVisitor(null)
        }
        onSuccess={handleConvertVisitor}
      />
    </VisitorsContainer>
  );
};

export default Visitors;