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
        console.log("Error in fetch department:", error);
        return { success: false, message: "Unable to load drop down department details" };
    }
};

