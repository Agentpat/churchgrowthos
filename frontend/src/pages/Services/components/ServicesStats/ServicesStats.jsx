import {
  FaCalendarAlt,
  FaClock,
  FaPlayCircle,
  FaCheckCircle,
} from "react-icons/fa";

import StatCard from "../../../../components/ui/StatsCard/StatsCard";
import StatsGrid from "../../../../components/ui/StatsGrid/StatsGrid";

const ServicesStats = ({
  services = [],
}) => {

  const totalServices =
    services.length;

  const scheduledServices =
    services.filter(
      (service) =>
        service.status === "SCHEDULED",
    ).length;

  const liveServices =
    services.filter(
      (service) =>
        service.status === "LIVE",
    ).length;

  const completedServices =
    services.filter(
      (service) =>
        service.status === "COMPLETED",
    ).length;

  return (

    <StatsGrid>

      {/* =====================================
                Total Services
            ====================================== */}

      <StatCard
        label="Total Services"
        value={totalServices}
        icon={<FaCalendarAlt />}
        trend={
          totalServices > 0
            ? "Configured"
            : "None yet"
        }
        trendType={
          totalServices > 0
            ? "positive"
            : "default"
        }
      />

      {/* =====================================
                Scheduled
            ====================================== */}

      <StatCard
        label="Scheduled"
        value={scheduledServices}
        icon={<FaClock />}
        trend={
          scheduledServices > 0
            ? "Upcoming"
            : "None"
        }
        trendType={
          scheduledServices > 0
            ? "positive"
            : "default"
        }
      />

      {/* =====================================
                Live
            ====================================== */}

      <StatCard
        label="Live Now"
        value={liveServices}
        icon={<FaPlayCircle />}
        trend={
          liveServices > 0
            ? "In progress"
            : "No live service"
        }
        trendType={
          liveServices > 0
            ? "positive"
            : "default"
        }
      />

      {/* =====================================
                Completed
            ====================================== */}

      <StatCard
        label="Completed"
        value={completedServices}
        icon={<FaCheckCircle />}
        trend={
          completedServices > 0
            ? "Completed"
            : "None yet"
        }
        trendType={
          completedServices > 0
            ? "positive"
            : "default"
        }
      />

    </StatsGrid>

  );

};

export default ServicesStats;