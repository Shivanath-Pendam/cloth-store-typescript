import { createContext, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
import { createUserDoucmentFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            }

        default:
            throw new Error(`Unhandled type of ${type} in user Reducer`);
    }
}

const INITIALVALUE = {
    currentUser: null,
}

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIALVALUE);

    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user));
    }

    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDoucmentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    })
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}