export const fetchTimetable = async ({ BeURL, setLoading, setTimetableCount }) => {
    try {
        setLoading(true);

        // example: fetch all timetables (or change API if needed)
        const res = await fetch(`${BeURL}/fetchtimetables?year=1`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            setTimetableCount(data.timetables.length);
        } else {
            setTimetableCount(0);
        }

    } catch (error) {
        console.error("Fetch timetable error:", error);
        setTimetableCount(0);
    } finally {
        setLoading(false);
    }
};
