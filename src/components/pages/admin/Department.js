import React, { useContext, useEffect, useState } from "react";
import { createDepartmentApi } from "../../../service/createDepartmentApi";
import { DContext } from "../../../context/Datacontext";
import { fetchDepartment } from "../../../service/fetchDepartment";
import { updateDepartmentApi } from "../../../service/updateDepartmentApi";
import { deleteDepartment } from "../../../service/deleteDepartment";

export const Department = () => {
    const { BeURL, departments ,setDepartments}=useContext(DContext)
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);

    // CREATE or UPDATE
    const handleSubmit = async () => {
        if (!name.trim()) {
            alert("Department name required");
            return;
        }
        let data;
        if (editId) {
            data = await updateDepartmentApi({ BeURL,editId,name});
        } else {
            data = await createDepartmentApi({BeURL,name});
        }
        if (data.success) {
            if (editId) {
                setDepartments(
                    departments.map((dept) =>
                        dept._id === editId ? data.department : dept
                    )
                );
                setEditId(null);
            } else {
                setDepartments([...departments, data.department]);
            }
            alert(data.message);
            setName("");
        } else {
            alert(data.message);
        }
    };


    // EDIT CLICK
    const handleEdit = (dept) => {
        setName(dept.name);
        setEditId(dept._id);
    };

    // DELETE
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete?")) return;
        const data = await deleteDepartment({ BeURL, id });
        if (data.success) {
            setDepartments(departments.filter((d) => d._id !== id));
            alert(data.message);
        } else {
            alert(data.message);
        }
    };

    // CLEAR
    const handleClear = () => {
        setName("");
        setEditId(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Department
                </h1>
                <p className="text-gray-500">
                    Create & manage departments
                </p>
            </div>

            {/* Create / Update Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-xl">
                <h2 className="text-lg font-semibold mb-4">
                    {editId ? "Update Department" : "Create Department"}
                </h2>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Department name"
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
                <h2 className="text-lg font-semibold mb-4">
                    Department List
                </h2>

                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept, index) => (
                            <tr key={dept._id} className="border-b hover:bg-gray-50">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{dept.name}</td>
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
