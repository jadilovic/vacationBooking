import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
	return (
		<>
			<div>Welcome</div>
			<Link to="/question1">Question 1</Link>
		</>
	);
};

export default Welcome;
