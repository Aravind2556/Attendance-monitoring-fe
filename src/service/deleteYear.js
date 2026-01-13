export const deleteYear = async ({ BeURL, id }) => {
    try {
        const res = await fetch(
            `${BeURL}/deleteYear/${id}`,
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
        console.error("Error in delete year:", error);
        return { success: false, message: "Server error" };
    }
};
