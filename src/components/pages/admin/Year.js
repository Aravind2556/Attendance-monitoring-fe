import React, { useContext, useEffect, useState } from "react";
import { createYearApi } from "../../../service/createYearApi";
import { DContext } from "../../../context/Datacontext";
import { updateYearApi } from "../../../service/updateYearApi";
import { deleteYear } from "../../../service/deleteYear";

export const Year = () => {
    const { BeURL, years, setYears } = useContext(DContext);
    const [year, setYear] = useState("");
    const [editId, setEditId] = useState(null);


    const handleSubmit = async () => {
        if (!year.trim()) {
            alert("year required");
            return;
        }
        let data;
        if (editId) {
            data = await updateYearApi({ BeURL, editId, year });
        } else {
            data = await createYearApi({ BeURL, year });
        }

        if (data.success) {
            if (editId) {
                setYears(
                    years.map((ye) =>
                        ye._id === editId ? data.year : ye
                    )
                );
                setEditId(null);
            } else {
                setYears([...years, data.year]);
            }
            alert(data.message);
            setYear("");
        } else {
            alert(data.message);
        }
    };

    const handleEdit = (dept) => {
        setYear(dept.year);
        setEditId(dept._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete?")) return;
        const data = await deleteYear({ BeURL, id });
        if (data.success) {
            setYears(years.filter((d) => d._id !== id));
            alert(data.message);
        } else {
            alert(data.message);
        }
    };

    const handleClear = () => {
        setYear("");
        setEditId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Year</h1>
                <p className="text-gray-500">Create & manage years</p>
            </div>

            {/* Create / Update Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-xl">
                <h2 className="text-lg font-semibold mb-4">
                    {editId ? "Update Year" : "Create Year"}
                </h2>

                <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="year"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
                />

                <div className="flex gap-3">
                    <button
                        onClick={handleSubmit}
                        className={`flex-1 py-3 rounded-lg text-white font-semibold ${editId
                                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                : "bg-gradient-to-r from-indigo-500 to-blue-600"
                            }`}
                    >
                        {editId ? "Update" : "Add"}
                    </button>

                    {editId && (
                        <button
                            onClick={handleClear}
                            className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Year List</h2>

                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Year</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {years.map((dept, index) => (
                            <tr
                                key={dept._id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{dept.year}</td>
                                <td className="px-4 py-2 space-x-4">
                                    <button
                                        onClick={() => handleEdit(dept)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(dept._id)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
