export const fetchCurrentHod = async ({ BeURL }) => {
    try {
        const res = await fetch(`${BeURL}/fetchCurrentHod`, {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in fetching current HOD:", error);
        return { success: false, message: "Server error" };
    }
};
