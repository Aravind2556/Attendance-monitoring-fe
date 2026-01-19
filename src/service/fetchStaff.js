export const fetchStaff = async ({ BeURL, setAllStaff }) => {
    try {
        const res = await fetch(`${BeURL}/fetch-staff`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        if (data.success)
            setAllStaff(data.staff)
        else
            alert(data.message)
    } catch (error) {
        console.error("Error in fetch staff:", error);
        return { success: false, message: "Error in fetch staff:" };
    }
};

export const fetchStaffId = async ({ BeURL, setStaff, id }) => {
    try {
        const res = await fetch(`${BeURL}/staff/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        if (data.success)
            setStaff(data.staff)
        else
            alert(data.message)
    } catch (error) {
        console.error("Error in fetch staff:", error);
        return { success: false, message: "Error in fetch staff:" };
    }
};

export const fetchStudents = async ({ BeURL, setAllStudents }) => {
    try {
        const res = await fetch(`${BeURL}/fetch-students`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        if (data.success)
            setAllStudents(data.students)
        else
            alert(data.message)
    } catch (error) {
        console.error("Error in fetch students:", error);
        return { success: false, message: "Error in fetch Students:" };
    }
};
