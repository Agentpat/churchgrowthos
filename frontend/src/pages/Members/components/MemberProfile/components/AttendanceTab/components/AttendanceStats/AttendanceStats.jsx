import {
  StatsContainer,
  StatCard,
  Label,
  Value,
} from "./AttendanceStats.styles";



const AttendanceStats = ({
  attendance = [],
}) => {



  const total =
    attendance.length;





  const thisMonth =
    attendance.filter((item) => {


      const attendanceDate =
        item.serviceId?.serviceDate ||
        item.checkedInAt;



      if (!attendanceDate) {
        return false;
      }



      const date =
        new Date(attendanceDate);



      const now =
        new Date();



      return (
        date.getMonth() === now.getMonth()
        &&
        date.getFullYear() === now.getFullYear()
      );


    }).length;








  const lastAttendance =
    attendance[0]?.serviceId?.serviceDate ||
    attendance[0]?.checkedInAt ||
    null;








  return (

    <StatsContainer>



      <StatCard>

        <Label>
          Total Services
        </Label>


        <Value>
          {total}
        </Value>


      </StatCard>








      <StatCard>

        <Label>
          This Month
        </Label>


        <Value>
          {thisMonth}
        </Value>


      </StatCard>








      <StatCard>

        <Label>
          Last Attendance
        </Label>


        <Value>

          {
            lastAttendance

              ?

              new Date(
                lastAttendance
              )
                .toLocaleDateString()

              :

              "-"
          }

        </Value>


      </StatCard>



    </StatsContainer>

  );

};


export default AttendanceStats;