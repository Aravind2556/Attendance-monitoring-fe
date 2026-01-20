import React, { useContext, useEffect, useState } from 'react'
import { fetchAbsentAlert } from '../../service/fetchAbsentAlert'
import { DContext } from '../../context/Datacontext'

export const AbsentAlerts = () => {
    const { BeURL, departments = [], years = [], classes, users } = useContext(DContext)

    const [alerts, setAlerts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadAbsentAlert = async () => {
            setLoading(true)
            const data = await fetchAbsentAlert({ BeURL })

            if (data?.success) {
                setAlerts(data.alerts || [])
            } else {
                alert(data?.message || "Failed to load alerts")
            }
            setLoading(false)
        }

        if (BeURL) {
            loadAbsentAlert()
        }
    }, [BeURL])

    // 🔹 Department name helper (id OR object)
    const getDepartmentName = (deptField) => {
        if (!deptField) return "-"
        if (typeof deptField === "object") return deptField.name || "-"
        const found = departments.find(d => d._id === deptField)
        return found ? found.name : "-"
    }

    // 🔹 Year label helper (id OR object)
    const getYearLabel = (yearField) => {
        if (!yearField) return "-"
        if (typeof yearField === "object") return yearField.year ?? yearField.name ?? "-"
        const found = years.find(y => y._id === yearField)
        return found ? (found.year ?? found.name) : "-"
    }

    // 🔹 Class label helper
    const getClassLabel = (alert) => {
        if (!classes || classes.length === 0) return "-";

        const found = classes.find(cls =>
            cls.department === alert.department &&
            cls.year === alert.year
        );

        if (!found) return "-";

        return `${found.number} - ${found.section}`;
    };


    // 🔹 Student name helper
    const getStudentName = (studentId) => {
        if (!studentId) return "-";

        // if backend already populated student object
        if (typeof studentId === "object") {
            return studentId.fullname || "-";
        }

        // if only ID is stored, find in users list
        const found = users.find(u => u._id === studentId);
        return found ? found.fullname : "-";
    };


    if (loading) {
        return <p className="p-4 text-gray-500">Loading alerts...</p>
    }

    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Absent Alerts</h3>

            {alerts.length === 0 ? (
                <p className="text-gray-500">No alerts found</p>
            ) : (
                <>
                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium">S.No</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Student Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Department</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Class</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Year</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Reason</th>
                                </tr>
                            </thead>

                            <tbody>
                                {alerts.map((alert, index) => (
                                    <tr
                                        key={alert._id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2">{index + 1}</td>

                                        <td className="px-4 py-2">
                                            {new Date(alert.date).toLocaleDateString()}
                                        </td>

                                        <td className="px-4 py-2">
                                            {getStudentName(alert.studentId)}
                                        </td>

                                        <td className="px-4 py-2">
                                            {getDepartmentName(alert.department)}
                                        </td>


                                        <td className="px-4 py-2">
                                            {getClassLabel(alert)}
                                        </td>


                                        <td className="px-4 py-2">
                                            {getYearLabel(alert.year)}
                                        </td>

                                        <td className="px-4 py-2 text-red-600 font-medium">
                                            {alert.reason}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ================= MOBILE CARD VIEW ================= */}
                    <div className="md:hidden space-y-4">
                        {alerts.map(alert => (
                            <div
                                key={alert._id}
                                className="border rounded-lg p-4 shadow-sm"
                            >
                                <p className="text-sm text-gray-500">
                                    {new Date(alert.date).toLocaleDateString()}
                                </p>

                                <p className="text-sm text-gray-800">
                                    {getStudentName(alert.studentId)}
                                </p>

                                <p className="text-sm">
                                    {getDepartmentName(alert.department)} |{" "}
                                    {alert.studentId?.class || "-"} |{" "}
                                    {getYearLabel(alert.year)}
                                </p>

                                <p className="mt-2 text-red-600 font-medium">
                                    {alert.reason}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
