const initState = {
    users: [],

};

const ActionTypes = {
    SET_USER: "@@user/SET_USER",
};

export const setUserDetail = (data) => ({ type: ActionTypes.SET_USER, data });

const users = (state = initState, action) => {
    switch (action.type) {
        case ActionTypes.SET_USER:
            return {
                ...state,
                users: action.data || [],
            };
        default:
            return { ...state };
    }
};

export default users;
