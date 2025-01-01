import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import GlobalState, { GlobalContext } from "../../context";

export default function Details() {
  const { id } = useParams();
  const { recipeDetailsData, setRecipeDetailsData,handleAddToFavourite,favouritesList } = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await response.json();

      console.log(data);
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    }
    getRecipeDetails();
  }, []);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Image Section */}
      <div className="row-start-1 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            alt="Recipe"
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>

      

      {/* Ingredients Section */}
      <div className="flex flex-col gap-5">
        {/* Recipe Publisher and Title */}
        <div>
          <span className="text-sm text-cyan-700 font-medium">
            {recipeDetailsData?.recipe?.publisher}
          </span>
          <h2 className="font-bold text-3xl truncate text-black">
            {recipeDetailsData?.recipe?.title}
          </h2>
        </div>

        {/* Ingredients */}
        <div>
          <span className="text-2xl font-semibold text-black">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3 mt-3">
            {recipeDetailsData?.recipe?.ingredients.map((ingredient, index) => (
              <li key={index} className="flex gap-2 items-center">
                <span className="text-xl font-semibold text-black">
                  {ingredient.quantity} {ingredient.unit}
                </span>
                <span className="text-xl text-black">{ingredient.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Save Button */}
        <div>
          <button onClick={()=>handleAddToFavourite(recipeDetailsData?.recipe)} className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider shadow-md bg-black text-white">
            {
              favouritesList && favouritesList.length >0 && favouritesList.findIndex(
                (item)=> item.id===recipeDetailsData?.recipe?.id
              )!==-1
              ?"Remove from favourites"
              :"Add To Favourites"
            }
          </button>
        </div>
      </div>
    </div>
  );
}
