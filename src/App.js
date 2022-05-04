import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Accommodation from './pages/Accommodation';
import Question3 from './pages/Question3';
import Summary from './pages/Summary';
import Transport from './pages/Transport';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/accommodation" element={<Accommodation />} />
			<Route path="/transport" element={<Transport />} />
			<Route path="/question3" element={<Question3 />} />
			<Route path="/summary" element={<Summary />} />
		</Routes>
	);
}

export default App;
