import React, { useState } from "react";
import { ChefHat } from 'lucide-react';
const foodMenu = {
  Monday: {
    tiffin: { name: "Puri", image: "https://media.istockphoto.com/id/1705124930/photo/food-photos-various-entrees-appetizers-deserts-etc.jpg?b=1&s=612x612&w=0&k=20&c=dfRZpi2UswzaoGlYlzQVDBnDckyU6zgBjdZxauXlDno=" },
    lunch: { name: "Brinjal Masala & Sambar", image: "https://media.istockphoto.com/id/664955118/photo/homemade-eggplat-or-brinjal-curry.jpg?b=1&s=612x612&w=0&k=20&c=EjIEyf8T16OXnIemBZ3pdmDq67_VnDmHwC01LGFgk7w=" },
    dinner: { name: "Chapati & Mixed Veg Curry", image: "https://media.istockphoto.com/id/1152662441/photo/baingan-masala-eggplant-brinjal-curry-served-with-chapati-and-rice-selective-focus.jpg?s=612x612&w=0&k=20&c=0R9YE9Q5NnI3X4FYEQQkyG4_GWUHFnKGVWVetGFMEO4=" }
  },
  Tuesday: {
    tiffin: { name: "Idli & Chutney", image: "https://media.istockphoto.com/id/638506124/photo/idli-with-coconut-chutney-and-sambhar.jpg?b=1&s=612x612&w=0&k=20&c=vClQXU7KpcFlw-bS1i_fRAg5gX490n9j-nTQG8DUBDc=" },
    lunch: { name: "Dal Tadka & Rice", image: "https://media.istockphoto.com/id/1326814967/photo/indian-popular-food-dal-fry-or-traditional-dal-tadka-curry.jpg?s=612x612&w=0&k=20&c=s_qcd0pilxt14JmmJzfgkCYkfPKw3be1C2S9uAi7wQM=" },
    dinner: { name: "Egg Masala", image: "https://media.istockphoto.com/id/1292581998/photo/anda-masala-or-egg-curry-is-popular-indian-spicy-food-served-in-a-ceramic-bowl-over-rustic.jpg?s=612x612&w=0&k=20&c=jNP9uM-xePrID3TuK9923vWQl7IFc8kSihReU275930=" }
  },
  Wednesday: {
    tiffin: { name: "Upma & Chutney", image: "https://media.istockphoto.com/id/1488737992/photo/upma-recipe-suji-ka-upma-rava-upma-with-red-and-coconut-chutney.jpg?s=612x612&w=0&k=20&c=dGTIRLT4c7XdC8xAqkumyuURqMAy3HNQccNjEQT3wmU=" },
    lunch: { name: "Rajma & Rice", image: "https://media.istockphoto.com/id/669635320/photo/kidney-bean-curry-or-rajma-or-rajmah-chawal-and-roti-typical-north-indian-main-course.jpg?s=612x612&w=0&k=20&c=3ir3vZKHa2oPXkpEKHLbWPAPF1yhxRCyr4DIew41pzg=" },
    dinner: { name: "Paratha & Paneer Butter Masala", image: "https://media.istockphoto.com/id/816405116/photo/shahi-paneer-with-kerala-paratha.jpg?s=612x612&w=0&k=20&c=Ty844jir8g2i7DIWafaAx7JrGLtNHVew60sFCu3Jf50=" }
  },
  Thursday: {
    tiffin: { name: "Poha", image: "https://media.istockphoto.com/id/1093261264/photo/aloo-kanda-poha-or-tarri-pohe-with-spicy-chana-masala-curry-selective-focus.jpg?s=612x612&w=0&k=20&c=Oq1UT3a5sDqj2GMLHTUkdjOai3zcfYWxaSx6J4u_LB8=" },
    lunch: { name: "Veg Biryani & Raita", image: "https://media.istockphoto.com/id/1292443973/photo/traditional-hyderabadi-vegetable-veg-dum-biryani-with-mixed-veggies-served-with-mixed-raita.jpg?s=612x612&w=0&k=20&c=QJxPi1I6JbdZP9VF-IpgwFUTW2KP_q7X7IpPepnZZE4=" },
    dinner: { name: "Dal Dhokli", image: "https://media.istockphoto.com/id/1191003093/photo/vegetable-masala-oats-khichadi-served-in-a-bowl-selective-focus.jpg?s=612x612&w=0&k=20&c=Ra4p1_ItjZn9cfO3gbv8v022dQ0k3sjSc98rrLk4dT8=" }
  },
  Friday: {
    tiffin: { name: "Masala Rice", image: "https://media.istockphoto.com/id/1039691852/photo/vegetable-fried-rice.jpg?s=612x612&w=0&k=20&c=ylOZDjkctSmrZIWP24DQkMf_XKpg2xFPA4KOolk3B_U=" },
    lunch: { name: "Aloo Gobi & Roti", image: "https://media.istockphoto.com/id/1288889906/photo/indian-roti-aloo-gobi-sabzi-and-raita-stock-image.jpg?s=612x612&w=0&k=20&c=XoHCkDzlG-wz3F5ErhhvxYcnDyIqxpk8PKNy5SoT0so=" },
    dinner: { name: "Khichdi & Pickle", image: "https://media.istockphoto.com/id/1255780683/photo/dal-khichadi-and-kadhi-with-papad-and-raw-mango-pickle.jpg?s=612x612&w=0&k=20&c=4yu4NPQ1TmueOP7Da1szZdnDUd0UIwk7KU978jU-0-Q=" }
  },
  Saturday: {
    tiffin: { name: "Masala Dosa", image: "https://media.istockphoto.com/id/909906350/photo/masala-dosa-south-indian-food.jpg?s=612x612&w=0&k=20&c=3CI-bw2NhYaX_t0-CZIXIIXsOygFcUaoGSmzbnVB-fU=" },
    lunch: { name: "Chana Masala & Rice", image: "https://media.istockphoto.com/id/1205482227/photo/indian-traditional-dal-fry-and-jeera-rice-also-known-as-dal-chawal-cooked-lentils-served-with.jpg?s=612x612&w=0&k=20&c=KvLnJyAnfUdyBtA4I7HEMLvqG78PwyF-UZcVghD8uBU=" },
    dinner: { name: "Egg Bhurji & Roti", image: "https://media.istockphoto.com/id/1292582952/photo/assorted-indian-food-egg-gravy-chapati-and-boiled-rice-on-wooden-background-dishes-and.jpg?s=612x612&w=0&k=20&c=_LXTcb0e37JRNRl7rmfRF7d6pX-qoCWJhYVWLTMSlWI=" }
  },
  Sunday: {
    tiffin: { name: "Uthappa", image: "https://media.istockphoto.com/id/666845498/photo/south-indian-food-uttapam-or-ooththappam-or-uthappa.jpg?s=612x612&w=0&k=20&c=_IaTCSSSKEwJLyAhqIFzOCLRQntNGSIF84ORMMu4kD8=" },
    lunch: { name: "Veg Pulao & Raita", image: "https://media.istockphoto.com/id/1496057459/photo/veg-briyani-with-salad-chutney-raita-and-sauce-served-in-dish-isolated-on-banana-leaf-top.jpg?s=612x612&w=0&k=20&c=BqVW-pKg16WUvLbyiIW9QVokhfIiGy5o8nJgnZ-ZLyM=" },
    dinner: { name: "Chicken curry & Bagara rice", image: "https://media.istockphoto.com/id/1280147779/photo/chicken-curry-iftari.jpg?s=612x612&w=0&k=20&c=THJNS9HlSd41bMK07p8fltRYbt_ez8Tdu7YHEm2xtZs=" }
  }
};

function FoodMenu() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <div className="container bg-gray-900 text-white p-3 border rounded-xl">
      <h1 className="text-3xl font-semibold text-white flex items-center gap-2 rounded p-1 mx-auto pt-2 pb-2 mb-4" 
                  style={{ marginLeft: "10px", background: "linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234), rgb(236, 72, 153))", color:"white", width:"300px", textAlign:"center", margin:"auto", paddingLeft:"30px", paddingRight:"-2px" }}>
                <ChefHat className="w-7 h-7 text-blue-400 animate-bounce" />
                Food Menu
      </h1>
      <div className="max-w-6xl mx-auto m-12 ">
      
      {/* Dropdown to select the day */}
      <div className="dropdown-container">
        <label className="">Select Day:</label>
        <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
          {Object.keys(foodMenu).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>

      {/* Food Sections */}
      <div className="menu-container ">
        {["tiffin", "lunch", "dinner"].map((meal) => (
          <div key={meal} className="meal-section bg-gray-500">
            <h2 className="text-white">{meal.charAt(0).toUpperCase() + meal.slice(1)}</h2>
            <img src={foodMenu[selectedDay][meal].image} alt={foodMenu[selectedDay][meal].name} />
            <p className="text-white">{foodMenu[selectedDay][meal].name}</p>
          </div>
        ))}
        </div>
      </div>

      {/* Styles */}
      <style>
        {`
          .container {
            width: 80%;
            margin: 230px auto;
            text-align: center;
            font-family: Arial, sans-serif;
          }
          .dropdown-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            gap: 10px;
          }
          select {
            padding: 8px;
            font-size: 16px;
            border-radius: 5px;
            border: 1px solid #ccc;
            cursor: pointer;
          }
          .menu-container {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
          }
          .meal-section {
            text-align: center;
            width: 30%;
            
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .meal-section:hover {
            transform: scale(1.05);
          }
          .meal-section img {
            width: 200px;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            margin-top: 10px;
          }
          h2 {
            font-size: 20px;
            margin-bottom: 10px;
          }
          p {
            font-size: 16px;
            font-weight: bold;
          }
        `}
      </style>

    </div>
  );
}

export default FoodMenu;