import React, { useContext } from "react";
import RecipeItem from "../../components/navbar/recipe-item";
import GlobalState, { GlobalContext } from "../../context";

export default function Favourites(){
   
        const {favouritesList}=useContext(GlobalContext);
        
            return(
                <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
                        {favouritesList && favouritesList.length>0
                        ?favouritesList.map((item)=> <RecipeItem item={item}/>)
                            :<div>
                                <p className="lg:text-4xl text-xl text-center text-black font-extrabold">Nothing is Added</p>
                            </div>
                    
                        }
                </div>
                )
    

}