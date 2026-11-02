import {
  useEffect,
  useState,
} from "react";


import attendanceService from "../../../../../../services/attendanceService";


import AttendanceStats from "./components/AttendanceStats/AttendanceStats";
import AttendanceHistory from "./components/AttendanceHistory/AttendanceHistory";


import {
  Container,
  Title,
  Description,
  Loader,
  Empty,
  Error,
} from "./AttendanceTab.styles";



const AttendanceTab = ({
  member,
}) => {


  const [
    attendance,
    setAttendance,
  ] = useState([]);



  const [
    loading,
    setLoading,
  ] = useState(true);



  const [
    error,
    setError,
  ] = useState("");





  useEffect(() => {


    const loadAttendance = async () => {


      try {


        setLoading(true);

        setError("");



        const response =
          await attendanceService.getAttendanceByMember(
            member._id
          );



        setAttendance(
          response?.data || []
        );



      } catch (error) {


        console.error(
          "Failed to load attendance",
          error
        );


        setError(
          "Unable to load attendance history."
        );


      } finally {


        setLoading(false);


      }


    };



    if (member?._id) {

      loadAttendance();

    }


  }, [
    member
  ]);






  if (loading) {

    return (

      <Container>

        <Loader>
          Loading attendance...
        </Loader>

      </Container>

    );

  }







  if (error) {

    return (

      <Container>

        <Error>
          {error}
        </Error>

      </Container>

    );

  }








  if (!attendance.length) {

    return (

      <Container>

        <Title>
          Attendance
        </Title>


        <Description>
          Track member attendance and engagement history.
        </Description>


        <Empty>
          No attendance records found for this member.
        </Empty>


      </Container>

    );

  }







  return (

    <Container>


      <Title>
        Attendance
      </Title>



      <Description>
        Track member attendance and engagement history.
      </Description>





      <AttendanceStats
        attendance={attendance}
      />






      <AttendanceHistory
        attendance={attendance}
      />



    </Container>

  );

};



export default AttendanceTab;