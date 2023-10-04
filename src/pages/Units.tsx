
import { ChangeEvent, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { useAppContext } from "../contextApi/AppContext";


export default function UnitPage() {
    const [search, setSearch] = useState("");
    const { setAvailability} = useAppContext()
    function handleSearch(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setSearch(event.target.value);
    }
    return (
        <div >
           
                <div className="flex items-center justify-center w-full mt-6 bg-indigo-200">
                    <Link to="" onClick={()=>setAvailability(false)} >
                    <div className="dashboardlink">
                        <span >All Units</span>
                    </div>
                    </Link>
                    <Link to="registerunit" >
                    <div className="dashboardlink">
                        <span >Add Units</span>
                    </div>
                    </Link>
                    <Link to="updatestatus" >
                    <div className="dashboardlink">
                        <span>Edit Availability status</span>
                    </div>
                    </Link>
                    <div className="flex items-center rounded-md bg-white p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="search by unit number"
                        className="p-2  outline-none bg-transparent"
                    >
                    </input>
                   
                    </div>
                   
                </div>
                <div>
                    <Outlet context={{search}} />
                </div>
            
        </div>
    )


}