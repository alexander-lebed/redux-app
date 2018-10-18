// @flow
// generate unique ID
const uid = (): string => Math.random().toString(34).slice(2);
export default uid;
