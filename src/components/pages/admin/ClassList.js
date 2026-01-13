import React, { useContext, useState } from "react";
import { createClassApi } from "../../../service/createClassApi";
import { DContext } from "../../../context/Datacontext";
import { updateClassApi } from "../../../service/updateClassApi";
import { deleteClass } from "../../../service/deleteClass";

export const ClassList = () => {
    const { BeURL, departments, years, setClasses, classes ,dropdownDepartments} =
        useContext(DContext);

    const [section, setSection] = useState("");
    const [year, setYear] = useState("");
    const [number, setNumber] = useState("");
    const [department, setDepartment] = useState("");

    const [editId, setEditId] = useState(null);

    // If you want to fetch classes from here instead of context, you could:
    // useEffect(() => { fetchClass({BeURL}).then(d=>setClasses(d.classes||d.class||[])) }, [BeURL])

    const handleSubmit = async () => {
        // UI-side validation (prevents obvious backend 400s)
        if (!section.trim()) {
            alert("Section required");
            return;
        }
        if (!number.toString().trim()) {
            alert("Number required");
            return;
        }
        if (!department) {
            alert("Department required");
            return;
        }
        if (!year) {
            alert("Year required");
            return;
        }

        let data;
        if (editId) {
            data = await updateClassApi({
                BeURL,
                editId,
                section,
                number,
                department,
                year,
            });
        } else {
            data = await createClassApi({
                BeURL,
                section,
                number,
                department,
                year,
            });
        }

        if (data.success) {
            // backend shape may vary: try common keys (class, Class, year) defensively
            const returnedItem =
                data.class || data.Class || data.year || data.newClass || data;

            if (editId) {
                setClasses(
                    classes.map((c) => (c._id === editId ? returnedItem : c))
                );
                setEditId(null);
            } else {
                setClasses([...classes, returnedItem]);
            }

            alert(data.message);
            // clear inputs
            setSection("");
            setNumber("");
            setDepartment("");
            setYear("");
        } else {
            alert(data.message);
        }
    };

    const handleEdit = (cls) => {
        // defensively pick fields (depending on how your backend shapes class)
        setSection(cls.section ?? cls.className ?? cls.Class ?? "");
        setNumber(cls.number ?? "");
        // department may be saved as an id or object
        setDepartment(
            cls.department?._id ?? cls.department ?? cls.departmentId ?? ""
        );
        // year may be saved as id or string or object
        setYear(cls.year?._id ?? cls.year ?? cls.yearId ?? "");
        setEditId(cls._id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete?")) return;
        const data = await deleteClass({ BeURL, id });
        if (data.success) {
            setClasses(classes.filter((d) => d._id !== id));
            alert(data.message);
        } else {
            alert(data.message);
        }
    };

    const handleClear = () => {
        setSection("");
        setNumber("");
        setDepartment("");
        setYear("");
        setEditId(null);
    };

    // helper to display department name (works if stored as id or full object)
    const getDepartmentName = (deptField) => {
        if (!deptField) return "";
        if (typeof deptField === "object") return deptField.name || "";
        // deptField probably an id — find it in departments
        const found = departments.find((d) => d._id === deptField);
        return found ? found.name : deptField;
    };

    // helper to display year label
    const getYearLabel = (yearField) => {
        if (!yearField) return "";
        if (typeof yearField === "object") return yearField.year ?? "";
        const found = years.find((y) => y._id === yearField);
        return found ? found.year : yearField;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Class</h1>
                <p className="text-gray-500">Create & manage classes</p>
            </div>

            {/* Create / Update Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 max-w-xl">
                <h2 className="text-lg font-semibold mb-4">
                    {editId ? "Update Class" : "Create Class"}
                </h2>

                {/* Section */}
                <input
                    type="text"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    placeholder="Section (e.g., A)"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
                />

                {/* Number */}
                <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Number (e.g., 1)"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
                />

                {/* Department dropdown */}
                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
                >
                    <option value="">Select Department</option>
                    {Array.isArray(departments) &&
                        departments.map((d) => (
                            <option key={d._id} value={d._id}>
                                {d.name}
                            </option>
                        ))}
                </select>

                {/* Year dropdown */}
                <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-4"
                >
                    <option value="">Select Year</option>
                    {Array.isArray(years) &&
                        years.map((y) => (
                            <option key={y._id} value={y._id}>
                                {y.year}
                            </option>
                        ))}
                </select>

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
                <h2 className="text-lg font-semibold mb-4">Class List</h2>

                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Section</th>
                            <th className="px-4 py-2 text-left">Number</th>
                            <th className="px-4 py-2 text-left">Department</th>
                            <th className="px-4 py-2 text-left">Year</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(classes) &&
                            classes.map((cls, index) => (
                                <tr key={cls._id} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        {cls.section ?? cls.className ?? cls.Class ?? "-"}
                                    </td>
                                    <td className="px-4 py-2">{cls.number ?? "-"}</td>
                                    <td className="px-4 py-2">
                                        {getDepartmentName(cls.department)}
                                    </td>
                                    <td className="px-4 py-2">{getYearLabel(cls.year)}</td>
                                    <td className="px-4 py-2 space-x-4">
                                        <button
                                            onClick={() => handleEdit(cls)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cls._id)}
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
