import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/transport.css';
import transportSvg from '../svg/transport.svg';
import checkSvg from '../svg/check.svg';
import transports from '../data/transports';

const Transport = () => {
	const [data, setData] = useState([]);
	const [selectedTransport, setselectedTransport] = useState(false);
	const prevIndex = useRef(-1);

	useEffect(() => {
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
			style={{
				background: '#F9ECF2',
				borderRadius: '20px',
			}}
		>
			<div className="header">
				<img className="svgTransport" alt="building" src={transportSvg} />
				<span style={{ fontWeight: 'bold', padding: 10 }} className="font-link">
					Transport
				</span>
			</div>
			<div style={{ marginTop: 55 }}>
				{data.map((transport, index) => {
					return (
						<div
							onClick={handleSelection}
							id={index}
							key={transport.name}
							className={`card ${
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
				to="/food"
			>
				<div
					className={`footer footer-transport-color${
						selectedTransport ? '' : '-dark'
					}`}
				>
					<p className="font-link">
						Select transport
						<span style={{ float: 'right', paddingRight: 40 }}>2 / 3</span>
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Transport;
