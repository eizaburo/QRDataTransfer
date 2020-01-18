import { UPDATE_EMAIL, UPDATE_SCANNED, UPDATE_QRDATA } from '../actions/configAction'

const initialValue = {
    email: '',
    scanned: false,
    qrdata: '',
}

const config = (state = initialValue, action) => {
    switch (action.type) {

        case UPDATE_EMAIL:
            const emailState = { ...state };
            emailState.email = action.payload;
            return emailState;

        case UPDATE_SCANNED:
            const scannedState = { ...state };
            scannedState.scanned = action.payload;
            return scannedState;

        case UPDATE_QRDATA:
            const qrdataState = { ...state };
            qrdataState.qrdata = action.payload;
            return qrdataState;

        default:
            return state;
    }
}

export default config;