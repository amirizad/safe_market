'use strict';

export default (state={
		id: '',
		itemid: '',
		rank: 0,
		ranked: false
	},action)=>{
	switch(action.type){
		case 'UPDATE_RANKING':
			state={
				...state,
				[action.payload.id]:action.payload.value
			}
		break;
		case 'RECEIVE_RATINGS':
			state={
				...state,
				id: action.payload.id,
				itemid : action.payload.itemid,
				rank: action.payload.rank,
				ranked: action.payload.ranked
			}
		break;
	}
	return state;
}