import React, { useEffect, useState, useContext, useMemo } from 'react';
import { DContext } from '../../../context/Datacontext';
import { fetchStaff } from '../../../service/fetchStaff';
import { createTimetable } from '../../../service/createTimetable';

const Timetable = () => {

    const { BeURL, years, classes, currentHod } = useContext(DContext);

    const [day, setDay] = useState('');
    const [periodNo, setPeriodNo] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [subject, setSubject] = useState('');
    const [staff, setStaff] = useState('');
    const [year, setYear] = useState('');
    const [assignedClasses, setAssignedClasses] = useState([]);
    const [allStaff, setAllStaff] = useState([]);

    useEffect(() => {
        if(!allStaff || !BeURL) return
        fetchStaff({ BeURL, setAllStaff });
    }, [allStaff, BeURL]);

    /**
     * 🔹 Step 1: HOD assigned classes
     */
    const hodClasses = useMemo(() => {
        if (!Array.isArray(classes) || !Array.isArray(currentHod?.class)) return [];
        return classes.filter(c =>
            currentHod.class.includes(c._id)
        );
    }, [classes]);

    /**
     * 🔹 Step 2: Year based classes (FINAL FIX)
     */
    const yearClasses = useMemo(() => {
        if (!year) return [];
        return hodClasses.filter(c => c.year === year);
    }, [hodClasses, year]);

    const getClassLabel = (c) => `${c.section} - ${c.number}`;

    const handleRegister = async () => {

        if (!day || !periodNo || !startTime || !endTime || !year || !subject || !staff || assignedClasses.length === 0) {
            alert("All fields are required");
            return;
        }

        const tempTimetable = {
            day,
            periodNo,
            startTime,
            endTime,
            year,
            classes: assignedClasses,
            subject,
            staff
        };

        const res = await createTimetable({ BeURL, tempTimetable });
        alert(res.message);

        if (res.success) {
            setDay('');
            setPeriodNo('');
            setStartTime('');
            setEndTime('');
            setSubject('');
            setStaff('');
            setYear('');
            setAssignedClasses([]);
        }
    };

    if (!currentHod || !Array.isArray(classes)) {
        return <div className="p-10">Loading...</div>;
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-500 p-8 text-white">
                    <h2 className="text-3xl font-bold">Create Timetable</h2>
                    <p className="mt-2 text-sm text-primary-100">
                        Define class schedule for attendance monitoring
                    </p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-8">

                    {/* Row 1: Day & Period */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Day</label>
                            <input
                                value={day}
                                onChange={e => setDay(e.target.value)}
                                placeholder="Monday"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                                             focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Period No</label>
                            <input
                                value={periodNo}
                                onChange={e => setPeriodNo(e.target.value)}
                                placeholder="1"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                                               focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>
                    </div>

                    {/* Row 2: Start Time & End Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Start Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
                                        focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">End Time</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
      focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>
                    </div>

                    {/* Row 3: Year & Class */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Academic Year</label>
                            <select
                                // value={year}
                                onChange={e => {
                                    setYear(e.target.value);
                                    setAssignedClasses([]);
                                }}
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
      focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            >
                                <option value="">Select Year</option>
                                {years.map(y => (
                                    <option key={y._id} value={y._id}>
                                        {y.year}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Class</label>
                            <select
                                // value={assignedClasses[0] || ""}
                                onChange={e => setAssignedClasses([e.target.value])}
                                disabled={!year}
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
      disabled:bg-slate-100 disabled:text-slate-400
      focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            >
                                <option value="">Select Class</option>
                                {yearClasses.map(c => (
                                    <option key={c._id} value={c._id}>
                                        {getClassLabel(c)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 4: Subject & Staff */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Subject</label>
                            <input
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                placeholder="Mathematics"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
      focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Staff</label>
                            <select
                                // value={staff}
                                onChange={e => setStaff(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
      focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            >
                                <option value="">Select Staff</option>
                                {allStaff.map(s => (
                                    <option key={s._id} value={s._id}>
                                        {s.fullname || s.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );

};

export default Timetable;