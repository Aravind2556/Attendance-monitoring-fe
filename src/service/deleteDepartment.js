export const deleteDepartment = async ({ BeURL, id }) => {
    try {
        const res = await fetch(
            `${BeURL}/deleteDepartment/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            }
        );

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in delete department:", error);
        return { success: false, message: "Server error" };
    }
};
