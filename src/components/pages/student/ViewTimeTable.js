import React, { useContext, useEffect, useState } from 'react'
import { DContext } from '../../../context/Datacontext'
import { fetchStudentTimeTable } from '../../../api/fetchStudentTimeTable'

export const ViewTimeTable = () => {
    const { BeURL } = useContext(DContext)
    const [timeTable, setTimeTable] = useState([])

    useEffect(() => {
        const loadTimeTable = async () => {
            const data = await fetchStudentTimeTable({ BeURL })
            if (data.success) {
                setTimeTable(data.timetable)
            }
        }
        loadTimeTable()
    }, [BeURL])

    // Days order
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"]

    return (
        <div>
            <h3>Student Time Table</h3>

            {days.map(day => {
                const dayData = timeTable
                    .filter(item => item.day === day)
                    .sort((a, b) => a.periodNo - b.periodNo)

                if (dayData.length === 0) return null

                return (
                    <div key={day} style={{ marginBottom: "30px" }}>
                        <h4 style={{ textTransform: "capitalize" }}>{day}</h4>

                        <table border="1" cellPadding="8" cellSpacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Period</th>
                                    <th>Time</th>
                                    <th>Subject</th>
                                    <th>Staff</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dayData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.periodNo}</td>
                                        <td>{item.startTime} - {item.endTime}</td>
                                        <td>{item.subject}</td>
                                        <td>{item.staff?.name || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    )
}
