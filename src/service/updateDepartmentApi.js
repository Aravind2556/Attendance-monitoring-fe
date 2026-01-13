export const updateDepartmentApi = async ({ BeURL, editId, name }) => {
    console.log("BeURL, editId, name", BeURL, editId, name)
    try {
        const res = await fetch(`${BeURL}/updateDepartment/${editId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name }),
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in update department:", error);
        return { success: false, message: "Server error" };
    }
};
