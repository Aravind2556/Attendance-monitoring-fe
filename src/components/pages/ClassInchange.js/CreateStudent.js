import React, { useState, useContext, useMemo } from 'react';
import { DContext } from '../../../context/Datacontext';

const CreateStudent = () => {

    const { currentUser, BeURL, years, classes } = useContext(DContext);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [parentEmail,setParentEmail]=useState("")
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [comparePassword, setComparePassword] = useState(true);

    const departmentClasses = useMemo(() => {
        if (!classes || !currentUser?.department) return [];
        return classes.filter(c => c.department === currentUser.department);
    }, [classes, currentUser]);

    const yearClasses = useMemo(() => {
        if (!selectedYear) return [];
        return departmentClasses.filter(c => c.year === selectedYear);
    }, [departmentClasses, selectedYear]);

    const handleRegister = () => {
        setComparePassword(password === confirmPassword);

        if (!name || !email || !contact || !password || !selectedYear || !selectedClass || !parentEmail) {
            alert("All fields are required!");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const tempUser = {
            fullname: name,
            email,
            contact,
            password,
            parentEmail,
            gender: gender.toLowerCase(),
            department: currentUser.department,
            year: selectedYear,
            class: selectedClass
        };

        fetch(`${BeURL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(tempUser),
        })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                if (data.success) handleClear();
            })
            .catch(() => alert("Server error"));
    };

    const handleClear = () => {
        setName('');
        setEmail('');
        setContact('');
        setPassword('');
        setConfirmPassword('');
        setGender('Male');
        setSelectedYear('');
        setSelectedClass('');
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8 space-y-6">

                <h2 className="text-2xl font-bold text-blue-600">
                    Create Student Account
                </h2>

                {/* Name & Contact */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        placeholder="Contact"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Email & Gender */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                    <div className="flex gap-3">
                        {["Male", "Female", "Other"].map(g => (
                            <button
                                key={g}
                                type="button"
                                onClick={() => setGender(g)}
                                className={`px-4 py-2 rounded-full border transition
                                ${gender === g
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "border-slate-300 text-slate-700 hover:border-blue-400"}`}
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
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {!comparePassword && (
                    <p className="text-red-600 text-sm">Passwords do not match</p>
                )}

                {/* Year */}
                <div className="grid md:grid-cols-2 gap-5" >
                <div>
                    <label className="font-medium">Year</label>
                    <select
                        value={selectedYear}
                        onChange={e => {
                            setSelectedYear(e.target.value);
                            setSelectedClass('');
                        }}
                        className="w-full mt-2 rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select Year</option>
                        {years.map(y => (
                            <option key={y._id} value={y._id}>
                                {y.year} - Year
                            </option>
                        ))}
                    </select>
                </div>

                {/* Class */}
                <div>
                    <label className="font-medium">Class</label>
                    <select
                        value={selectedClass}
                        onChange={e => setSelectedClass(e.target.value)}
                        disabled={!selectedYear}
                        className="w-full mt-2 rounded-lg border border-slate-300 px-4 py-3 disabled:bg-slate-100 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="">Select Class</option>
                        {yearClasses.map(c => (
                            <option key={c._id} value={c._id}>
                                {c.section} - {c.number}
                            </option>
                        ))}
                    </select>
                </div>
                </div>

                <div>
                    <label className="font-medium">Parent Email</label>
                    <input
                        placeholder="Parent Email"
                        value={parentEmail}
                        onChange={e => setParentEmail(e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    />

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleClear}
                        className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleRegister}
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Create Account
                    </button>
                </div>

            </div>
        </section>
    );
};

export default CreateStudent;
