export const fetchDropDwonDepartments = async ({ BeURL }) => {
    try {
        const res = await fetch(`${BeURL}/fetchDropDownDepartment`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in fetch department:", error);
        return { success: false, message: "Server error" };
    }
};

