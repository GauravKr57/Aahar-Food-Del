import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);     //Fetched from context api under context/storeContext.jsx

  return (
    <div className="food-display" id="food-display">
      <h2>
        Top Dishes in <span id="names">Aahar</span>
      </h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if(category === "All" || category === item.category){              //For filtering
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
