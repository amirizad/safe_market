export default (state={
    term:'',
    category:'',
    zip:''
},action)=>{
    switch(action.type){
        case 'UPDATE_SEARCH_FORM':
        state={
            ...state,
            [action.payload.id]:action.payload.value
        };
        break;

        case 'SET_USER_ZIP':
        state={
            ...state,
            zip:action.payload
        }
        break;
    }

    return state;
}