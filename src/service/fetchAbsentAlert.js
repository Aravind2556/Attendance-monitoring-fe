export const fetchAbsentAlert = async ({ BeURL }) => {
    try {
        const res = await fetch(`${BeURL}/fetch-alerts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        return await res.json();
    } catch (error) {
        console.error("Error fetching absent alerts:", error);
        return { success: false, message: "Server error" };
    }
};
