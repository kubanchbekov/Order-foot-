import { useContext, useEffect, useState } from "react";
import Basket from "./components/basket/Basket";
import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import Summary from "./components/summary/Summary";
import styled from "styled-components";
import { MealContext } from "./MealContext/MealContext";
function App() {
	const [isVisible, setIsVisible] = useState(false);
	const { getMeals, meals,getBasket, basket } = useContext(MealContext);
  

  useEffect(()=>{
    getBasket()
  },[])

	const toggleVisibleBasket = () => {
		setIsVisible((prev) => !prev);
	};

	useEffect(() => {
		getMeals();
	}, []);

	return (
		<>
			<Header openModal={toggleVisibleBasket} basket={basket} />
			<Content>
				<Summary />
				<Meals meals={meals} />
			</Content>

			{isVisible && <Basket onClose={toggleVisibleBasket} basket={basket}/>}
		</>
	);
}

export default App;

const Content = styled.div`
	margin-top: 101px;
`;
