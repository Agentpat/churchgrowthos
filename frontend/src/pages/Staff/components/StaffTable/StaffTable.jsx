import {
  TableWrapper,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  StaffInfo,
  StaffName,
  StaffEmail,
  DepartmentText,
  RoleText,
  PhoneText,
  StatusBadge,
  Actions,
  ActionButton,
} from "./StaffTable.styles";

// =====================================
// Staff Table
// =====================================

const StaffTable = ({
  staff = [],
  onView,
  onEdit,
  onArchive,
  loading = false,
}) => {
  // =====================================
  // Empty State
  // =====================================

  if (!Array.isArray(staff) || staff.length === 0) {
    return null;
  }

  // =====================================
  // Render
  // =====================================

  return (
    <TableWrapper>
      <Table>
        {/* =================================
            Table Head
        ================================= */}

        <TableHead>
          <tr>
            <TableHeaderCell>
              Staff
            </TableHeaderCell>

            <TableHeaderCell>
              Department
            </TableHeaderCell>

            <TableHeaderCell>
              Role
            </TableHeaderCell>

            <TableHeaderCell>
              Phone
            </TableHeaderCell>

            <TableHeaderCell>
              Status
            </TableHeaderCell>

            <TableHeaderCell>
              Actions
            </TableHeaderCell>
          </tr>
        </TableHead>

        {/* =================================
            Table Body
        ================================= */}

        <TableBody>
          {staff.map((staffMember) => {
            const staffId =
              staffMember?._id ||
              staffMember?.id;

            // =================================
            // Member Data
            // =================================

            const member =
              staffMember?.memberId || {};

            const firstName =
              member?.firstName || "";

            const lastName =
              member?.lastName || "";

            const fullName =
              member?.fullName ||
              `${firstName} ${lastName}`.trim() ||
              staffMember?.fullName ||
              "Unnamed Staff";

            const email =
              member?.email || "";

            const phone =
              member?.phone || "—";

            // =================================
            // Staff Data
            // =================================

            const department =
              staffMember?.department ||
              "—";

            const role =
              staffMember?.role ||
              "—";

            const isActive =
              staffMember?.status === "ACTIVE" &&
              staffMember?.isActive !== false;

            return (
              <TableRow
                key={staffId}
              >
                {/* =================================
                    Staff
                ================================= */}

                <TableCell>
                  <StaffInfo>
                    <StaffName>
                      {fullName}
                    </StaffName>

                    {email && (
                      <StaffEmail>
                        {email}
                      </StaffEmail>
                    )}
                  </StaffInfo>
                </TableCell>

                {/* =================================
                    Department
                ================================= */}

                <TableCell>
                  <DepartmentText>
                    {department}
                  </DepartmentText>
                </TableCell>

                {/* =================================
                    Staff Role
                ================================= */}

                <TableCell>
                  <RoleText>
                    {role}
                  </RoleText>
                </TableCell>

                {/* =================================
                    Phone
                ================================= */}

                <TableCell>
                  <PhoneText>
                    {phone}
                  </PhoneText>
                </TableCell>

                {/* =================================
                    Status
                ================================= */}

                <TableCell>
                  <StatusBadge
                    $status={
                      staffMember?.status
                    }
                  >
                    {isActive
                      ? "Active"
                      : "Inactive"}
                  </StatusBadge>
                </TableCell>

                {/* =================================
                    Actions
                ================================= */}

                <TableCell>
                  <Actions>
                    <ActionButton
                      type="button"
                      onClick={() =>
                        onView?.(
                          staffMember,
                        )
                      }
                      disabled={loading}
                    >
                      View
                    </ActionButton>

                    <ActionButton
                      type="button"
                      onClick={() =>
                        onEdit?.(
                          staffMember,
                        )
                      }
                      disabled={loading}
                    >
                      Edit
                    </ActionButton>

                    {isActive && (
                      <ActionButton
                        type="button"
                        $danger
                        onClick={() =>
                          onArchive?.(
                            staffMember,
                          )
                        }
                        disabled={loading}
                      >
                        Archive
                      </ActionButton>
                    )}
                  </Actions>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableWrapper>
  );
};

export default StaffTable;