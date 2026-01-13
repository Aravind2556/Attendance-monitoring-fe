export const fetchHod = async ({ BeURL }) => {
    try {
        const res = await fetch(`${BeURL}/fetchHod`, {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching HOD:", error);
        return { success: false, message: "Failed to fetch HODs" };
    }
};
