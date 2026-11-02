import {
    FaUsers,
    FaUserCheck,
    FaPhoneAlt,
    FaCalendarPlus,
} from "react-icons/fa";

import {
    StatsGrid,
    StatCard,
    IconWrapper,
    StatContent,
    StatValue,
    StatLabel,
} from "./VisitorStats.styles";

const VisitorStats = ({
    total = 0,
    newThisMonth = 0,
    followingUp = 0,
    converted = 0,
}) => {

    const stats = [

        {
            label: "Total Visitors",
            value: total,
            icon: <FaUsers />,
            color: "#2563eb",
        },

        {
            label: "New This Month",
            value: newThisMonth,
            icon: <FaCalendarPlus />,
            color: "#7c3aed",
        },

        {
            label: "Following Up",
            value: followingUp,
            icon: <FaPhoneAlt />,
            color: "#f59e0b",
        },

        {
            label: "Converted",
            value: converted,
            icon: <FaUserCheck />,
            color: "#16a34a",
        },

    ];

    return (

        <StatsGrid>

            {

                stats.map((stat) => (

                    <StatCard
                        key={stat.label}
                    >

                        <IconWrapper
                            color={stat.color}
                        >

                            {stat.icon}

                        </IconWrapper>

                        <StatContent>

                            <StatValue>

                                {stat.value}

                            </StatValue>

                            <StatLabel>

                                {stat.label}

                            </StatLabel>

                        </StatContent>

                    </StatCard>

                ))

            }

        </StatsGrid>

    );

};

export default VisitorStats;