import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/accommodation.css';
import accomm from '../svg/accommodations.svg';
import checkSvg from '../svg/check.svg';
import accommodations from '../data/accommodations';

const Accommodation = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [selectedAccommodation, setSelectedAccommodation] = useState(false);
	const [edit, setEdit] = useState(false);
	const prevIndex = useRef(-1);

	useEffect(() => {
		const prevSelected = JSON.parse(localStorage.getItem('accommodation'));
		const change = localStorage.getItem('edit');
		const completed = localStorage.getItem('completed');
		if (completed === 'completed') {
			navigate('/summary');
		}
		if (change === 'edit') {
			setEdit(true);
		} else {
			setEdit(false);
		}
		if (prevSelected?.name) {
			accommodations.forEach((item) => {
				if (item.name === prevSelected.name) {
					item.selected = true;
				}
			});
		} else {
			accommodations.forEach((item) => (item.selected = false));
		}
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
		<div
			className="container"
			style={{
				background: '#ecf0f9',
			}}
		>
			<div className="header">
				<span className="font-link">
					<img className="svgIcon" alt="building" src={accomm} />
					<b>Accommodation</b>
				</span>
			</div>
			<div className="row" style={{ marginTop: 70 }}>
				{data.map((accomm, index) => {
					return (
						<div
							onClick={handleSelection}
							id={index}
							key={accomm.name}
							className={`card col-4 col-s-6 ${
								accomm.selected ? accomm.photo + 'Dark' : accomm.photo
							}`}
						>
							{accomm.selected && (
								<div style={{ background: '#5181fc' }} className="circle">
									<div className="check">
										<img alt="check" src={checkSvg} />
									</div>
								</div>
							)}
							<div id={index} className="infoButton">
								<span
									style={{
										float: 'left',
										color: `${accomm.selected ? '#5181FC' : ''}`,
									}}
									className="font-nunito"
								>
									{accomm.name}
								</span>
								<span
									style={{
										float: 'right',
										color: `${accomm.selected ? '#5181FC' : ''}`,
									}}
									className="font-nunito"
								>
									{`$${accomm.cost}`}
								</span>
							</div>
						</div>
					);
				})}
			</div>
			<Link
				className={`${selectedAccommodation ? '' : 'disabled-link'}`}
				style={{ textDecoration: 'none' }}
				to={`${edit ? '/summary' : '/transport'}`}
			>
				<div
					className={`footer footer-accomm-color${
						selectedAccommodation ? '' : '-dark'
					}`}
				>
					<p className="font-link">
						{`${edit ? 'Edit accommodation' : 'Select accommodation'}`}
						{!edit && (
							<span style={{ float: 'right', paddingRight: 40 }}>1 / 3</span>
						)}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Accommodation;
