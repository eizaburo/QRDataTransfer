export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_SCANNED = "UPDATE_SCANNED";
export const UPDATE_QRDATA = "UPDATE_QRDATA";

//email
export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email,
    }
}

//scanned
export const updateScanned = scanned => {
    return {
        type: UPDATE_SCANNED,
        payload: scanned,
    }
}

//qrdata
export const updateQRData = qrdata => {
    return {
        type: UPDATE_QRDATA,
        payload: qrdata,
    }
}