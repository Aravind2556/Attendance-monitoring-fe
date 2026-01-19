import React, { useState, useContext } from 'react';
import { DContext } from '../../../context/Datacontext';
import { useNavigate } from 'react-router-dom';

const ClassStaffRegister = () => {

    const { currentUser, BeURL, years, currentHod, classes } = useContext(DContext);
    console.log("Curr", currentHod)

    const navigate = useNavigate()
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

    // Filter only HOD assigned classes
    const hodClasses =
        classes?.filter(c => currentHod?.class?.includes(c._id)) || [];

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
            isTutor: isClassIncharge,
            gender: gender.toLowerCase(),
            department: currentUser?.department,
            year: selectedYears,
            classes: assignedClasses,
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
        navigate('/hod/staff')
    };

    if (!currentHod) return <div className="p-10">Loading...</div>;

    return (
        <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200 overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-white">
                    <h2 className="text-3xl font-bold">Create Staff Account</h2>
                    <p className="mt-2 text-sm ">
                        Register staff for Smart Attendance Monitoring
                    </p>
                </div>

                {/* Form */}
                <div className="p-8 space-y-8">

                    {/* Name & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Full Name</label>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="John Alex"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
              focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Contact</label>
                            <input
                                value={contact}
                                onChange={e => setContact(e.target.value)}
                                placeholder="+91 9876543210"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
              focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>
                    </div>

                    {/* Email & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Email</label>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
              focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Gender</label>
                            <div className="mt-3 flex gap-4">
                                {["Male", "Female", "Other"].map(g => (
                                    <label
                                        key={g}
                                        className={`px-4 py-2 rounded-full border cursor-pointer transition
                  ${gender === g
                                                ? "bg-primary-600 text-white border-primary-600"
                                                : "border-slate-300 text-slate-700 hover:border-primary-400"
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
                    </div>

                    {/* Passwords */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
              focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm
              focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                            />
                        </div>
                    </div>

                    {!comparePassword && (
                        <p className="rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
                            Passwords do not match
                        </p>
                    )}



                    {/* Class Incharge Toggle */}
                    <div className="flex items-center justify-between rounded-xl border border-slate-300 bg-slate-50 px-4 py-3">
                        <div>
                            <p className="text-sm font-medium text-slate-800">Is Class Incharge?</p>
                            <p className="text-xs text-slate-500">
                                Enable if this staff manages a class
                            </p>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isClassIncharge}
                                onChange={(e) => setIsClassIncharge(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-primary-600 transition"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                        </label>
                    </div>


                    {/* Classes */}
                    {isClassIncharge && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* Year Dropdown */}
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Academic Year
                                </label>
                                <select
                                    // value={selectedYears}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (!selectedYears.includes(value)) {
                                            setSelectedYears([...selectedYears, value]);
                                        }
                                    }}
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
        focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                                >
                                    <option value="">Select Year</option>
                                    {years.map((y) => (
                                        <option key={y._id} value={y._id}>
                                            {y.year}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Class Dropdown */}
                            <div>
                                <label className="text-sm font-medium text-slate-700">
                                    Class / Section
                                </label>
                                <select
                                    // value={selectedClass}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (!assignedClasses.includes(value)) {
                                            setAssignedClasses([...assignedClasses, value]);
                                        }
                                    }}
                                    className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm
        focus:border-primary-600 focus:ring-4 focus:ring-primary-200"
                                >
                                    <option value="">Select Class</option>
                                    {hodClasses.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {getClassLabel(c)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    )}


                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            onClick={handleClear}
                            className="rounded-xl border-2 border-primary-600 px-6 py-3
            text-primary-600 font-semibold hover:bg-primary-600 hover:text-white transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleRegister}
                            className="rounded-xl bg-primary-600 px-8 py-3
            text-white font-semibold hover:bg-primary-700 transition"
                        >
                            Create Account →
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );

};

export default ClassStaffRegister;


// import React, { useState, useContext, useMemo } from 'react';
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

//     /** 🔹 HOD assigned classes only */
//     const hodClasses = useMemo(() => {
//         return classes?.filter(c =>
//             currentHod?.class?.includes(c._id)
//         ) || [];
//     }, [classes, currentHod]);

//     /** 🔹 Filter classes based on selected year */
//     const filteredClasses = useMemo(() => {
//         if (selectedYears.length === 0) return [];
//         return hodClasses.filter(c =>
//             selectedYears.includes(c.year)
//         );
//     }, [hodClasses, selectedYears]);

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
//             gender: gender.toLowerCase(),
//             department: currentUser?.department,
//             year: selectedYears,
//             classes: assignedClasses,
//             isTutor: isClassIncharge,
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
//             <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl p-8 space-y-6">

//                 <h2 className="text-2xl font-bold text-primary-600">
//                     Create Staff Account
//                 </h2>

//                 {/* Name & Contact */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <input
//                         placeholder="Full Name"
//                         value={name}
//                         onChange={e => setName(e.target.value)}
//                         className="input"
//                     />
//                     <input
//                         placeholder="Contact"
//                         value={contact}
//                         onChange={e => setContact(e.target.value)}
//                         className="input"
//                     />
//                 </div>

//                 {/* Email & Gender */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <input
//                         placeholder="Email"
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                         className="input"
//                     />

//                     <div className="flex gap-3">
//                         {["Male", "Female", "Other"].map(g => (
//                             <label
//                                 key={g}
//                                 className={`px-4 py-2 rounded-full border cursor-pointer
//                                 ${gender === g
//                                         ? "bg-primary-600 text-white"
//                                         : "border-slate-300"
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

//                 {/* Password */}
//                 <div className="grid md:grid-cols-2 gap-5">
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                         className="input"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={e => setConfirmPassword(e.target.value)}
//                         className="input"
//                     />
//                 </div>

//                 {!comparePassword && (
//                     <p className="text-sm text-red-600">Passwords do not match</p>
//                 )}

//                 {/* Year Selection */}
//                 <div>
//                     <label className="font-medium">Year</label>
//                     <div className="mt-2 space-y-2">
//                         {years.map(y => (
//                             <label key={y._id} className="flex items-center gap-3">
//                                 <input
//                                     type="checkbox"
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

//                 {/* Class Selection */}
//                 <div>
//                     <label className="font-medium">Class</label>

//                     {selectedYears.length === 0 ? (
//                         <p className="text-sm text-slate-500 mt-2">
//                             Select year to view classes
//                         </p>
//                     ) : (
//                         <div className="mt-2 border rounded-xl p-4 space-y-2 max-h-40 overflow-y-auto">
//                             {filteredClasses.map(c => (
//                                 <label key={c._id} className="flex items-center gap-3">
//                                     <input
//                                         type="checkbox"
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
//                     )}
//                 </div>

//                 {/* Class Incharge Toggle */}
//                 <div className="flex justify-between border p-3 rounded-xl">
//                     <span>Is Class Incharge?</span>
//                     <input
//                         type="checkbox"
//                         checked={isClassIncharge}
//                         onChange={e => setIsClassIncharge(e.target.checked)}
//                     />
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex justify-end gap-4">
//                     <button onClick={handleClear} className="btn-outline">
//                         Cancel
//                     </button>
//                     <button onClick={handleRegister} className="btn-primary">
//                         Create Account
//                     </button>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default ClassStaffRegister;
