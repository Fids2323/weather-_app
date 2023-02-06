import {useEffect, useState} from "react";
import "./App.css";
import Forecast from "./components/forecast";
import Inputs from "./components/inputs";
import TemperatureAndDetails from "./components/temperatureAndDetails";
import TimeAndLocation from "./components/timeAndLocation";
import TopButtons from "./components/topButtons";
import getFormattedWeatherData from "./services/weatherService";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [query, setQuery] = useState({q: "moscow"});
	const [units, setUnits] = useState("metric");
	const [weather, setWeather] = useState(null);

	const handleSelect = (obj) => {
		setQuery(obj);
	};

	useEffect(() => {
		const fetchWeather = async () => {
			await getFormattedWeatherData({...query, units}).then((data) => {
				toast.success(`Successfully fetched weather for ${data.name}, ${data.country}`);
				setWeather(data);
			});
		};

		fetchWeather();
	}, [query, units]);

	const formatBackground = () => {
		if (!weather) return "from-cyan-700 to-blue-700";
		const thresold = units === "metric" ? 20 : 60;
		if (weather.temp <= thresold) return "from-cyan-700 to-blue-700";

		return "from-yellow-700 to-orange-700";
	};

	return (
		<div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
			<TopButtons onSelect={handleSelect} />
			<Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

			{weather && (
				<>
					<TimeAndLocation weather={weather} />
					<TemperatureAndDetails weather={weather} />
					<Forecast title="hourly forecast" items={weather.hourly} />
					<Forecast title="daily forecast" items={weather.daily} />
				</>
			)}
			<ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
		</div>
	);
}

export default App;
