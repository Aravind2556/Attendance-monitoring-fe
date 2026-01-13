export const createClassApi = async ({ BeURL, section,number,department,year }) => {

    console.log("yera api", BeURL, section, number, department, year)
    try {
        const res = await fetch(`${BeURL}/createClass`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                section,
                number,
                department,
                year }),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error in create Class:", error);
        return { success: false, message: "Server error" };
    }
};
