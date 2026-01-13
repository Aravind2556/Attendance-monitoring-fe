export const updateClassApi = async ({ BeURL, editId, section, number, department, year}) => {
    console.log("BeURL, editId, name", BeURL, editId, section, number, department, year)
    try {
        const res = await fetch(`${BeURL}/updateClass/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ section, number, department, year }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in update class:", error);
        return { success: false, message: "Server error" };
    }
};
