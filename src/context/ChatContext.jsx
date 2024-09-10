import React, { createContext, useContext, useReducer } from "react";
import { CHANGE_USER } from "./chatActions";
import { AuthContext } from "./AuthContext";



export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        user: {},
        chatID: "",
    }

    const chatReducer = (state = INITIAL_STATE, action) => {
        switch (action.type) {
            case CHANGE_USER:
                return {
                    user: action.payload,
                    chatID: currentUser.uid > action.payload?.uid ? currentUser.uid + action.payload?.uid : action.payload?.uid + currentUser.uid
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}