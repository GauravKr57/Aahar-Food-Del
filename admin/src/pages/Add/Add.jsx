import React, { useState } from "react";
import axios from "axios";
import "./Add.css";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Add = ({url}) => {
  // Creating state variable for storing image
  const [image, setImage] = useState(false);

  // Creating state variable for storing product details in data variable
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  function handleChange(event){                                                                         //With help of this function we store new data entered on input tags
        const name = event.target.name;
        const value = event.target.value;

        setData((prev) => ({...prev, [name]:value}));
  }


  // handle submission of form and sending in to backend in new form

  const onSubmitHandler = async (event) => {
        event.preventDefault();                                                                      // to prevent reload of page on submission

        const formData = new FormData();                                                             // passing all the data as a form to backend therefore creating a new form

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));                                                // Since we have defined price as Number in our backend
        formData.append("category", data.category);
        formData.append("image", image);

        //api call

        const response = await axios.post(`${url}/api/food/add` , formData)                          // Endpoint where we will upload the form data so that it post to our server and new entry made on database

        if(response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad",
            })
            setImage(false);
            toast.success(response.data.message);                                                     // Add success notification 
        }
        else {
            console.log("Error");
            toast.error(response.data.message);
        }

  }




  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area} // If we have image available then display that image by creating URL of that image object
              alt="Upload image"
            />
          </label>
          <input
            onChange={(evnt) => setImage(evnt.target.files[0])} //This generates popup for selecting file and help to select the image file from the popped window
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={handleChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type Here"
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={handleChange}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write the content here"
            required
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Select Product Category</p>
            <select
              onChange={handleChange}
              value={data.category}
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Pizza">Pizza</option>
              <option value="Biryani">Biryani</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={handleChange}
              value={data.price}
              type="Number"
              name="price"
              placeholder="₹ 100"
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD{" "}
        </button>
      </form>
    </div>
  );
};

export default Add;
