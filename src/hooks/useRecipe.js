import { useState, useEffect } from "react";
import http from "../http-common";
export default function useRecipe() {
  const [Recipe, setRecipe] = useState([]);

  //get category
  const getRecipe = async () => {
    try {
      const { data } = await http.get("/recipes");
      setRecipe(data.recipes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return Recipe;
}