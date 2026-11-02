import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaChartLine,
} from "react-icons/fa";


import StatCard from "../../../Dashboard/components/StatCard/StatCard";


import {
  StatsGrid,
} from "./MemberStats.styles";





const MemberStats = ({
  total = 0,
  active = 0,
  newThisMonth = 0,
  engaged = 0,
}) => {



  const stats = [


    {
      title: "Total Members",

      value: total,

      description:
        "Registered members",

      icon: FaUsers,

    },





    {
      title: "Active Members",

      value: active,

      description:
        "Currently active",

      icon: FaUserCheck,

    },







    {
      title: "New This Month",

      value: newThisMonth,

      description:
        "New members joined",

      icon: FaUserPlus,

    },







    {
      title: "Engaged Members",

      value: engaged,

      description:
        "Attended services",

      icon: FaChartLine,

    },


  ];








  return (

    <StatsGrid>

      {
        stats.map((stat) => (

          <StatCard

            key={
              stat.title
            }

            title={
              stat.title
            }

            value={
              stat.value
            }

            description={
              stat.description
            }

            icon={
              stat.icon
            }

          />

        ))
      }


    </StatsGrid>

  );


};





export default MemberStats;