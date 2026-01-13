export const createYearApi = async ({ BeURL, year }) => {

    console.log("yera api", BeURL , year)
    try {
        const res = await fetch(`${BeURL}/createYear`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ year }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in create year:", error);
        return { success: false, message: "Server error" };
    }
};
