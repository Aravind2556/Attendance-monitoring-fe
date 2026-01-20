import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DContext } from '../../../context/Datacontext';
import { fetchStaffs } from '../../../service/fetchStaffs';
import { fetchStaffId } from '../../../service/fetchStaff';

export const StaffManage = () => {
    const { BeURL } = useContext(DContext);
    const [allStaff, setAllStaff] = useState([]);
    const [staff, setStaff] = useState([])
    const [loadingStaffs, setLoadingStaffs] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!BeURL) return;
        fetchStaffs({ BeURL, setAllStaff, setLoadingStaffs });
    }, [BeURL]);

    // ✅ Correct loading check
    if (loadingStaffs) {
        return <div className="p-6">Loading staffs...</div>;
    }

    const handleStaff = async (id) => {
        const fetchedStaff = await fetchStaffId({ BeURL, setStaff, id });
        setSelectedStaff(fetchedStaff || staff); // Assuming fetchStaffId returns the staff object or sets it in state
        setShowPopup(true);
    }

    const closePopup = () => {
        setShowPopup(false);
        setSelectedStaff(null);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 space-y-5">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
                <p className="text-gray-500">Manage staff & tutors under your department</p>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end">
                <button
                    onClick={() => navigate("/hod/createstaff")}
                    className="px-6 py-3 rounded-lg text-white font-semibold
          bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90"
                >
                    Create Staff
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Staff List</h2>

                <table className="w-full border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">#</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allStaff.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-4 text-center text-gray-400">
                                    No staff found
                                </td>
                            </tr>
                        ) : (
                            allStaff.map((staff, index) => (
                                <tr key={staff._id} className="border-b">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">
                                        {staff.fullname || staff.name}
                                    </td>
                                    <td className="px-4 py-2 capitalize">
                                        {staff.role}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="text-blue-600 hover:underline" onClick={() => handleStaff(staff._id)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Popup Modal */}
            {showPopup && selectedStaff && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h3 className="text-xl font-bold mb-4">Staff Details</h3>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {selectedStaff[0]?.staff?.fullname || selectedStaff.name}</p>
                            <p><strong>Email:</strong> {selectedStaff[0]?.staff?.email}</p>
                            <p><strong>Role:</strong> {selectedStaff[0]?.staff?.role}</p>
                            <p><strong>Department:</strong> {selectedStaff[0]?.department?.name}</p>
                            <p><strong>Contact:</strong> {selectedStaff[0]?.staff?.contact}</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={closePopup}
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div>

            </div>

        </div>
    );
};