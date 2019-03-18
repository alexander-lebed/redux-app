// @flow
const generateError = (err: Object) => {
    return err.response ? err.response.statusText : err.message;
};

export default generateError;