import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
    const [searchParam, setSearchParam] = useState("");
    const [loading,setLoading]=useState(false);
    const [recipeList,setRecipeList]=useState([]);
    const [recipeDetailsData,setRecipeDetailsData]=useState(null);
    const [favouritesList,setFavouritesList]=useState([]);
    const navigate=useNavigate();
    

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
            );
            const data = await response.json();
            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes);
                setLoading(false)
                setSearchParam('')
                navigate('/')
            }
            console.log(data); // Handle data here
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function handleAddToFavourite(getCurrentItem){
        console.log(getCurrentItem);
        let cpyFavouritesList=[...favouritesList];
        const index=cpyFavouritesList.findIndex(item=>item.id===getCurrentItem.id);
        if(index===-1){
            cpyFavouritesList.push(getCurrentItem)
        }else{
            cpyFavouritesList.splice(index)
        }
        setFavouritesList(cpyFavouritesList);
    }

    console.log(recipeList,loading)
    return (
        <GlobalContext.Provider value={{ searchParam, loading,recipeList,setSearchParam, handleSubmit,recipeDetailsData,setRecipeDetailsData,handleAddToFavourite,favouritesList }}>
            {children}
        </GlobalContext.Provider>
    );
}
