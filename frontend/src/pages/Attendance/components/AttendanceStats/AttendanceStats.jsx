import {
    FaUsers,
    FaUserCheck,
    FaUserPlus,
    FaChartLine,
} from "react-icons/fa";

import StatCard from "../../../../components/ui/StatsCard/StatsCard";
import StatsGrid from "../../../../components/ui/StatsGrid/StatsGrid";


const AttendanceStats = ({
    total = 0,
    present = 0,
    absent = 0,
    visitors = 0,
    expectedMembers = 0,
    members = 0,
    attendanceRate = 0,
}) => {

    // =====================================
    // Resolve Member Count
    // =====================================

    const memberPresent =
        Number(members) ||
        Number(present) ||
        0;


    // =====================================
    // Resolve Expected Members
    // =====================================

    const expected =
        Number(expectedMembers) ||
        Number(total) ||
        0;


    // =====================================
    // Resolve Visitor Count
    // =====================================

    const visitorCount =
        Number(visitors) ||
        0;


    // =====================================
    // Resolve Total Present
    // =====================================

    const totalPresent =
        memberPresent +
        visitorCount;


    // =====================================
    // Resolve Absent
    // =====================================

    const calculatedAbsent =
        Math.max(
            expected - memberPresent,
            0,
        );


    const actualAbsent =
        expected > 0
            ? calculatedAbsent
            : Number(absent) || 0;


    // =====================================
    // Resolve Attendance Rate
    // =====================================

    const calculatedRate =
        expected > 0
            ? Number(
                (
                    (memberPresent /
                        expected) *
                    100
                ).toFixed(1),
            )
            : Number(attendanceRate) || 0;


    // =====================================
    // Health Status
    // =====================================

    const rateStatus =
        calculatedRate >= 80
            ? "Healthy"
            : calculatedRate >= 60
                ? "Average"
                : "Needs attention";


    const rateType =
        calculatedRate >= 80
            ? "positive"
            : calculatedRate >= 60
                ? "warning"
                : "negative";


    return (

        <StatsGrid>

            {/* =================================
                Expected
            ================================== */}

            <StatCard
                label="Expected"
                value={expected.toLocaleString()}
                icon={<FaUsers />}
                subtitle="Active members"
            />


            {/* =================================
                Present
            ================================== */}

            <StatCard
                label="Present"
                value={totalPresent.toLocaleString()}
                icon={<FaUserCheck />}
                subtitle={
                    visitorCount > 0
                        ? `${memberPresent} members checked in`
                        : "Members checked in"
                }
                trend={`${calculatedRate}%`}
                trendType="positive"
            />


            {/* =================================
                Visitors
            ================================== */}

            <StatCard
                label="Visitors"
                value={visitorCount.toLocaleString()}
                icon={<FaUserPlus />}
                subtitle={
                    visitorCount === 1
                        ? "Visitor checked in"
                        : "Visitors checked in"
                }
                trend={
                    visitorCount > 0
                        ? "New people"
                        : "None yet"
                }
                trendType={
                    visitorCount > 0
                        ? "positive"
                        : "neutral"
                }
            />


            {/* =================================
                Attendance Rate
            ================================== */}

            <StatCard
                label="Attendance Rate"
                value={`${calculatedRate}%`}
                icon={<FaChartLine />}
                subtitle="Members present"
                trend={rateStatus}
                trendType={rateType}
            />

        </StatsGrid>

    );
};


export default AttendanceStats;