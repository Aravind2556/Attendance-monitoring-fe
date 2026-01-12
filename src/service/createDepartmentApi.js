export const createDepartmentApi = async ({ BeURL, name }) => {
    try {
        const res = await fetch(`${BeURL}/createDepartment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ name }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in create department:", error);
        return { success: false, message: "Server error" };
    }
};
