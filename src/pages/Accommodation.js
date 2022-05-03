import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/accommodation.css';
import accomm from '../svg/accommodations.svg';
import accommodations from '../data/accommodations';

const Accommodation = () => {
	const [data, setData] = useState([]);
	const prevIndex = useRef(-1);

	useEffect(() => {
		setData(accommodations);
		return () => {
			console.log('unmounted');
		};
	}, []);

	const handleSelection = (e) => {
		e.preventDefault();
		const index = e.target.id;
		if (index === prevIndex.current) {
			return;
		} else {
			prevIndex.current = index;
			data.forEach((item) => (item.selected = false));
			data[index] = { ...data[index], selected: true };
			setData([...data]);
		}
	};

	console.log(data);

	return (
		<>
			<div className="header">
				<span className="font-ubuntu">
					<img className="svgIcon" alt="building" src={accomm} />
					<b>Accommodation</b>
				</span>
			</div>
			{data.map((accomm, index) => {
				return (
					<div
						onClick={handleSelection}
						id={index}
						key={accomm.name}
						className={`card ${
							accomm.selected ? accomm.photo + 'Dark' : accomm.photo
						}`}
					>
						{accomm.selected && <div className="check"></div>}
						<div className="infoButton">
							<span style={{ float: 'left' }} className="font-nunito">
								{accomm.name}
							</span>
							<span style={{ float: 'right' }} className="font-nunito">
								{`$${accomm.cost}`}
							</span>
						</div>
					</div>
				);
			})}

			<div className="footer">
				<Link to="/">
					<p className="font-ubuntu">
						Select accommodation{' '}
						<span style={{ float: 'right', paddingRight: 40 }}>1 / 3</span>
					</p>
				</Link>
			</div>
			<Link to="/question2">Question 2</Link>
		</>
	);
};

export default Accommodation;
