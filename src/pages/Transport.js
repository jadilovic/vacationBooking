import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/transport.css';
import transportSvg from '../svg/transport.svg';
import transports from '../data/transports';
import Card from '../components/Card';

const Transport = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [selectedTransport, setselectedTransport] = useState(false);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		const prevSelected = JSON.parse(localStorage.getItem('transport'));
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
			transports.forEach((item) => {
				if (item.name === prevSelected.name) {
					item.selected = true;
				}
			});
		} else {
			transports.forEach((item) => (item.selected = false));
		}
		setData(transports);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const selected = data.some((item) => item.selected === true);
		setselectedTransport(selected);
	}, [data]);

	return (
		<div
			className="container"
			style={{
				background: '#F9ECF2',
			}}
		>
			<div className="header">
				<img className="svgTransport" alt="building" src={transportSvg} />
				<span style={{ fontWeight: 'bold', padding: 10 }} className="font-link">
					Transport
				</span>
			</div>
			<Card
				data={data}
				setData={setData}
				selection="transport"
				selectionColor="#D73780"
			/>
			<Link
				className={`${selectedTransport ? '' : 'disabled-link'}`}
				style={{ textDecoration: 'none' }}
				to={`${edit ? '/summary' : '/food'}`}
			>
				<div
					className={`footer footer-transport-color${
						selectedTransport ? '' : '-dark'
					}`}
				>
					<p className="font-link">
						{`${edit ? 'Edit transport' : 'Select transport'}`}
						{!edit && (
							<span style={{ float: 'right', paddingRight: 40 }}>2 / 3</span>
						)}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Transport;
