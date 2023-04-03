import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/accommodation.css';
import accomm from '../svg/accommodations.svg';
import accommodations from '../data/accommodations';
import Card from '../components/Card';

const Accommodation = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [selectedAccommodation, setSelectedAccommodation] = useState(false);
	const [edit, setEdit] = useState(false);

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
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const selected = data.some((item) => item.selected === true);
		setSelectedAccommodation(selected);
	}, [data]);

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
			<Card
				data={data}
				setData={setData}
				selection="accommodation"
				selectionColor="#5181FC"
			/>
			<Link
				className={`${selectedAccommodation ? '' : 'disabled-link'}`}
				style={{
					textDecoration: 'none',
				}}
				to={`${!selectedAccommodation ? '' : edit ? '/summary' : '/transport'}`}
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
