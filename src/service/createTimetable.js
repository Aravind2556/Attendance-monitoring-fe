// service/createTimetable.js
export const createTimetable = async ({ BeURL, tempTimetable }) => {
    try {
        const res = await fetch(`${BeURL}/create-timetable`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(tempTimetable) // 🔥 IMPORTANT
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error in createTimetable:", error);
        return { success: false, message: "Server error" };
    }
};
