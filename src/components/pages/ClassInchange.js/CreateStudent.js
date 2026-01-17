
import React, { useState, useContext, useMemo } from 'react';
import { DContext } from '../../../context/Datacontext';

const CreateStudent = () => {

    const { currentUser, BeURL, years, classes } = useContext(DContext);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedClass, setSelectedClass] = useState('');

    const [comparePassword, setComparePassword] = useState(true);

    /** 🔹 Department based classes */
    const departmentClasses = useMemo(() => {
        if (!classes || !currentUser?.department) return [];
        return classes.filter(
            c => c.department === currentUser.department
        );
    }, [classes, currentUser]);

    /** 🔹 Year based classes */
    const yearClasses = useMemo(() => {
        if (!selectedYear) return [];
        return departmentClasses.filter(
            c => c.year === selectedYear
        );
    }, [departmentClasses, selectedYear]);

    const getClassLabel = (cls) => {
        return `${cls.section} - ${cls.number}`;
    };

    const handleRegister = () => {
        setComparePassword(password === confirmPassword);

        if (!name || !email || !contact || !password || !selectedYear || !selectedClass) {
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
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-8 space-y-6">

                <h2 className="text-2xl font-bold text-primary-600">
                    Create Student Account
                </h2>

                {/* Name & Contact */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input placeholder="Full Name" value={name}
                        onChange={e => setName(e.target.value)} className="input" />
                    <input placeholder="Contact" value={contact}
                        onChange={e => setContact(e.target.value)} className="input" />
                </div>

                {/* Email & Gender */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input placeholder="Email" value={email}
                        onChange={e => setEmail(e.target.value)} className="input" />

                    <div className="flex gap-3">
                        {["Male", "Female", "Other"].map(g => (
                            <label key={g}
                                className={`px-4 py-2 rounded-full border cursor-pointer
                                ${gender === g ? "bg-primary-600 text-white" : ""}`}>
                                <input type="radio" value={g}
                                    checked={gender === g}
                                    onChange={e => setGender(e.target.value)}
                                    className="hidden" />
                                {g}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Password */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input type="password" placeholder="Password"
                        value={password} onChange={e => setPassword(e.target.value)}
                        className="input" />
                    <input type="password" placeholder="Confirm Password"
                        value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                        className="input" />
                </div>

                {!comparePassword && (
                    <p className="text-red-600 text-sm">Passwords do not match</p>
                )}

                {/* Year */}
                <div>
                    <label className="font-medium">Year</label>
                    <select
                        value={selectedYear}
                        onChange={e => {
                            setSelectedYear(e.target.value);
                            setSelectedClass('');
                        }}
                        className="input mt-2"
                    >
                        <option value="">Select Year</option>
                        {years
                            .map(y => (
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
                        className="input mt-2"
                    >
                        <option value="">Select Class</option>
                        {yearClasses.map(c => (
                            <option key={c._id} value={c._id}>
                                {getClassLabel(c)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button onClick={handleClear} className="btn-outline">Cancel</button>
                    <button onClick={handleRegister} className="btn-primary">
                        Create Account
                    </button>
                </div>

            </div>
        </section>
    );
};

export default CreateStudent;
