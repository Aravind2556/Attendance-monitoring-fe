import React, { useState, useContext } from "react";
import { DContext } from "../../context/Datacontext";

export const StaffRegister = () => {
    const { BeURL, departments } = useContext(DContext);

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleRegister = async () => {
        setPasswordMatch(password === confirmPassword);

        if (
            !name ||
            !contact ||
            !email ||
            !password ||
            !confirmPassword ||
            !department
        ) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const payload = {
            fullname: name,
            contact,
            email,
            password,
            gender: gender.toLowerCase(),
            department
        };
        try {
            const res = await fetch(`${BeURL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data.success) {
                alert("Staff registered successfully");

                // clear form
                setName("");
                setContact("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setDepartment("");
                setGender("Male");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            alert("Server error. Please try again later.");
            console.error(error);
        }
    };

    return (
        <section className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="bg-primary-600 p-8 text-white">
                    <h2 className="text-3xl font-bold">Create Hod</h2>
                    <p className="mt-2 text-sm opacity-90">
                        Register staff for the attendance system
                    </p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-6">

                    {/* Name & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Alex"
                                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Contact</label>
                            <input
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="+91 9876543210"
                                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm"
                            />
                        </div>
                    </div>

                    {/* Email & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Gender</label>
                            <div className="mt-3 flex gap-4">
                                {["Male", "Female", "Other"].map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setGender(g)}
                                        className={`px-4 py-2 rounded-full border text-sm ${gender === g
                                                ? "bg-primary-600 text-white"
                                                : "bg-white"
                                            }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Passwords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm"
                            />
                        </div>
                    </div>

                    {!passwordMatch && (
                        <p className="text-sm text-red-600">Passwords do not match</p>
                    )}

                    {/* Staff ID & Is HOD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium">Department</label>
                            <select
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                className="mt-2 w-full rounded-xl border px-4 py-3 text-sm"
                            >
                                <option value="">Select Department</option>
                                {Array.isArray(departments) &&
                                    departments.map((d) => (
                                        <option key={d._id} value={d._id}>
                                            {d.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setName("");
                                setContact("");
                                setEmail("");
                                setPassword("");
                                setConfirmPassword("");
                                setDepartment("");
                                setGender("Male");
                            }}
                            className="px-8 py-3 rounded-xl border font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleRegister}
                            className="px-8 py-3 rounded-xl bg-primary-600 text-white font-semibold"
                        >
                            Create Account
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};
