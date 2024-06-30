
// API to acces all the elements that we need to acces from any components in our frontend 

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000";
    const [token,setToken] = useState("");                                                              // Passed to loginPopup.jsx for login/Signup form submission and Navbar.jsx for hiding signIn button after login

    // To get the food items from the database in our frontend + Dont't get logout on reloading the website

    const [food_list,setFoodList] = useState([]);

    const fetchFoodListFromDatabase = async () =>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }

    // runs when website refreshes or reloads

    useEffect(() => {

        async function loadData() {
            await fetchFoodListFromDatabase();
            if(localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));                                                                                  // Cart items are preserved even when site is refreshed (loadCartData function is written below)
            }
        }
        loadData();

    },[])


    // When we are creating state for each item to add in cart inside foodItem.jsx it is creating a new state variable for each 35 items. It is not a good practice. To solve this we will create a cart item object.We will manage the data using manageCart functionality

    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) =>{
        if( !cartItems[itemId] ) {                                                                          // first this if statement will create a new entry for our food product if product ID is not present in our cart item
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }
        else {                                                                                              // If that product is already available in the cart item this else statement will increase the count by 1
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}});                               // Update user model in the database for cartData of user if he adds an item to cart
        }
        toast.success("Item Added to Cart")
    }

    const removeFromCart = async (itemId) =>{
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
        if(token)
        {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
        }
        toast.success("Item removed from Cart")
    }

    // Function to show cart data even when page is reloaded : Therefore pass below function to useState hook above

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }


    //  Function to evaluate total cost of items present in the cart which is present inside cartItem object

    const getTotalCartAmount = ()=>{
        let totalAmount = 0;

        for(const item in cartItems)
        {
            if(cartItems[item] > 0)
            {
                let itemInfo = food_list.find((product) => (product._id === item))

                totalAmount += itemInfo.price * cartItems[item];
            }
        }

        return totalAmount;
    }
    

    const contextValue = {       

            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalCartAmount,
            url,
            token,
            setToken
    }
                                                                        //Elements that will be mentioned under contextValue object could be accesed in any component we want to
    return (
        <StoreContext.Provider value={contextValue}>    
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider