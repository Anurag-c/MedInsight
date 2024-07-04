export const initialState:AuthState = {
    isLoggedIn: false,
    token: '',
    user: null
}

export interface AuthState {
    isLoggedIn: Boolean;
    isFirstLogin?: Boolean;
    token: String;
    user: any;
}

export type RegisterPayload = {
    qrCode: String;
    user: {
        id: String;
        email: String;
        secretKey: String;
    };
}

export type LoginPayload = {
    user: any,
    totp: Number,
    token: String
}

export type AuthAction = 
    | { type: 'REGISTER'; payload: any  }
    | { type: 'LOGIN'; payload: any  }
    | { type: 'LOGOUT'; payload: null  }

export const authReducer = (state: AuthState, action: AuthAction) => {
    const { payload } = action;
    switch (action.type) {
        case 'REGISTER':
            return { 
                ...state, 
                qrCode: payload.qrCode,
                user: payload.user,
                isFirstLogin: true,
                isLoggedIn: true
            }
        case 'LOGIN':
            return { 
                ...state,
                user: payload.user,
                token: payload.token,
                isLoggedIn: true
             }
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}