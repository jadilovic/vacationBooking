import { Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Question1 from './pages/Question1';
import Question2 from './pages/Question2';
import Question3 from './pages/Question3';
import Summary from './pages/Summary';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="question1" element={<Question1 />} />
			<Route path="question2" element={<Question2 />} />
			<Route path="question3" element={<Question3 />} />
			<Route path="summary" element={<Summary />} />
		</Routes>
	);
}

export default App;
