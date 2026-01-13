import { createContext, useEffect, useState } from "react";
import { fetchDepartment } from "../service/fetchDepartment";
import { fetchYear } from "../service/fetchYear";
import { fetchClass } from "../service/fetchClass";
import { fetchDropDwonDepartments } from "../service/fetchDropDwonDepartments";

export const DContext = createContext()

const DataContext = ({children}) => {

    const BeURL = process.env.REACT_APP_BeURL
    const [isAuth, setIsAuth] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [departments, setDepartments] = useState([]);
    const [years, setYears] = useState([]);
    const [classes,setClasses]=useState([])
    const [dropdownDepartments,setDropDownDepartments]=useState([])

    useEffect(()=>{
        fetch(`${BeURL}/checkauth`,{
            credentials: "include"
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setIsAuth(true)
                setCurrentUser(data.user)
            }
            else{
                setIsAuth(false)
                setCurrentUser({})
            }
        })
        .catch(err=>{
            setIsAuth(null)
            setCurrentUser(null)
            console.log("Erron in fetching User:",err)
            alert("Trouble in connecting to the Server, please try again later.")
        })
    },[])


    const handleLogout = () => {
        fetch(`${BeURL}/logout`,{
            credentials: "include"
        })
        .then(res=>res.json())
        .then(data=>{
            alert(data.message)
            if(data.success){
                setIsAuth(false)
                setCurrentUser({})
            }
        })
        .catch(err=>{
            console.log("Erron in Logout:",err)
            alert("Trouble in connecting to the Server, please try again later.")
        })
    }

        useEffect(() => {
            const loadDepartments = async () => {
                const data = await fetchDepartment({ BeURL });
    
                if (data.success) {
                    setDepartments(data.departments);
                } else {
                    alert(data.message);
                }
            };
            loadDepartments();
        }, [])


            useEffect(() => {
                const loadyears = async () => {
                    const data = await fetchYear({ BeURL });
                    if (data.success) {
                        setYears(data.years);
                    } else {
                        alert(data.message);
                    }
                };
                loadyears();
            }, []);

                useEffect(() => {
                    const loadClasses = async () => {
                        const data = await fetchClass({ BeURL });
                        if (data.success) {
                            setClasses(data.classes);
                        } else {
                            alert(data.message);
                        }
                    };
                    loadClasses();
                }, []);


                useEffect(()=>{
                    const loadDepartments = async () => {
                        const data = await fetchDropDwonDepartments({ BeURL });
                        if (data.success) {
                            setDropDownDepartments(data.departments);
                        } else {
                            alert(data.message);
                        }
                    };
                    loadDepartments();
                })
            




    const data = { isAuth, currentUser, setIsAuth, setCurrentUser, BeURL, handleLogout, departments, setDepartments, years, setYears, classes, setClasses, dropdownDepartments }

    return (
        <DContext.Provider value={data}>
            {children}
        </DContext.Provider>
    )
}

export default DataContext