export const deleteClass = async ({ BeURL, id }) => {
    try {
        const res = await fetch(
            `${BeURL}/deleteClass/${id}`,
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
