export const updateYearApi = async ({ BeURL, editId, year }) => {
    console.log("BeURL, editId, name", BeURL, editId, year)
    try {
        const res = await fetch(`${BeURL}/updateYear/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ year }),
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in update year:", error);
        return { success: false, message: "Server error" };
    }
};
