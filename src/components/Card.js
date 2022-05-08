import React from 'react';

const Card = ({ data, handleSelection, selectionColor, checkSvg }) => {
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
