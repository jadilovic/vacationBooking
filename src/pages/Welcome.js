import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/welcome.css';

const Welcome = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const completed = localStorage.getItem('completed');
		if (completed === 'completed') {
			navigate('/summary');
		} else {
			localStorage.removeItem('accommodation');
			localStorage.removeItem('transport');
			localStorage.removeItem('food');
		}
	}, []);

	return (
		<div
			className="container"
			style={{
				background: '#FFFFFF',
			}}
		>
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
				<div className="footer  col-12 col-s-12">
					<p className="font-link">Start Quiz</p>
				</div>
			</Link>
		</div>
	);
};

export default Welcome;
