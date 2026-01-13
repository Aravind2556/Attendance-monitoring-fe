import React from "react";
import {
    FaBuilding,
    FaChalkboardTeacher,
    FaCalendarAlt,
    FaUserTie,
} from "react-icons/fa";

export const AdminDashboard = () => {
    const cards = [
        {
            title: "Create Department",
            desc: "Add and manage departments",
            icon: <FaBuilding size={28} />,
            color: "from-blue-500 to-indigo-600",
            link: "/admin/department",
        },
        {
            title: "Create Year",
            desc: "Manage academic years",
            icon: <FaCalendarAlt size={28} />,
            color: "from-purple-500 to-pink-600",
            link: "/admin/year",
        },
        {
            title: "Create Class",
            desc: "Create classes & sections",
            icon: <FaChalkboardTeacher size={28} />,
            color: "from-green-500 to-emerald-600",
            link: "/admin/class",
        },
        {
            title: "Create HOD",
            desc: "Assign Head of Department",
            icon: <FaUserTie size={28} />,
            color: "from-orange-500 to-red-500",
            link: "/admin/hod",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Admin Dashboard
                </h1>
                <p className="text-gray-500 mt-1">
                    Manage college master data
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
        </div>
    );
};
