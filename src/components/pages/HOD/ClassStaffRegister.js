// import React, { useState, useContext } from 'react';
// import { DContext } from '../../../context/Datacontext';

// const ClassStaffRegister = () => {

//     const { currentUser, BeURL, years, currentHod, classes } = useContext(DContext);

//     const [name, setName] = useState('');
//     const [contact, setContact] = useState('');
//     const [email, setEmail] = useState('');
//     const [gender, setGender] = useState('Male');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const [isClassIncharge, setIsClassIncharge] = useState(false);

//     const [selectedYears, setSelectedYears] = useState([]);
//     const [assignedClasses, setAssignedClasses] = useState([]);

//     const [comparePassword, setComparePassword] = useState(true);

//     // Filter only HOD assigned classes
//     const hodClasses =
//         classes?.filter(c => currentHod?.class?.includes(c._id)) || [];

//     const getClassLabel = (cls) => {
//         if (!cls) return "";
//         return `${cls.section} - ${cls.number}`;
//     };

//     const handleRegister = () => {
//         setComparePassword(password === confirmPassword);

//         if (!name || !email || !contact || !password) {
//             alert("All fields are required!");
//             return;
//         }

//         if (password !== confirmPassword) {
//             alert("Passwords do not match!");
//             return;
//         }

//         if (isClassIncharge && assignedClasses.length === 0) {
//             alert("Please select at least one class");
//             return;
//         }

//         const tempUser = {
//             fullname: name,
//             email,
//             contact,
//             password,
//             isTutor: isClassIncharge,
//             gender: gender.toLowerCase(),
//             department: currentUser?.department,
//             year: selectedYears,
//             classes: assignedClasses,
//         };

//         fetch(`${BeURL}/register`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             credentials: "include",
//             body: JSON.stringify(tempUser),
//         })
//             .then(res => res.json())
//             .then(data => {
//                 alert(data.message);
//                 if (data.success) handleClear();
//             })
//             .catch(() => alert("Server error"));
//     };

//     const handleClear = () => {
//         setName('');
//         setEmail('');
//         setContact('');
//         setPassword('');
//         setConfirmPassword('');
//         setGender('Male');
//         setIsClassIncharge(false);
//         setSelectedYears([]);
//         setAssignedClasses([]);
//     };

//     if (!currentHod) return <div className="p-10">Loading...</div>;

//     return (
//         <section className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
//             <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl ring-1 ring-slate-200 p-8 space-y-6">

//                 <h2 className="text-2xl font-bold text-primary-600">
//                     Create Staff Account
//                 </h2>

//                 {/* Name & Contact */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <input
//                         placeholder="Full Name"
//                         value={name}
//                         onChange={e => setName(e.target.value)}
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//             focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     />
//                     <input
//                         placeholder="Contact"
//                         value={contact}
//                         onChange={e => setContact(e.target.value)}
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//             focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     />
//                 </div>

//                 {/* Email & Gender */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <input
//                         placeholder="Email"
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//             focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     />

//                     <div className="flex gap-3">
//                         {["Male", "Female", "Other"].map(g => (
//                             <label
//                                 key={g}
//                                 className={`px-4 py-2 rounded-full border cursor-pointer transition
//                   ${gender === g
//                                         ? "bg-primary-600 text-white border-primary-600"
//                                         : "border-slate-300 text-slate-700 hover:border-primary-400"
//                                     }`}
//                             >
//                                 <input
//                                     type="radio"
//                                     value={g}
//                                     checked={gender === g}
//                                     onChange={e => setGender(e.target.value)}
//                                     className="hidden"
//                                 />
//                                 {g}
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Passwords */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//             focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={e => setConfirmPassword(e.target.value)}
//                         className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
//             focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     />
//                 </div>

//                 {!comparePassword && (
//                     <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-xl">
//                         Passwords do not match
//                     </p>
//                 )}

//                 {/* Year */}
//                 <div>
//                     <label className="font-medium text-slate-700">Year</label>
//                     <div className="mt-2 space-y-2">
//                         {years.map(y => (
//                             <label key={y._id} className="flex items-center gap-3 text-sm">
//                                 <input
//                                     type="checkbox"
//                                     className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
//                                     checked={selectedYears.includes(y._id)}
//                                     onChange={e =>
//                                         e.target.checked
//                                             ? setSelectedYears([...selectedYears, y._id])
//                                             : setSelectedYears(
//                                                 selectedYears.filter(id => id !== y._id)
//                                             )
//                                     }
//                                 />
//                                 {y.year} - Year
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Class Incharge Toggle */}
//                 <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-4 py-3">
//                     <span className="text-sm font-medium">Is Class Incharge?</span>
//                     <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                             type="checkbox"
//                             checked={isClassIncharge}
//                             onChange={e => setIsClassIncharge(e.target.checked)}
//                             className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-primary-600"></div>
//                         <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full
//             peer-checked:translate-x-5 transition"></div>
//                     </label>
//                 </div>

//                 {/* Classes */}
//                 {isClassIncharge && (
//                     <div>
//                         <label className="font-medium text-slate-700">Class</label>
//                         <div className="mt-2 rounded-xl border border-slate-300 bg-white p-4 space-y-2 max-h-32 overflow-y-auto">
//                             {hodClasses.map(c => (
//                                 <label key={c._id} className="flex items-center gap-3 text-sm">
//                                     <input
//                                         type="checkbox"
//                                         className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
//                                         checked={assignedClasses.includes(c._id)}
//                                         onChange={e =>
//                                             e.target.checked
//                                                 ? setAssignedClasses([...assignedClasses, c._id])
//                                                 : setAssignedClasses(
//                                                     assignedClasses.filter(id => id !== c._id)
//                                                 )
//                                         }
//                                     />
//                                     {getClassLabel(c)}
//                                 </label>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Buttons */}
//                 <div className="flex justify-end gap-4">
//                     <button
//                         onClick={handleClear}
//                         className="min-w-[140px] rounded-xl border-2 border-primary-600
//             text-primary-600 py-3 font-semibold
//             hover:bg-primary-600 hover:text-white transition"
//                     >
//                         Cancel
//                     </button>

//                     <button
//                         onClick={handleRegister}
//                         className="min-w-[160px] rounded-xl bg-primary-600
//             py-3 text-white font-semibold
//             hover:bg-primary-700 transition"
//                     >
//                         Create Account
//                     </button>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default ClassStaffRegister;


import React, { useState, useContext, useMemo } from 'react';
import { DContext } from '../../../context/Datacontext';

const ClassStaffRegister = () => {

    const { currentUser, BeURL, years, currentHod, classes } = useContext(DContext);

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isClassIncharge, setIsClassIncharge] = useState(false);
    const [selectedYears, setSelectedYears] = useState([]);
    const [assignedClasses, setAssignedClasses] = useState([]);

    const [comparePassword, setComparePassword] = useState(true);

    /** 🔹 HOD assigned classes only */
    const hodClasses = useMemo(() => {
        return classes?.filter(c =>
            currentHod?.class?.includes(c._id)
        ) || [];
    }, [classes, currentHod]);

    /** 🔹 Filter classes based on selected year */
    const filteredClasses = useMemo(() => {
        if (selectedYears.length === 0) return [];
        return hodClasses.filter(c =>
            selectedYears.includes(c.year)
        );
    }, [hodClasses, selectedYears]);

    const getClassLabel = (cls) => {
        if (!cls) return "";
        return `${cls.section} - ${cls.number}`;
    };

    const handleRegister = () => {
        setComparePassword(password === confirmPassword);

        if (!name || !email || !contact || !password) {
            alert("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (isClassIncharge && assignedClasses.length === 0) {
            alert("Please select at least one class");
            return;
        }

        const tempUser = {
            fullname: name,
            email,
            contact,
            password,
            gender: gender.toLowerCase(),
            department: currentUser?.department,
            year: selectedYears,
            classes: assignedClasses,
            isTutor: isClassIncharge,
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
        setIsClassIncharge(false);
        setSelectedYears([]);
        setAssignedClasses([]);
    };

    if (!currentHod) return <div className="p-10">Loading...</div>;

    return (
        <section className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 space-y-6">

                <h2 className="text-2xl font-bold text-primary-600">
                    Create Staff Account
                </h2>

                {/* Name & Contact */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input
                        placeholder="Full Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="input"
                    />
                    <input
                        placeholder="Contact"
                        value={contact}
                        onChange={e => setContact(e.target.value)}
                        className="input"
                    />
                </div>

                {/* Email & Gender */}
                <div className="grid md:grid-cols-2 gap-5">
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input"
                    />

                    <div className="flex gap-3">
                        {["Male", "Female", "Other"].map(g => (
                            <label
                                key={g}
                                className={`px-4 py-2 rounded-full border cursor-pointer
                                ${gender === g
                                        ? "bg-primary-600 text-white"
                                        : "border-slate-300"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    value={g}
                                    checked={gender === g}
                                    onChange={e => setGender(e.target.value)}
                                    className="hidden"
                                />
                                {g}
                            </label>
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
                        className="input"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="input"
                    />
                </div>

                {!comparePassword && (
                    <p className="text-sm text-red-600">Passwords do not match</p>
                )}

                {/* Year Selection */}
                <div>
                    <label className="font-medium">Year</label>
                    <div className="mt-2 space-y-2">
                        {years.map(y => (
                            <label key={y._id} className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={selectedYears.includes(y._id)}
                                    onChange={e =>
                                        e.target.checked
                                            ? setSelectedYears([...selectedYears, y._id])
                                            : setSelectedYears(
                                                selectedYears.filter(id => id !== y._id)
                                            )
                                    }
                                />
                                {y.year} - Year
                            </label>
                        ))}
                    </div>
                </div>

                {/* Class Selection */}
                <div>
                    <label className="font-medium">Class</label>

                    {selectedYears.length === 0 ? (
                        <p className="text-sm text-slate-500 mt-2">
                            Select year to view classes
                        </p>
                    ) : (
                        <div className="mt-2 border rounded-xl p-4 space-y-2 max-h-40 overflow-y-auto">
                            {filteredClasses.map(c => (
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
                        </div>
                    )}
                </div>

                {/* Class Incharge Toggle */}
                <div className="flex justify-between border p-3 rounded-xl">
                    <span>Is Class Incharge?</span>
                    <input
                        type="checkbox"
                        checked={isClassIncharge}
                        onChange={e => setIsClassIncharge(e.target.checked)}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">
                    <button onClick={handleClear} className="btn-outline">
                        Cancel
                    </button>
                    <button onClick={handleRegister} className="btn-primary">
                        Create Account
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ClassStaffRegister;
