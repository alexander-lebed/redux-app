// @flow

const toHex = (str) => {
    let hex = '';
    for(let i = 0; i < str.length; i++) {
        hex += '' + str.charCodeAt(i).toString(16);
    }
    return hex;
};

const toMongoID = (id: string): string => {
    const idLength = 24;
    let hexID = toHex(id);
    if (hexID.length < idLength) {
        const n = idLength - hexID.length;
        hexID += 'x'.repeat(n);
    } else if (hexID.length > idLength) {
        hexID = hexID.substr(0, idLength);
    }
    return hexID;
};

export default toMongoID;