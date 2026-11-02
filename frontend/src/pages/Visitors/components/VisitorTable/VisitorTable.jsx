import {
  FaEye,
} from "react-icons/fa";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  VisitorInfo,
  Avatar,
  StatusBadge,
  FollowUpBadge,
  ActionButton,
  EmptyState,
} from "./VisitorTable.styles";

const VisitorTable = ({
  visitors = [],
  onView,
}) => {

  return (

    <TableContainer>

      {

        visitors.length === 0

          ? (

            <EmptyState>

              No visitors found.

            </EmptyState>

          )

          : (

            <Table>

              <TableHead>

                <TableRow>

                  <TableHeader>

                    Visitor

                  </TableHeader>

                  <TableHeader>

                    Phone

                  </TableHeader>

                  <TableHeader>

                    Source

                  </TableHeader>

                  <TableHeader>

                    Visit Date

                  </TableHeader>

                  <TableHeader>

                    Status

                  </TableHeader>

                  <TableHeader>

                    Follow Up

                  </TableHeader>

                  <TableHeader>

                    Action

                  </TableHeader>

                </TableRow>

              </TableHead>



              <TableBody>

                {

                  visitors.map((visitor) => (

                    <TableRow

                      key={visitor._id}

                    >

                      <TableCell>

                        <VisitorInfo>

                          <Avatar>

                            {

                              visitor.firstName
                                ?.charAt(0)
                                .toUpperCase()

                            }

                          </Avatar>

                          <div>

                            <strong>

                              {

                                visitor.firstName

                              }{" "}

                              {

                                visitor.lastName

                              }

                            </strong>

                            <br />

                            <small>

                              {

                                visitor.email || "-"

                              }

                            </small>

                          </div>

                        </VisitorInfo>

                      </TableCell>



                      <TableCell>

                        {

                          visitor.phone || "-"

                        }

                      </TableCell>



                      <TableCell>

                        {

                          visitor.source

                        }

                      </TableCell>



                      <TableCell>

                        {

                          visitor.visitDate

                            ?

                            new Date(

                              visitor.visitDate

                            ).toLocaleDateString()

                            :

                            "-"

                        }

                      </TableCell>



                      <TableCell>

                        <StatusBadge

                          status={visitor.status}

                        >

                          {

                            visitor.status

                              ?.replaceAll("_", " ")

                          }

                        </StatusBadge>

                      </TableCell>



                      <TableCell>

                        <FollowUpBadge

                          stage={visitor.followUpStage}

                        >

                          {

                            visitor.followUpStage

                              ?.replaceAll("_", " ")

                          }

                        </FollowUpBadge>

                      </TableCell>



                      <TableCell>

                        <ActionButton

                          onClick={() =>

                            onView(visitor)

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

export default VisitorTable;