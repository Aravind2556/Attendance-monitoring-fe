export const fetchStaffs = async ({ BeURL, setAllStaff, setLoadingStaffs }) => {
    try {
        setLoadingStaffs(true);

        const res = await fetch(`${BeURL}/fetchCurrentHodStaffs`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (data.success) {
            setAllStaff(data.staffs);
        } else {
            setAllStaff([]);
        }

    } catch (error) {
        console.error("Error fetching staffs:", error);
        setAllStaff([]);
    } finally {
        setLoadingStaffs(false);
    }
};
