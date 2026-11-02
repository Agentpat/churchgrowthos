import {
  useEffect,
  useState,
} from "react";


import {
  FaUsers,
  FaUserPlus,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";


import {
  useAuth,
} from "../../context/AuthContext";


import dashboardService from "../../services/dashboardService";


import Loader from "../../components/ui/Loader/Loader";


import WelcomeCard from "./components/WelcomeCard/WelcomeCard";
import StatCard from "./components/StatCard/StatCard";
import FinanceSummary from "./components/FinanceSummary/FinanceSummary";
import GrowthInsights from "./components/GrowthInsights/components/GrowthInsights";
import ChurchHealthScore from "./components/ChurchHealthScore/ChurchHealthScore";
import QuickActions from "./components/QuickActions/QuickActions";


import {
  DashboardContainer,
  StatsGrid,
  ErrorBox,
} from "./Dashboard.styles";





const Dashboard = () => {


  const {
    user,
  } = useAuth();





  const [
    analytics,
    setAnalytics,
  ] = useState(null);





  const [
    loading,
    setLoading,
  ] = useState(true);





  const [
    error,
    setError,
  ] = useState("");







  useEffect(() => {


    const loadDashboard = async () => {


      try {


        setLoading(true);


        const response =
          await dashboardService
            .getDashboardAnalytics();



        setAnalytics(
          response.data
        );



      } catch (error) {


        setError(

          error.response?.data?.message ||

          "Unable to load dashboard data."

        );


      } finally {


        setLoading(false);


      }


    };



    loadDashboard();



  }, []);








  if (loading) {


    return (

      <Loader

        text="Loading dashboard..."

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







  const stats = [


    {


      title:
        "Total Members",


      value:
        analytics?.members?.total || 0,


      description:

        `${analytics?.members?.newThisMonth || 0} new members this month`,


      icon:
        FaUsers,


    },





    {


      title:
        "Visitors",


      value:
        analytics?.visitors?.total || 0,


      description:

        `${analytics?.visitors?.converted || 0} converted to members`,


      icon:
        FaUserPlus,


    },





    {


      title:
        "Attendance",


      value:
        analytics?.attendance?.total || 0,


      description:

        "Recorded attendance entries",


      icon:
        FaCalendarCheck,


    },





    {


      title:
        "Balance",


      value:

        `₦${(
          analytics?.finance?.balance || 0
        ).toLocaleString("en-NG")}`,



      description:

        "Current church balance",


      icon:
        FaMoneyBillWave,


    },


  ];









  return (


    <DashboardContainer>





      <WelcomeCard

        firstName={
          user?.firstName
        }

      />








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









      <FinanceSummary


        finance={
          analytics?.finance
        }


      />









      <GrowthInsights


        analytics={
          analytics
        }


      />









      <ChurchHealthScore


        churchHealth={
          analytics?.churchHealth
        }


      />









      <QuickActions />





    </DashboardContainer>


  );


};







export default Dashboard;