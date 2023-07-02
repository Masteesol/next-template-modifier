type State = {
    isPasswordActive: boolean,
    isEmailActive: boolean,
    newPassword: string,
    repeatNewPassword: string,
    passwordMismatch: boolean,
    passwordEmpty: boolean,
    passwordSaved: boolean,
    passwordNotStrongEnough: boolean,
    newEmail: string,
    repeatNewEmail: string,
    isNotEmailFormat: boolean,
    newEmailMismatch: boolean,
    emailSaved: boolean,
    emailEmpty: boolean
    error: boolean
};

type Action = {
    type: string;
    payload?: any;
};


export const initialState = {
    isPasswordActive: false,
    isEmailActive: false,
    newPassword: '',
    repeatNewPassword: '',
    passwordMismatch: false,
    passwordEmpty: false,
    passwordSaved: false,
    passwordNotStrongEnough: false,
    newEmail: '',
    repeatNewEmail: '',
    isNotEmailFormat: false,
    newEmailMismatch: false,
    emailSaved: false,
    emailEmpty: false,
    error: false
};


export function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'RESET':
            return initialState;
        case 'setIsPasswordActive':
            return { ...state, isPasswordActive: action.payload };
        case 'setIsEmailActive':
            return { ...state, isEmailActive: action.payload };
        case 'setNewPassword':
            return { ...state, newPassword: action.payload };
        case 'setRepeatNewPassword':
            return { ...state, repeatNewPassword: action.payload };
        case 'setPasswordMismatch':
            return { ...state, passwordMismatch: action.payload };
        case 'setPasswordEmpty':
            return { ...state, passwordEmpty: action.payload };
        case 'setPasswordSaved':
            return { ...state, passwordSaved: action.payload };
        case 'setPasswordNotStrongEnough':
            return { ...state, passwordNotStrongEnough: action.payload };
        case 'setNewEmail':
            return { ...state, newEmail: action.payload };
        case 'setRepeatNewEmail':
            return { ...state, repeatNewEmail: action.payload };
        case 'setIsNotEmailFormat':
            return { ...state, isNotEmailFormat: action.payload };
        case 'setNewEmailMismatch':
            return { ...state, newEmailMismatch: action.payload };
        case 'setEmailSaved':
            return { ...state, emailSaved: action.payload };
        case 'setEmailEmpty':
            return { ...state, emailEmpty: action.payload };
        case 'setError':
            return { ...state, error: action.payload };
        default:
            throw new Error("Error in useCredentialsStates");
    }
}

