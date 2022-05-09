import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/summary.css';
import caret from '../svg/caret.svg';
import accommSvg from '../svg/accommodations.svg';
import transportSvg from '../svg/transport.svg';
import foodSvg from '../svg/food.svg';

const Summary = () => {
	const [summary, setSummary] = useState([]);
	const [pieChart, setPieChart] = useState([]);
	const [totalCost, setTotalCost] = useState(0);
	const navigate = useNavigate();
	const services = ['Accommodation', 'Transport', 'Food'];
	const logos = [accommSvg, transportSvg, foodSvg];

	const createPieChart = () => {
		const total = summary.reduce((acc, cur) => {
			return (acc += cur.cost);
		}, 0);
		for (let index = 0; index < 3; index++) {
			pieChart.push({
				service: services[index],
				percentage: Number((summary[index].cost / total).toFixed(2)),
			});
		}
		setTotalCost(total);
		setPieChart([...pieChart]);
	};

	const createSummary = () => {
		const accommodation = JSON.parse(localStorage.getItem('accommodation'));
		summary.push({
			...accommodation,
			logo: logos[0],
			service: services[0],
		});
		const transport = JSON.parse(localStorage.getItem('transport'));
		summary.push({ ...transport, logo: logos[1], service: services[1] });
		const food = JSON.parse(localStorage.getItem('food'));
		summary.push({ ...food, logo: logos[2], service: services[2] });
		if (!accommodation?.name || !transport?.name || !food?.name) {
			navigate('/');
			localStorage.removeItem('completed');
		} else {
			localStorage.setItem('completed', 'completed');
		}
		setSummary([...summary]);
		createPieChart();
	};

	useEffect(() => {
		localStorage.removeItem('edit');
		createSummary();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleClearStartOver = (e) => {
		e.preventDefault();
		localStorage.removeItem('accommodation');
		localStorage.removeItem('transport');
		localStorage.removeItem('food');
		navigate('/');
	};

	return (
		<div
			className="row container"
			style={{
				background: '#FED6D6',
				position: 'relative',
			}}
		>
			<div className="header-summary">
				<span
					style={{ fontWeight: 'bold', display: 'inline' }}
					className="font-nunito"
				>
					{`$${totalCost.toLocaleString('en-US')}`}
				</span>
			</div>
			<div className="header-label col-12 col-s-12">
				<span
					style={{ fontWeight: 'bold', display: 'inline', fontSize: '16px' }}
					className="font-nunito"
				>
					{`${
						totalCost > 1500
							? 'Big spender'
							: totalCost > 1100
							? 'Normal'
							: 'Thrifty'
					}`}
				</span>
			</div>
			<div className="card-pie-chart col-6 col-s-6">
				<div id="pie-chart-container">
					<div
						style={{
							background: `conic-gradient(#5181FC ${
								pieChart[0]?.percentage * 360
							}deg, #D73780 ${pieChart[0]?.percentage * 360}deg ${
								pieChart[0]?.percentage * 360 + pieChart[1]?.percentage * 360
							}deg, #61AB04 ${pieChart[2]?.percentage * 360}deg)`,
						}}
						id="pie-chart"
					></div>

					<div id="legenda">
						<div className="info">
							<div id="color-accommodation" className="box-color"></div>
							<div className="info-text">{`${Math.floor(
								pieChart[0]?.percentage * 100
							)}% accommodation`}</div>
						</div>
						<div className="info">
							<div id="color-transport" className="box-color"></div>
							<div className="info-text">{`${Math.floor(
								pieChart[1]?.percentage * 100
							)}% transport`}</div>
						</div>
						<div className="info">
							<div id="color-food" className="box-color"></div>
							<div className="info-text">{`${Math.floor(
								pieChart[2]?.percentage * 100
							)}% food`}</div>
						</div>
					</div>
				</div>
			</div>
			<div className="selection-list col-6 col-s-6">
				{summary.map((item, index) => {
					return (
						<div key={item.service}>
							<details>
								<summary>
									<img
										style={{ marginRight: '12px' }}
										alt="logo"
										height={22}
										src={logos[index]}
									/>
									{item.service}
									<img alt="move" height={15} src={caret} className="icon" />
								</summary>
								<div style={{ height: 54 }}>
									<span
										style={{
											paddingTop: 20,
											float: 'left',
											fontSize: '24px',
										}}
									>
										${item.cost}
									</span>
									<span
										style={{
											paddingTop: 20,
											float: 'right',
											cursor: 'pointer',
											fontSize: '24px',
										}}
										onClick={() => {
											localStorage.removeItem('completed');
											localStorage.setItem('edit', 'edit');
											navigate(`/${item.service}`);
										}}
									>
										Change?
									</span>
								</div>
							</details>
							<hr></hr>
						</div>
					);
				})}
			</div>
			<Link style={{ textDecoration: 'none' }} to="/">
				<div
					onClick={handleClearStartOver}
					className={`footer col-12 col-s-12`}
				>
					<p className="font-link">Clear Selection / Start Over</p>
				</div>
			</Link>
		</div>
	);
};

export default Summary;
