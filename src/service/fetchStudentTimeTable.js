export const fetchStudentTimeTable = async ({ BeURL }) => {
    try {
        const res = await fetch(`${BeURL}/fetchstudenttimetable`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        return await res.json();
    } catch (error) {
        console.error("Error in fetch student timetable:", error);
        return { success: false, message: "Server error" };
    }
};
