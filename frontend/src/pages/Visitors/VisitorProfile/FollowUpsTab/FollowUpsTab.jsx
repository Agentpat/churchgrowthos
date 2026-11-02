import {
  useEffect,
  useState,
} from "react";

import visitorService from "../../../../services/visitorService";

import Loader from "../../../../components/ui/Loader/Loader";

import FollowUpTimeline from "./components/FollowUpTimeline/FollowUpTimeline";
import EmptyFollowUps from "./components/EmptyFollowUp/EmptyFollowUps";

const FollowUpsTab = ({ visitor }) => {
  const [loading, setLoading] = useState(true);

  const [followUps, setFollowUps] = useState([]);

  const [error, setError] = useState("");

  // =====================================
  // Load Follow Ups
  // =====================================

  const loadFollowUps = async () => {
    if (!visitor?._id) {
      return;
    }

    try {
      setLoading(true);

      setError("");

      const response =
        await visitorService.getVisitorFollowUps(
          visitor._id,
        );

      setFollowUps(response?.data || []);
    }

    catch (error) {
      setError(
        error.response?.data?.message ||

        "Unable to load follow-ups.",
      );
    }

    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFollowUps();
  }, [visitor]);

  // =====================================
  // Mark Follow Up As Sent
  // =====================================

  const handleSent = async (followUp) => {
    await visitorService.markFollowUpSent(
      followUp._id,
    );

    await loadFollowUps();
  };

  // =====================================
  // Mark Follow Up As Failed
  // =====================================

  const handleFailed = async (followUp) => {
    const reason = window.prompt(
      "Reason for failure?",
    );

    if (reason === null) {
      return;
    }

    await visitorService.markFollowUpFailed(
      followUp._id,

      reason,
    );

    await loadFollowUps();
  };

  if (loading) {
    return (
      <Loader
        text="Loading follow ups..."
      />
    );
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  if (!followUps.length) {
    return <EmptyFollowUps />;
  }

  return (
    <FollowUpTimeline
      followUps={followUps}
      onSent={handleSent}
      onFailed={handleFailed}
    />
  );
};

export default FollowUpsTab;