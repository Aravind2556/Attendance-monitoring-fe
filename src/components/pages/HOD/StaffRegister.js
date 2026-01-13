import React from 'react'
import { useState, useContext } from 'react';
import { DContext } from '../../../context/Datacontext';

// import posterImg from '../../assets/Login.jpg'

const StaffRegister = () => {

    const { currentUser, BeURL } = useContext(DContext)

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [empId, setEmpId] = useState('')

    const [isClassIncharge, setIsClassIncharge] = useState(false)
    const [classes, setClasses] = useState('');
    const [year, setYear] = useState('')

    const [comparePassword, setComparePassword] = useState(true)

    const handleRegister = async () => {

        setComparePassword(password === confirmPassword)

        if (name !== "" || email !== "" || contact !== "" || password !== "") {
            if (password === confirmPassword) {

                let tempUser = {
                    fullname: name, email, contact, password, empId, isTutor: isClassIncharge
                }

                if (age?.match(/^\d+(\.\d+)?$/)) {
                    tempUser.age = Number(age)
                }

                if (gender && ['male', 'female', 'other'].includes(gender.toLowerCase().trim())) {
                    tempUser.gender = gender.toLocaleLowerCase().trim()
                }

                if (classes) tempUser.classes = classes
                if (year) tempUser.year = year
                if (currentUser?.department) {
                    tempUser.department = currentUser?.department
                }

                fetch(`${BeURL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify(tempUser),
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            // Signup successful

                            setName('')
                            setEmail('')
                            setContact('')
                            setPassword('')
                            setConfirmPassword('')
                            setAge('')
                            setGender('Male')

                        } else {
                            alert(data.message)
                        }
                    })
                    .catch(err => {
                        alert('Trouble in connecting to the Server! Please try again later.')
                        console.log('Error in StaffRegister: ' + err)
                    })

            } else {
                alert('passwords not match!')
            }
        }
        else {
            alert("All fields are required!")
        }

    }


    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-7xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-8 text-white">
                    <h2 className="text-3xl font-bold">Create Account</h2>
                    <p className="mt-2 text-sm text-primary-100">
                        Register to access the Smart Attendance System
                    </p>
                </div>

                {/* Form */}
                <form className="p-8 space-y-6">

                    {/* Name */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                                placeholder="John Alex"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Contact</label>
                            <input
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                                placeholder="+91 9876543210"
                            />
                        </div>
                    </div>


                    {/* gender and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Gender</label>
                            <div className="mt-3 flex gap-4">
                                {["Male", "Female", "Other"].map((g) => (
                                    <label
                                        key={g}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full border cursor-pointer transition
                ${gender === g
                                                ? "bg-primary-600 text-white border-primary-600"
                                                : "border-slate-300 text-slate-700 hover:border-primary-400"
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            value={g}
                                            checked={gender === g}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="hidden"
                                        />
                                        {g}
                                    </label>
                                ))}
                            </div>
                        </div>


                    </div>




                    {/* Passwords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <input
                                placeholder='. . . . .'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                            <input
                                placeholder='. . . . .'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>
                    </div>

                    {!comparePassword && (
                        <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
                            Passwords do not match
                        </p>
                    )}

                    {/* EmpId and Tutor */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Staff Id</label>
                            <input
                                value={empId}
                                onChange={(e) => setEmpId(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                                placeholder="VXC-001"
                            />
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 shadow-sm">

                            <div>
                                <p className="text-sm font-medium text-slate-800">Is Class Incharge?</p>
                                <p className="text-xs text-slate-500">
                                    Enable if this staff is responsible for a class
                                </p>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isClassIncharge}
                                    onChange={(e) => setIsClassIncharge(e.target.checked)}
                                    className="sr-only peer"
                                />

                                <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-primary-600 transition-all"></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                            </label>

                        </div>
                    </div>

                    {isClassIncharge &&
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Class */}
                            <div>
                                <label className="text-sm font-medium text-slate-700">Class</label>
                                <select
                                    value={classes}
                                    onChange={(e) => setClasses(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm
      focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                                >
                                    <option value="">Select Class</option>
                                    <option value="6A">6 A</option>
                                    <option value="6B">6 B</option>
                                    <option value="7A">7 A</option>
                                    <option value="7B">7 B</option>
                                    <option value="8A">8 A</option>
                                    <option value="8B">8 B</option>
                                    <option value="9A">9 A</option>
                                    <option value="9B">9 B</option>
                                    <option value="10A">10 A</option>
                                    <option value="10B">10 B</option>
                                    <option value="11A">11 A</option>
                                    <option value="11B">11 B</option>
                                    <option value="12A">12 A</option>
                                    <option value="12B">12 B</option>
                                </select>
                            </div>

                            {/* Year */}
                            <div>
                                <label className="text-sm font-medium text-slate-700">Academic Year</label>
                                <select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm
      focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                                >
                                    <option value="">Select Year</option>
                                    <option value="2024">2024 – 2025</option>
                                    <option value="2025">2025 – 2026</option>
                                    <option value="2026">2026 – 2027</option>
                                </select>
                            </div>

                        </div>

                    }



                    {/* Button */}
                    <div className='flex justify-end items-center gap-5'>
                        <button
                            onClick={() =>
                            {
                                setName('');
                                setEmail('');
                                setContact('');
                                setPassword('');
                                setConfirmPassword('');
                                setAge('');
                                setGender('Male');
                            }
                            }
                            type="button"
                            className="min-w-36 rounded-xl bg-white py-3 text-primary-600 border-primary-600 border-2 font-semibold text-sm shadow-lg hover:bg-primary-700 hover:shadow-xl transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleRegister}
                            type="button"
                            className="w-36 rounded-xl bg-primary-600 py-3 text-white font-semibold text-sm shadow-lg hover:bg-primary-700 hover:shadow-xl transition"
                        >
                            Create Account
                        </button>
                    </div>


                    <p className="text-center text-xs text-slate-500">
                        By registering, you agree to receive attendance & security alerts.
                    </p>
                </form>
            </div>
        </section>
    );

}

export default StaffRegister