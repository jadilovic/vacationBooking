import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/welcome.css';

const Welcome = () => {
	return (
		<>
			<div className="header">
				<span className="font-link">
					Lorem<b>Ipsum</b>
				</span>
			</div>
			<div className="description">
				<span className="font-link">
					Lorem Ipsum is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy text ever
					since the 1500s, when an unknown printer took a galley of type and
					scrambled it to make a type specimen book. It has survived not only
					five centuries, but also the leap into electronic typesetting,
					remaining essentially unchanged.
					<p>
						It was popularised in the 1960s with the release of Letraset sheets
						containing Lorem Ipsum passages, and more recently with desktop
						publishing software like Aldus PageMaker including versions of Lorem
						Ipsum.
					</p>
				</span>
			</div>
			<Link style={{ textDecoration: 'none' }} to="/accommodation">
				<div className="footer">
					<p className="font-link">Start Quiz</p>
				</div>
			</Link>
		</>
	);
};

export default Welcome;
