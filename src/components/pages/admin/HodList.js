import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHod } from "../../../service/fetchHod";
import { DContext } from "../../../context/Datacontext";

export const HodList = () => {
    const { BeURL, departments } = useContext(DContext);
    const navigate = useNavigate();

    const [hods, setHods] = useState([]);

    useEffect(() => {
        const loadHods = async () => {
            const data = await fetchHod({ BeURL });
            if (data.success) {
                setHods(data.hods);
            }
        };
        loadHods();
    }, [BeURL]);

    const getDepartmentName = (deptField) => {
        if (!deptField) return "";
        if (typeof deptField === "object") return deptField.name || "";
        // deptField probably an id — find it in departments
        const found = departments.find((d) => d._id === deptField);
        return found ? found.name : deptField;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 space-y-5">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">HOD</h1>
                <p className="text-gray-500">Create & manage Heads of Department</p>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end">
                <button
                    onClick={() => navigate("/hodManage")}
                    className="px-6 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90"
                >
                    Create HOD
                </button>
            </div>

            {/* Table */}
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
                        {hods.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-4 text-center text-gray-400">
                                    No HODs found
                                </td>
                            </tr>
                        ) : (
                            hods.map((hod, index) => (
                                <tr key={hod._id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{hod.fullname}</td>
                                    <td className="px-4 py-2">
                                        {getDepartmentName(hod.department || "-")}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="text-blue-600 hover:underline">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
