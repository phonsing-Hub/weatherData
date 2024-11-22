import React, { useState } from "react";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { MdOutlineLocationCity } from "react-icons/md";

const API = import.meta.env.VITE_HOST_API

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Thailand");
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true)

  const apiKey = "f23b2cab2257ace63600d1793029e0ad"; // แทนที่ด้วย API Key ของคุณ
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
      setError(null); // ล้างข้อผิดพลาดถ้ามี
      setIsDisabled(false)
    } catch (err) {
      setWeatherData(null);
      setError("Unable to fetch weather data. Please check the city name.");
    }
  };

  const addData = async () => {
    try {
  
      await axios.post(`${API}/weatherData`, weatherData);
      console.log("Data added successfully");
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  return (
    <div className=" container max-w-xl gap-2 mx-auto flex flex-col justify-center h-screen ">
      <div className="border shadow-md rounded-lg p-10">
        <h1 className=" text-center text-2xl">Weather App</h1>
        <br />
        <div className="flex flex-col gap-2">
          <Input placeholder="Enter city default Thailand" onValueChange={setCity} />
          <Button
            color="success"
            endContent={<TiWeatherPartlySunny />}
            onPress={fetchWeather}
          >
            Get Weather
          </Button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {weatherData && (
          <div className="flex mt-4 justify-between items-center">
            <Button variant="flat" className="text-xl font-bold" startContent={<MdOutlineLocationCity/>}>Country: {weatherData.name}</Button>
            <div className="flex gap-2">
              <Button variant="flat" className="font-bold" color="danger" endContent={<FaTemperatureThreeQuarters/>}>
                {weatherData.main.temp} °C
              </Button>
              <Button
                variant="flat"
                className="font-bold"
                color="primary"
                endContent={<WiHumidity size={26} />}
              >
                {weatherData.main.humidity} %
              </Button>
            </div>
          </div>
        )}
      </div>
      <Button color="primary" onPress={addData} isDisabled={isDisabled}>Add To Database</Button>
    </div>
  );
}

export default App;
