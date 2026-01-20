export const fetchTimetable = async ({ BeURL, setLoading, setTimetableCount }) => {
    try {
        setLoading(true);

        // example: fetch all timetables (or change API if needed)    /fetchtimetables?year=1
        const res = await fetch(`${BeURL}/fetch-timetable`, {
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


export const fetchTimetableyear = async ({ BeURL, setTimetable, year }) => {
    try {
      

        // example: fetch all timetables (or change API if needed)    /fetchtimetables?year=1
        const res = await fetch(`${BeURL}/fetch-timetable/${year}`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            // setTimetableCount(data.timetables.length);
            setTimetable(data.timetable)
        } else {
            alert(data.message)
        }

    } catch (error) {
        console.error("Fetch timetable error:", error);
        alert(error)

    } 
};



export const fetchTimetableStaff = async ({ BeURL, setTimetable, year }) => {
    try {


        // example: fetch all timetables (or change API if needed)    /fetchtimetables?year=1
        const res = await fetch(`${BeURL}/fetch-stafftimetable/${year}`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            // setTimetableCount(data.timetables.length);
            setTimetable(data.timetable)
        } else {
            alert(data.message)
        }

    } catch (error) {
        console.error("Fetch timetable error:", error);
        alert(error)

    }
};


export const fetchTimetableTutor = async ({ BeURL, setTimetable }) => {
    try {


        // example: fetch all timetables (or change API if needed)    /fetchtimetables?year=1
        const res = await fetch(`${BeURL}/fetch-tutortimetable`, {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        if (data.success) {
            // setTimetableCount(data.timetables.length);
            setTimetable(data.timetable)
        } else {
            alert(data.message)
        }

    } catch (error) {
        console.error("Fetch timetable error:", error);
        alert(error)

    }
};