import { createContext, useState } from "react";
import { BASE_URL } from "../utils/general";

export const MealContext = createContext();

export const MealProvider = ({ children }) => {
	const [meals, setMeasl] = useState([]);
	const [basket, setBasket] = useState([]);

	const getBasket = async () => {
		try {
			const res = await fetch(`${BASE_URL}/basket`);
			const data = await res.json();
			setBasket(data);
		} catch (error) {
			console.error(error);
		}
	};

	const getMeals = async () => {
		try {
			const response = await fetch(`${BASE_URL}/meals`);
			const data = await response.json();
			setMeasl(data);
		} catch (error) {
			console.error(error);
		}
	};

	const addToBasket = async (item) => {
		console.log(item);
		try {
			await fetch(`${BASE_URL}/basket`, {
				method: "POST",
				body: JSON.stringify(item),
				headers: {
					"Content-Type": "application/json",
				},
			});
			getBasket();
		} catch (error) {
			console.error(error);
		}
	};

  const increaseBasket = async (item,) => {
    try {
      await fetch(`${BASE_URL}/basket/${item.id}`,{
        method: "PATCH",
        body: JSON.stringify({
          ...item,
          amount: item.updatedAmount,
        }),
        headers: {
          "Content-Type" : "application/json",
        }
      })
      getBasket()
    } catch (error) {
      console.error(error);
    }
  }

  const deleteBasket = async (id) => {
    try {
      await fetch(`${BASE_URL}/basket/${id}`,{
        method: "DELETE"
      })
    } catch (error) {
      console.error(error);
    }
  } 

	const value = {
		addToBasket,
		meals,
		getMeals,
		basket,
		getBasket,
    increaseBasket,
    deleteBasket,
	};

	return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
};
