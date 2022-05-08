import React, { useRef } from 'react';
import checkSvg from '../svg/check.svg';

const Card = ({ data, setData, selection, selectionColor }) => {
	const prevIndex = useRef(-1);

	const handleSelection = (e) => {
		e.preventDefault();
		const index = e.target.id;
		if (index === prevIndex.current) {
			data.forEach((item) => (item.selected = false));
			localStorage.removeItem(selection);
			prevIndex.current = -1;
			setData([...data]);
		} else {
			prevIndex.current = index;
			data.forEach((item) => (item.selected = false));
			data[index] = { ...data[index], selected: true };
			localStorage.setItem(selection, JSON.stringify(data[index]));
			setData([...data]);
		}
	};

	return (
		<div className="row" style={{ marginTop: 70 }}>
			{data.map((item, index) => {
				return (
					<div
						onClick={handleSelection}
						id={index}
						key={item.name}
						className={`card col-4 col-s-6 ${
							item.selected ? item.photo + 'Dark' : item.photo
						}`}
					>
						{item.selected && (
							<div style={{ background: selectionColor }} className="circle">
								<div className="check">
									<img alt="check" src={checkSvg} />
								</div>
							</div>
						)}
						<div id={index} className="infoButton">
							<span
								style={{
									float: 'left',
									color: `${item.selected ? selectionColor : ''}`,
								}}
								className="font-nunito"
							>
								{item.name}
							</span>
							<span
								style={{
									float: 'right',
									color: `${item.selected ? selectionColor : ''}`,
								}}
								className="font-nunito"
							>
								{`$${item.cost}`}
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Card;
