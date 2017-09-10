'use strict';

import React from 'react';

export default (props)=>{
	return(
		<div className="page-slider margin-bottom-35">
			<div id="carousel-example-generic" className="carousel slide carousel-slider">
				<div className="carousel-inner" role="listbox">
					<div className="item active">
						<video className="slider-video" width="100%" preload="auto" loop="true" autoPlay="true" src="assets/videos/sliderBackground.mp4" />
						<div className="videotxt">
							<h2 className="margin-bottom-20 animate-delay carousel-title-v3 border-bottom-title text-uppercase" data-animation="animated fadeInDown">
								If you can't <br/><span className="color-red-v2"> Buy, Sell or Trade Locally</span><br/> With Confidence<br/> <span className="color-red-v2">Chuck it! </span>
							</h2>
							<p className="carousel-subtitle-v2" data-animation="animated fadeInUp">We don't collect fees and verify all users for safety. <br/> Our rating system allows users to flag scammers and creeps.<br/>Our built in messaging system helps protects your privacy.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};