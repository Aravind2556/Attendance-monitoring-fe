export const fetchUsers = async ({ BeURL }) => {
    try {
        const res = await fetch(`${BeURL}/fetchusers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in fetch year:", error);
        return { success: false, message: "Server error" };
    }
};
