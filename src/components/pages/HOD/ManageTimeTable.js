import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DContext } from '../../../context/Datacontext';
import { fetchTimetable } from '../../../service/fetchTimetable';

export const ManageTimeTable = () => {
    const navigate = useNavigate();
    const { BeURL } = useContext(DContext);

    const [loading, setLoading] = useState(true);
    const [timetableCount, setTimetableCount] = useState(0);

    const years = [
        { label: "1st Year", value: "1" },
        { label: "2nd Year", value: "2" },
        { label: "3rd Year", value: "3" },
        { label: "4th Year", value: "4" },
    ];

    // ✅ Fetch once on load
    useEffect(() => {
        if (!BeURL) return;

        fetchTimetable({
            BeURL,
            setLoading,
            setTimetableCount
        });
    }, [BeURL]);

    return (
        <div className="min-h-screen bg-gray-100 p-6 space-y-8">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">
                    Timetable Management
                </h1>
                <p className="text-gray-500">
                    Create and manage class timetables
                </p>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Create Timetable */}
                <div
                    onClick={() => navigate('/hod/createTimeTable')}
                    className="cursor-pointer rounded-2xl bg-white p-6 shadow-md
          hover:shadow-xl transition border border-gray-200 hover:border-primary-500"
                >
                    <h2 className="text-xl font-semibold text-gray-800">
                        Create Timetable
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm">
                        Add new timetable entries for classes
                    </p>
                    <div className="mt-4 text-primary-600 font-semibold">
                        Go →
                    </div>
                </div>

            </div>

            {/* Year Selection */}
            <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    View Timetable by Year
                </h2>

                {loading ? (
                    <div className="text-gray-500">Loading timetables...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {years.map((y) => (
                            <div
                                key={y.value}
                                onClick={() => navigate(`/hod/timetable/${y.value}`)}
                                className="cursor-pointer rounded-xl bg-white p-5 text-center
                shadow-sm border border-gray-200 hover:shadow-md
                hover:border-primary-500 transition"
                            >
                                <p className="text-lg font-semibold text-gray-800">
                                    {y.label}
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                    View timetable
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};
