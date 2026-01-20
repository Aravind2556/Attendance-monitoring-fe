import React, { useEffect, useState } from 'react'
import { fetchAbsentAlert } from '../../service/fetchAbsentAlert'

export const AbsentAlerts = ({ BeURL }) => {

    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        const loadAbsentAlert = async () => {
            const data = await fetchAbsentAlert({ BeURL })

            if (data.success) {
                setAlerts(data.alerts)
            } else {
                alert(data.message)
            }
        }

        loadAbsentAlert()
    }, [BeURL])

    return (
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-4">Absent Alerts</h3>

            {alerts.length === 0 ? (
                <p className="text-gray-500">No alerts found</p>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium">S.No</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alerts.map((alert, index) => (
                                    <tr
                                        key={alert._id || index}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">
                                            {new Date(alert.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 text-red-600 font-medium">
                                            {alert.reason}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                        {alerts.map((alert, index) => (
                            <div
                                key={alert._id || index}
                                className="border rounded-lg p-3 shadow-sm"
                            >
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium">Date:</span>{" "}
                                    {new Date(alert.date).toLocaleDateString()}
                                </p>
                                <p className="mt-1 text-red-600 font-semibold">
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
