'use strict';

import React from 'react';

export default (props)=>{
	return(
		<div className={props.ranked ? "rankingblock ranked" : "rankingblock"}>
			
			<form
				onChange= { props.ranked ? '' : (event)=>{props.actions.updateRanking(event)} }
				onSubmit= { props.ranked ? '' : (event) => {props.actions.submitRanking(props.rank,props.itemid,event)} }
			>
				{ !props.ranked && 
					<button
						type="submit"
						className="btn btn-rank"
						title="Click to submit your ranking."
					>
						<span className="fa fa-check-square-o" />
					</button>
				}	
				<div id="seller-rank" className="ranking">

					<input
						type="radio"
						id="r0"
						name="ranking"
						value="5"
						checked={props.rank==5}
					/>
					<label
						className="starlbl full"
						htmlFor="r0"
						title="5"
					/>

					<input
						type="radio"
						id="r1"
						name="ranking"
						value="4.5"
						checked={props.rank==4.5}
					/>
					<label
						className="starlbl half"
						htmlFor="r1"
						title="4.5"
					/>

					<input
						type="radio"
						id="r2"
						name="ranking"
						value="4"
						checked={props.rank==4}
					/>
					<label
						className="starlbl full"
						htmlFor="r2"
						title="4"
					/>

					<input
						type="radio"
						id="r3"
						name="ranking"
						value="3.5"
						checked={props.rank==3.5}
					/>
					<label
						className="starlbl half"
						htmlFor="r3"
						title="3.5"
					/>

					<input
						type="radio"
						id="r4"
						name="ranking"
						value="3"
						checked={props.rank==3}
					/>
					<label
						className="starlbl full"
						htmlFor="r4"
						title="3"
					/>

					<input
						type="radio"
						id="r5"
						name="ranking"
						value="2.5"
						checked={props.rank==2.5}
					/>
					<label
						className="starlbl half"
						htmlFor="r5"
						title="2.5"
					/>

					<input
						type="radio"
						id="r6"
						name="ranking"
						value="2"
						checked={props.rank==2}
					/>
					<label
						className="starlbl full"
						htmlFor="r6"
						title="2"
					/>

					<input
						type="radio"
						id="r7"
						name="ranking"
						value="1.5"
						checked={props.rank==1.5}
					/>
					<label
						className="starlbl half"
						htmlFor="r7"
						title="1.5"
					/>

					<input
						type="radio"
						id="r8"
						name="ranking"
						value="1"
						checked={props.rank==1}
					/>
					<label
						className="starlbl full"
						htmlFor="r8"
						title="1"
					/>

					<input
						type="radio"
						id="r9"
						name="ranking"
						value="0.5"
						checked={props.rank==0.5}
					/>
					<label
						className="starlbl half"
						htmlFor="r9"
						title="0.5"
					/>
					
					<span id="rank" className="rank">{props.rank}</span>

				</div>
			
			</form>
		</div>
	);
};