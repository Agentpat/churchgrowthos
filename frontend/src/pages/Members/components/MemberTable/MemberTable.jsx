import {
  FaEye,
} from "react-icons/fa";


import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  MemberInfo,
  Avatar,
  StatusBadge,
  EngagementBadge,
  ActionButton,
  EmptyState,
} from "./MemberTable.styles";




const MemberTable = ({
  members = [],
  onView,
}) => {


  const getEngagement = (member) => {

    if (member.attendanceCount >= 5) {
      return "Engaged";
    }


    if (member.attendanceCount > 0) {
      return "Active";
    }


    return "Needs Follow Up";

  };



  return (

    <TableContainer>


      {
        members.length === 0 ? (

          <EmptyState>
            No members found.
          </EmptyState>

        ) : (


          <Table>


            <TableHead>

              <TableRow>


                <TableHeader>
                  Member
                </TableHeader>


                <TableHeader>
                  Phone
                </TableHeader>


                <TableHeader>
                  Type
                </TableHeader>


                <TableHeader>
                  Attendance
                </TableHeader>


                <TableHeader>
                  Groups
                </TableHeader>


                <TableHeader>
                  Engagement
                </TableHeader>


                <TableHeader>
                  Status
                </TableHeader>


                <TableHeader>
                  Action
                </TableHeader>


              </TableRow>

            </TableHead>




            <TableBody>


              {
                members.map((member) => (


                  <TableRow
                    key={member._id}
                  >



                    <TableCell>


                      <MemberInfo>


                        <Avatar>

                          {
                            member.firstName
                              ?.charAt(0)
                              .toUpperCase()
                          }

                        </Avatar>



                        <span>

                          {member.firstName}

                          {" "}

                          {member.lastName}

                        </span>


                      </MemberInfo>


                    </TableCell>





                    <TableCell>

                      {
                        member.phone || "-"
                      }

                    </TableCell>





                    <TableCell>

                      {
                        member.membershipStatus || "-"
                      }

                    </TableCell>





                    <TableCell>

                      {
                        member.attendanceCount || 0
                      }

                      {" services"}

                    </TableCell>





                    <TableCell>

                      {
                        member.groupsCount || 0
                      }

                      {" groups"}

                    </TableCell>





                    <TableCell>


                      <EngagementBadge>

                        {
                          getEngagement(member)
                        }

                      </EngagementBadge>


                    </TableCell>





                    <TableCell>


                      <StatusBadge

                        active={
                          member.isActive
                        }

                      >

                        {
                          member.isActive
                            ?
                            "Active"
                            :
                            "Inactive"
                        }


                      </StatusBadge>


                    </TableCell>





                    <TableCell>


                      <ActionButton

                        onClick={() =>
                          onView(member)
                        }

                      >

                        <FaEye />

                        View


                      </ActionButton>


                    </TableCell>


                  </TableRow>


                ))
              }


            </TableBody>


          </Table>


        )
      }


    </TableContainer>

  );

};


export default MemberTable;