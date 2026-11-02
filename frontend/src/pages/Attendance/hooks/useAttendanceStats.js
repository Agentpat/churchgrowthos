import { useMemo } from "react";

const useAttendanceStats = (attendance = []) => {
  return useMemo(() => {
    const total = attendance.length;

    const present = attendance.filter(
      (record) => record.status === "PRESENT",
    ).length;

    const absent = attendance.filter(
      (record) => record.status === "ABSENT",
    ).length;

    const excused = attendance.filter(
      (record) => record.status === "EXCUSED",
    ).length;

    const attendanceRate =
      total === 0 ? 0 : Math.round((present / total) * 100);

    return {
      total,
      present,
      absent,
      excused,
      attendanceRate,
    };
  }, [attendance]);
};

export default useAttendanceStats;
