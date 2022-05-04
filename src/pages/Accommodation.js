import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/accommodation.css';
import accomm from '../svg/accommodations.svg';
import checkSvg from '../svg/check.svg';
import accommodations from '../data/accommodations';

const Accommodation = () => {
	const [data, setData] = useState([]);
	const [selectedAccommodation, setSelectedAccommodation] = useState(false);
	const prevIndex = useRef(-1);

	useEffect(() => {
		setData(accommodations);
	}, []);

	useEffect(() => {
		const selected = data.some((item) => item.selected === true);
		setSelectedAccommodation(selected);
	}, [data]);

	const handleSelection = (e) => {
		e.preventDefault();
		const index = e.target.id;
		if (index === prevIndex.current) {
			data.forEach((item) => (item.selected = false));
			localStorage.removeItem('accommodation');
			prevIndex.current = -1;
			setData([...data]);
		} else {
			prevIndex.current = index;
			data.forEach((item) => (item.selected = false));
			data[index] = { ...data[index], selected: true };
			localStorage.setItem('accommodation', JSON.stringify(data[index]));
			setData([...data]);
		}
	};

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
						{accomm.selected && (
							<div className="circle">
								<div className="check">
									<img alt="check" src={checkSvg} />
								</div>
							</div>
						)}
						<div id={index} className="infoButton">
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
			<Link
				className={`${selectedAccommodation ? '' : 'disabled-link'}`}
				style={{ textDecoration: 'none' }}
				to="/transport"
			>
				<div
					className={`footer footer-color${
						selectedAccommodation ? '-dark' : ''
					}`}
				>
					<p className="font-ubuntu">
						Select accommodation{' '}
						<span style={{ float: 'right', paddingRight: 40 }}>1 / 3</span>
					</p>
				</div>
			</Link>
		</>
	);
};

export default Accommodation;
