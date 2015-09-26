import {
    ADD_TODO,
    UPDATE_TODO,
    REMOVE_TODO
} from 'actions/actionTypes';

const initialState = {
    meta: {},
    items: {}
};

const initialItemState = {
    meta: {
        isBeingEditing: false, // True when edit form is present
        isSaving: false, // True during request service time
        isSaved: false, // True if saved successfully on server
        isValid: false, // True if did not save successfully
        errors: {}
    },
    data: {}
}

function todo(state = initialItemState, action) {
    switch (action.type) {
    case ADD_TODO:
        return Object.assign({}, state, {
            data: action.todo
        });
    case UPDATE_TODO:
        return state;
    case REMOVE_TODO:
        return state;
    default:
        return state;
    }
}

export default function todoCollection(state = initialState, action) {
    switch (action.type) {
    case ADD_TODO:
        var id = Math.random();
        return Object.assign({}, state, {
            items: Object.assign({}, state.items, {
                [id]: todo(state.items[id], action)
            })
        });
    case UPDATE_TODO:
        return state - 1;
    case REMOVE_TODO:
        return state - 1;
    default:
        return state;
    }
}
