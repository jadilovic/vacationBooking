import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/food.css';
import foodSvg from '../svg/food.svg';
import Card from '../components/Card';
import foods from '../data/foods';

const Food = () => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);
	const [selectedFood, setSelectedFood] = useState(false);
	const [edit, setEdit] = useState(false);

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
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		const selected = data.some((item) => item.selected === true);
		setSelectedFood(selected);
	}, [data]);

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
			<Card
				data={data}
				setData={setData}
				selection="food"
				selectionColor="#61AB04"
			/>
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
