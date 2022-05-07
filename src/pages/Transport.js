import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/transport.css';
import transportSvg from '../svg/transport.svg';
import checkSvg from '../svg/check.svg';
import transports from '../data/transports';

const Transport = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [selectedTransport, setselectedTransport] = useState(false);
	const [edit, setEdit] = useState(false);
	const prevIndex = useRef(-1);

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
	}, []);

	useEffect(() => {
		const selected = data.some((item) => item.selected === true);
		setselectedTransport(selected);
	}, [data]);

	const handleSelection = (e) => {
		e.preventDefault();
		const index = e.target.id;
		if (index === prevIndex.current) {
			data.forEach((item) => (item.selected = false));
			localStorage.removeItem('transport');
			prevIndex.current = -1;
			setData([...data]);
		} else {
			prevIndex.current = index;
			data.forEach((item) => (item.selected = false));
			data[index] = { ...data[index], selected: true };
			localStorage.setItem('transport', JSON.stringify(data[index]));
			setData([...data]);
		}
	};

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
			<div className="row" style={{ marginTop: 55 }}>
				{data.map((transport, index) => {
					return (
						<div
							onClick={handleSelection}
							id={index}
							key={transport.name}
							className={`card col-4 col-s-6 ${
								transport.selected ? transport.photo + 'Dark' : transport.photo
							}`}
						>
							{transport.selected && (
								<div style={{ background: '#D73780' }} className="circle">
									<div className="check">
										<img alt="check" src={checkSvg} />
									</div>
								</div>
							)}
							<div id={index} className="infoButton">
								<span
									style={{
										float: 'left',
										color: `${transport.selected ? '#D73780' : ''}`,
									}}
									className="font-nunito"
								>
									{transport.name}
								</span>
								<span
									style={{
										float: 'right',
										color: `${transport.selected ? '#D73780' : ''}`,
									}}
									className="font-nunito"
								>
									{`$${transport.cost}`}
								</span>
							</div>
						</div>
					);
				})}
			</div>
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
