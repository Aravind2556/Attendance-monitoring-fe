import React from "react";
import { useNavigate } from "react-router-dom";

export const HodList = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-100 p-6 space-y-5">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">HOD</h1>
                <p className="text-gray-500">Create & manage Heads of Department</p>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end">
                <button onClick={() => navigate('/hodManage')} className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90">
                    Create HOD
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">HOD List</h2>

                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Department</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Data will come here */}
                        <tr>
                            <td className="px-4 py-2 text-gray-400" colSpan={4}>
                                No HODs found
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
