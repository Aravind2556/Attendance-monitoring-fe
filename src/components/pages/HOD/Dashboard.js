import React, { useContext, useEffect, useState } from "react";
import {
    FaBuilding,
    FaChalkboardTeacher,
    FaCalendarAlt,
    FaUserTie,
} from "react-icons/fa";
import { fetchStaff, fetchStudents } from "../../../service/fetchStaff";
import { DContext } from "../../../context/Datacontext";

export const Dashboard = () => {
        const { currentUser, BeURL, years, classes } = useContext(DContext)
    
    const cards = [
        {
            title: "Create Staff",
            desc: "Assign Staff to department ",
            icon: <FaUserTie size={28} />,
            color: "from-orange-500 to-red-500",
            link: "/hod/staff",
        },
        {
            title: "Create Timetable",
            desc: "Manage academic years",
            icon: <FaCalendarAlt size={28} />,
            color: "from-purple-500 to-pink-600",
            link: "/hod/timetable",
        },

    ];

    const [timetable, setTimeTable] = useState([
        {
            "year": "2025",
            "classes": [
                {
                    "class": "10A",
                    "days": [
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "year": "2025",
            "classes": [
                {
                    "class": "10A",
                    "days": [
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "year": "2025",
            "classes": [
                {
                    "class": "10A",
                    "days": [
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "year": "2025",
            "classes": [
                {
                    "class": "10A",
                    "days": [
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "year": "2025",
            "classes": [
                {
                    "class": "10A",
                    "days": [
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" }
                            ]
                        },
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" }
                            ]
                        },
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" }
                            ]
                        },
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" }
                            ]
                        },
                        {
                            "day": "Monday",
                            "periods": [
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" },
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },
                                { "startTime": "09:45", "endTime": "10:30", "subject": "Physics", "staff": "Kumar" },
                                { "startTime": "09:00", "endTime": "09:45", "subject": "Maths", "staff": "Ravi" },

                            ]
                        }
                    ]
                }
            ]
        },
    ]
    )
    const [allStaff, setAllStaff] = useState([])
    const [allStudents, setAllStudents] = useState([])
    
        useEffect(() => {
            if (!BeURL) return
    
            const fetchAllDetails = async () => {
                await fetchStaff({ BeURL, setAllStaff })
                await fetchStudents({ BeURL, setAllStudents })

            }
    
            fetchAllDetails()
    
        }, [BeURL])

    const editTimetable = () => {

    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    HOD Dashboard
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage Department datas
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <a
                        key={index}
                        href={card.link}
                        className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                    >
                        <div
                            className={`p-5 bg-gradient-to-r ${card.color} text-white`}
                        >
                            {card.icon}
                        </div>

                        <div className="p-5">
                            <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                                {card.title}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {card.desc}
                            </p>

                            <button className="mt-4 text-sm font-medium text-blue-600 hover:underline">
                                Open →
                            </button>
                        </div>
                    </a>
                ))}
            </div>

            {/* Scrollable Table */}
            <div className="  mt-10 ">

                {timetable.map((yearBlock) => (
                    <div key={yearBlock.year} className="space-y-8 max-w-full">

                        {/* Year */}
                        <h2 className="text-2xl font-bold text-teal-700">
                            Year : {yearBlock.year}
                        </h2>

                        {yearBlock.classes.map((cls) => (
                            <div key={cls.class} className="bg-white rounded-2xl shadow-lg p-6 space-y-8">

                                {/* Class */}
                                <h3 className="text-xl font-semibold text-slate-800">
                                    Section : {cls.class}
                                </h3>
                                <div className=" gap-3 lg:flex ">

                                    {cls.days.map((day) => (
                                        <div key={day.day} className="space-y-4 ">
                                            {/* Day */}
                                            <h4 className="text-lg font-semibold text-primary-600 border-b pb-2">
                                                {day.day}
                                            </h4>

                                            {/* Table */}
                                            <table className="w-full border rounded-lg overflow-hidden">
                                                <thead className="bg-teal-100 text-teal-900">
                                                    <tr>
                                                        <th className="p-3 text-left">Time</th>
                                                        <th className="p-3 text-left">Subject</th>
                                                        <th className="p-3 text-left">Staff</th>
                                                        <th className="p-3 text-center">Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {day.periods.map((p, i) => (
                                                        <tr key={i} className="border-t hover:bg-teal-50">
                                                            <td className="p-3">
                                                                {p.startTime} – {p.endTime}
                                                            </td>
                                                            <td className="p-3 font-medium">{p.subject}</td>
                                                            <td className="p-3">{p.staff}</td>
                                                            <td className="p-3 text-center">
                                                                <button
                                                                    onClick={() => editTimetable(p, day.day, cls.class, yearBlock.year)}
                                                                    className="px-4 font-medium py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                                                                >
                                                                    Edit
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* sTAFF dETAILS: */}

        </div>
    );
};
