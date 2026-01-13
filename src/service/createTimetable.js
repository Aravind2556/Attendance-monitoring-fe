export const createTimetable = async ({ BeURL, tempTimetable }) => {
    try {
        const res = await fetch(`${BeURL}/create-timetable`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: tempTimetable
        });

        const data = await res.json();
        if (data.success)
            alert(data.message)

        else
            alert(data.message)
    } catch (error) {
        console.error("Error in fetch year:", error);
        return { success: false, message: "Server error" };
    }
};

