import { useState, useEffect } from "react";
import http from "../http-common";
export default function useCategory() {
  const [category, setCategory] = useState([]);

  //get category
  const getCategory = async () => {
    try {
      const { data } = await http.get("/categories");
      setCategory(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return category;
}