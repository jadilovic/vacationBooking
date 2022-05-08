import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Accommodation from './pages/Accommodation';
import Transport from './pages/Transport';
import Food from './pages/Food';
import Summary from './pages/Summary';
import '../src/styles/app.css';
import './styles/css/style.css';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/accommodation" element={<Accommodation />} />
			<Route path="/transport" element={<Transport />} />
			<Route path="/food" element={<Food />} />
			<Route path="/summary" element={<Summary />} />
		</Routes>
	);
}

export default App;
