import React, { useEffect } from 'react'
import { useState, useContext } from 'react';
import { DContext } from '../../../context/Datacontext';
import { fetchStaff } from '../../../service/fetchStaff';
import { createTimetable } from '../../../service/createTimetable';

// import posterImg from '../../assets/Login.jpg'

const Timetable = () => {

    const { currentUser, BeURL, years, classes } = useContext(DContext)
    console.log("CurrentUsers", years, classes)

    const [day, setDay] = useState('');
    const [periodNo, setperiodNo] = useState('');
    const [startTime, setstartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [subject, setSubject] = useState('');
    const [staff, setStaff] = useState('')
    const [classess, setclassess] = useState('');
    const [year, setyear] = useState('')
    const [allStaff, setAllStaff] = useState([])

    useEffect(() => {
        if (!BeURL) return

        const fetchAllStaff = async () => {
            await fetchStaff({ BeURL, setAllStaff })
        }

        fetchAllStaff()

    }, [BeURL])

    const handleRegister = async () => {

        const tempTimetable = {
            day , periodNo, startTime, endTime, year, classes :classess, subject, staff
        }
        
        await createTimetable({ BeURL, tempTimetable })
    }


    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-7xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-8 text-white">
                    <h2 className="text-3xl font-bold">Create Timetable</h2>
                    <p className="mt-2 text-sm text-primary-100">
                        Timetable for access the Smart Attendance System
                    </p>
                </div>

                {/* Form */}
                <form className="p-8 space-y-6">

                    {/* Day and Period Number */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Day : </label>
                            <input
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-primary-200"
                                placeholder="Sunday"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Period Number :</label>
                            <input
                                value={periodNo}
                                onChange={(e) => setperiodNo(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-primary-200"
                                placeholder="+91 9876543210"
                            />
                        </div>
                    </div>


                    {/* Start and End Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Start Time</label>
                            <input
                                value={startTime}
                                onChange={(e) => setstartTime(e.target.value)}
                                type="time"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-primary-200"
                                placeholder="12:00"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">End Time</label>
                            <input
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                type="time"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-primary-200"
                                placeholder="12:00"
                            />
                        </div>


                    </div>

                    {/* Class and Year */}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* Class */}
                        <div>
                            <label className="text-sm font-medium text-slate-700">Class</label>
                            <select
                                value={classess}
                                onChange={(e) => setclassess(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm
       focus:ring-2 focus:ring-primary-200"
                            >
                                <option value="">Select Class</option>
                                {
                                    classes.map(cl => (
                                        <option>{cl.section}- {cl.number}</option>
                                    ))
                                }

                            </select>
                        </div>

                        {/* year */}
                        <div>
                            <label className="text-sm font-medium text-slate-700">Year</label>
                            <select
                                value={year}
                                onChange={(e) => setyear(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm
       focus:ring-2 focus:ring-primary-200"
                            >
                                <option value="">Select year</option>
                                {
                                    years.map(y => (
                                        <option value={y._id}>{y.year}</option>
                                    ))
                                }
                                {/* <option value="2024">2024 – 2025</option>
                                    <option value="2025">2025 – 2026</option>
                                    <option value="2026">2026 – 2027</option> */}
                            </select>
                        </div>

                    </div>

                    {/* Passwords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Subject</label>
                            <input
                                placeholder='Javascript'
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                type="text"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:ring-2 focus:ring-primary-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Staff</label>
                            <select
                                value={staff}
                                onChange={(e) => setStaff(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm
       focus:ring-2 focus:ring-primary-200"
                            >
                                <option value="">Select Staff</option>
                                {
                                    allStaff.length > 0 && allStaff.map(y => (
                                        <option value={y._id}>{y.name}</option>
                                    ))
                                }
                                {/* <option value="2024">2024 – 2025</option>
                                    <option value="2025">2025 – 2026</option>
                                    <option value="2026">2026 – 2027</option> */}
                            </select>
                        </div>
                    </div>



                    {/* Button */}
                    <div className='flex justify-end items-center gap-5'>
                        <button
                            onClick={() => {
                                setDay('');
                                setstartTime('');
                                setperiodNo('');
                                setEndTime('');
                                setSubject('')
                                setStaff('')
                                setclassess('');
                                setyear('');
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
                            Create Schedule
                        </button>
                    </div>



                </form>
            </div>
        </section>
    );

}

export default Timetable