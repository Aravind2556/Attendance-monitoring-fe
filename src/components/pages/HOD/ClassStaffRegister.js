import React, { useState, useContext, useMemo } from "react";
import { DContext } from "../../../context/Datacontext";
import { useNavigate } from "react-router-dom";

const ClassStaffRegister = () => {

    const { currentUser, BeURL, years, currentHod, classes } = useContext(DContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isClassIncharge, setIsClassIncharge] = useState(false);

    // 🔥 IMPORTANT: single year + single class
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedClass, setSelectedClass] = useState("");

    const [comparePassword, setComparePassword] = useState(true);

    // ✅ HOD allowed classes only
    const hodClasses = useMemo(() => {
        if (!classes || !currentHod?.class) return [];
        return classes.filter(c => currentHod.class.includes(c._id));
    }, [classes, currentHod]);

    // ✅ Year based filtering
    const yearClasses = useMemo(() => {
        if (!selectedYear) return [];
        return hodClasses.filter(c => c.year === selectedYear);
    }, [hodClasses, selectedYear]);

    const getClassLabel = (cls) => `${cls.section} - ${cls.number}`;

    const handleRegister = () => {
        setComparePassword(password === confirmPassword);

        if (!name || !email || !contact || !password) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (isClassIncharge && (!selectedYear || !selectedClass)) {
            alert("Please select Year and Class");
            return;
        }

        const tempUser = {
            fullname: name,
            email,
            contact,
            password,
            gender: gender.toLowerCase(),
            department: currentUser.department,
            isTutor: isClassIncharge,
            year: selectedYear,
            class: selectedClass
        };

        fetch(`${BeURL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(tempUser)
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                if (data.success) handleClear();
            })
            .catch(() => alert("Server error"));
    };

    const handleClear = () => {
        setName("");
        setContact("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setGender("Male");
        setIsClassIncharge(false);
        setSelectedYear("");
        setSelectedClass("");
        navigate("/hod/staff");
    };

    if (!currentHod) return <div className="p-10">Loading...</div>;

    return (
        <section className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="bg-blue-700 text-white p-8">
                    <h2 className="text-3xl font-bold">Create Staff Account</h2>
                    <p className="mt-2 text-sm">Register staff under your department</p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-6">

                    {/* Name & Contact */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <input
                            placeholder="Full Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//               focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                        />
                        <input
                            placeholder="Contact"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//               focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                        />
                    </div>

                    {/* Email & Gender */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <input
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//               focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                        />

                        <div className="flex gap-3">
                            {["Male", "Female", "Other"].map(g => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setGender(g)}
                                    className={`px-4 py-2 rounded-full border
                                    ${gender === g
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "border-slate-300 text-slate-700"}`}
                                >
                                    {g}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Password */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//               focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//               focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                        />
                    </div>

                    {!comparePassword && (
                        <p className="text-red-600 text-sm">Passwords do not match</p>
                    )}

                    {/* Class Incharge Toggle */}
                    <div className="flex justify-between items-center border rounded-xl p-4 bg-slate-50">
                        <div>
                            <p className="font-medium">Is Class Incharge?</p>
                            <p className="text-xs text-slate-500">Enable if staff manages a class</p>
                        </div>
                        <input
                            type="checkbox"
                            checked={isClassIncharge}
                            onChange={e => setIsClassIncharge(e.target.checked)}
                            className="w-5 h-5"
                        />
                    </div>

                    {/* Year & Class */}
                    {isClassIncharge && (
                        <div className="grid md:grid-cols-2 gap-5">
                            <select
                                value={selectedYear}
                                onChange={e => {
                                    setSelectedYear(e.target.value);
                                    setSelectedClass("");
                                }}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//               focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            >
                                <option value="">Select Year</option>
                                {years.map(y => (
                                    <option key={y._id} value={y._id}>
                                        {y.year}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedClass}
                                onChange={e => setSelectedClass(e.target.value)}
                                disabled={!selectedYear}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//               focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            >
                                <option value="">Select Class</option>
                                {yearClasses.map(c => (
                                    <option key={c._id} value={c._id}>
                                        {getClassLabel(c)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            onClick={handleClear}
                            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleRegister}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                        >
                            Create Account
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ClassStaffRegister;
