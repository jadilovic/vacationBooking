import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/food.css';
import foodSvg from '../svg/food.svg';
import checkSvg from '../svg/check.svg';
import foods from '../data/foods';

const Food = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [selectedFood, setSelectedFood] = useState(false);
	const [edit, setEdit] = useState(false);
	const prevIndex = useRef(-1);

	useEffect(() => {
		const prevSelected = JSON.parse(localStorage.getItem('food'));
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
			foods.forEach((item) => {
				if (item.name === prevSelected.name) {
					item.selected = true;
				}
			});
		} else {
			foods.forEach((item) => (item.selected = false));
		}
		setData(foods);
	}, []);

	useEffect(() => {
		const selected = data.some((item) => item.selected === true);
		setSelectedFood(selected);
	}, [data]);

	const handleSelection = (e) => {
		e.preventDefault();
		const index = e.target.id;
		if (index === prevIndex.current) {
			data.forEach((item) => (item.selected = false));
			localStorage.removeItem('food');
			prevIndex.current = -1;
			setData([...data]);
		} else {
			prevIndex.current = index;
			data.forEach((item) => (item.selected = false));
			data[index] = { ...data[index], selected: true };
			localStorage.setItem('food', JSON.stringify(data[index]));
			setData([...data]);
		}
	};

	return (
		<div
			className="container"
			style={{
				background: '#E1ECD3',
			}}
		>
			<div className="header">
				<img className="svgFood" alt="building" src={foodSvg} />
				<span
					style={{ fontWeight: 'bold', display: 'inline' }}
					className="font-nunito"
				>
					Food
				</span>
			</div>
			<div className="row" style={{ marginTop: 55 }}>
				{data.map((food, index) => {
					return (
						<div
							onClick={handleSelection}
							id={index}
							key={food.name}
							className={`card col-4 col-s-6 ${
								food.selected ? food.photo + 'Dark' : food.photo
							}`}
						>
							{food.selected && (
								<div style={{ background: '#61AB04' }} className="circle">
									<div className="check">
										<img alt="check" src={checkSvg} />
									</div>
								</div>
							)}
							<div id={index} className="infoButton">
								<span
									style={{
										float: 'left',
										color: `${food.selected ? '#61AB04' : ''}`,
									}}
									className="font-nunito"
								>
									{food.name}
								</span>
								<span
									style={{
										float: 'right',
										color: `${food.selected ? '#61AB04' : ''}`,
									}}
									className="font-nunito"
								>
									{`$${food.cost}`}
								</span>
							</div>
						</div>
					);
				})}
			</div>
			<Link
				className={`${selectedFood ? '' : 'disabled-link'}`}
				style={{ textDecoration: 'none' }}
				to="/summary"
			>
				<div
					className={`footer footer-food-color${selectedFood ? '' : '-dark'}`}
				>
					<p className="font-link">
						{`${edit ? 'Edit food' : 'Select food'}`}
						{!edit && (
							<span style={{ float: 'right', paddingRight: 40 }}>1 / 3</span>
						)}
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Food;
