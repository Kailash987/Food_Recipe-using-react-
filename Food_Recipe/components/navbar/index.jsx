import { useContext } from "react";
import { NavLink } from "react-router-dom";
import GlobalState, { GlobalContext } from "../../context";

export default function Navbar(){
    const {searchParam,setSearchParam,handleSubmit}=useContext(GlobalContext);
    console.log(searchParam);
    return <div>
        <div className="Nav-bar items-center py-8 mx-auto flex flex-col lg:flex-row gap-5 lg:gap:0 justify-between ">
            <h2 className="text-2xl font-semibold">
            <NavLink to={"/"}>FoodRecipe</NavLink>
            </h2>
            <form onSubmit={handleSubmit}>
                <input 
                    value={searchParam}
                    onChange={(event)=> setSearchParam(event.target.value)}
                    name="search"
                    className="shadow-lg border border-none border-gray-300 rounded-xl p-2 focus:shadow-xl focus:outline-none"
                    placeholder="Enter items..."></input>
            </form>
            <ul className="flex gap-5">
                <li>
                    <NavLink
                    to={"/"}
                    className="text-black hover:text-gray-700 duration-300"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to={"/favourites"}
                    className="text-black hover:text-gray-700 duration-300"
                    >
                        Favourites
                    </NavLink>
                </li>
            </ul>
            <div className=" flex flex-column justify-between items-center">
            
            </div>
            
        </div>
    </div>
}