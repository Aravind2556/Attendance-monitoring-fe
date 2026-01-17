// import React, { useEffect, useState, useContext } from 'react';
// import { DContext } from '../../../context/Datacontext';
// import { fetchStaff } from '../../../service/fetchStaff';
// import { createTimetable } from '../../../service/createTimetable';

// const Timetable = () => {

//     const { BeURL, years, classes, currentHod } = useContext(DContext);

//     const [day, setDay] = useState('');
//     const [periodNo, setPeriodNo] = useState('');
//     const [startTime, setStartTime] = useState('');
//     const [endTime, setEndTime] = useState('');
//     const [subject, setSubject] = useState('');
//     const [staff, setStaff] = useState('');
//     const [year, setYear] = useState('');

//     const [assignedClasses, setAssignedClasses] = useState([]);
//     const [allStaff, setAllStaff] = useState([]);

//     useEffect(() => {
//         if (BeURL) fetchStaff({ BeURL, setAllStaff });
//     }, [BeURL]);

//     const hodClasses =
//         Array.isArray(classes) && Array.isArray(currentHod?.class)
//             ? classes.filter(c => currentHod.class.includes(c._id))
//             : [];

//     const getClassLabel = (c) => `${c.section} - ${c.number}`;

//     const handleRegister = async () => {
//         const tempTimetable = {
//             day,
//             periodNo,
//             startTime,
//             endTime,
//             year,
//             classes: assignedClasses,
//             subject,
//             staff
//         };

//         const res = await createTimetable({ BeURL, tempTimetable });
//         alert(res.message);

//         if (res.success) {
//             setDay('');
//             setPeriodNo('');
//             setStartTime('');
//             setEndTime('');
//             setSubject('');
//             setStaff('');
//             setYear('');
//             setAssignedClasses([]);
//         }
//     };

//     if (!currentHod || !Array.isArray(classes)) {
//         return <div className="p-10">Loading...</div>;
//     }

//     return (
//         <section className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
//             <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 space-y-6">

//                 <h2 className="text-2xl font-bold text-primary-600">Create Timetable</h2>

//                 {/* Day & Period */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <input
//                         placeholder="Day (Monday)"
//                         value={day}
//                         onChange={e => setDay(e.target.value)}
//                         className="input-style"
//                     />
//                     <input
//                         placeholder="Period No"
//                         value={periodNo}
//                         onChange={e => setPeriodNo(e.target.value)}
//                         className="input-style"
//                     />
//                 </div>

//                 {/* Time */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="input-style" />
//                     <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="input-style" />
//                 </div>

//                 {/* Class */}
//                 <div>
//                     <label className="font-medium">Class</label>
//                     <div className="mt-2 border rounded-xl p-4 space-y-2 max-h-32 overflow-y-auto">
//                         {hodClasses.map(c => (
//                             <label key={c._id} className="flex items-center gap-3">
//                                 <input
//                                     type="checkbox"
//                                     checked={assignedClasses.includes(c._id)}
//                                     onChange={e =>
//                                         e.target.checked
//                                             ? setAssignedClasses([...assignedClasses, c._id])
//                                             : setAssignedClasses(assignedClasses.filter(id => id !== c._id))
//                                     }
//                                 />
//                                 {getClassLabel(c)}
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Year & Subject */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <select value={year} onChange={e => setYear(e.target.value)} className="input-style">
//                         <option value="">Select Year</option>
//                         {years.map(y => (
//                             <option key={y._id} value={y._id}>{y.year}</option>
//                         ))}
//                     </select>

//                     <input
//                         placeholder="Subject"
//                         value={subject}
//                         onChange={e => setSubject(e.target.value)}
//                         className="input-style"
//                     />
//                 </div>

//                 {/* Staff */}
//                 <select value={staff} onChange={e => setStaff(e.target.value)} className="input-style">
//                     <option value="">Select Staff</option>
//                     {allStaff.map(s => (
//                         <option key={s._id} value={s._id}>
//                             {s.fullname || s.name}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Button */}
//                 <div className="flex justify-end">
//                     <button
//                         onClick={handleRegister}
//                         className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition"
//                     >
//                         Create Schedule
//                     </button>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default Timetable;





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
        if (BeURL) fetchStaff({ BeURL, setAllStaff });
    }, [BeURL]);

    /**
     * 🔹 Step 1: HOD assigned classes
     */
    const hodClasses = useMemo(() => {
        if (!Array.isArray(classes) || !Array.isArray(currentHod?.class)) return [];
        return classes.filter(c =>
            currentHod.class.includes(c._id)
        );
    }, [classes, currentHod]);

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
        <section className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 space-y-6">

                <h2 className="text-2xl font-bold text-primary-600">
                    Create Timetable
                </h2>

                {/* Day & Period */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input
                        placeholder="Day (Monday)"
                        value={day}
                        onChange={e => setDay(e.target.value)}
                        className="input-style"
                    />
                    <input
                        placeholder="Period No"
                        value={periodNo}
                        onChange={e => setPeriodNo(e.target.value)}
                        className="input-style"
                    />
                </div>

                {/* Time */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input type="time" value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        className="input-style" />
                    <input type="time" value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        className="input-style" />
                </div>

                {/* Year */}
                <select
                    value={year}
                    onChange={e => {
                        setYear(e.target.value);
                        setAssignedClasses([]); // 🔥 reset class on year change
                    }}
                    className="input-style"
                >
                    <option value="">Select Year</option>
                    {years.map(y => (
                        <option key={y._id} value={y._id}>
                            {y.year}
                        </option>
                    ))}
                </select>

                {/* Class (YEAR BASED) */}
                <div>
                    <label className="font-medium">Class</label>

                    {year === '' ? (
                        <p className="text-sm text-slate-500 mt-2">
                            Please select year to view classes
                        </p>
                    ) : (
                        <div className="mt-2 border rounded-xl p-4 space-y-2 max-h-32 overflow-y-auto">
                            {yearClasses.map(c => (
                                <label key={c._id} className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={assignedClasses.includes(c._id)}
                                        onChange={e =>
                                            e.target.checked
                                                ? setAssignedClasses([...assignedClasses, c._id])
                                                : setAssignedClasses(
                                                    assignedClasses.filter(id => id !== c._id)
                                                )
                                        }
                                    />
                                    {getClassLabel(c)}
                                </label>
                            ))}

                            {yearClasses.length === 0 && (
                                <p className="text-sm text-red-500">
                                    No classes available for this year
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Subject */}
                <input
                    placeholder="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="input-style"
                />

                {/* Staff */}
                <select value={staff} onChange={e => setStaff(e.target.value)} className="input-style">
                    <option value="">Select Staff</option>
                    {allStaff.map(s => (
                        <option key={s._id} value={s._id}>
                            {s.fullname || s.name}
                        </option>
                    ))}
                </select>

                {/* Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleRegister}
                        className="px-8 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700"
                    >
                        Create Schedule
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Timetable;
