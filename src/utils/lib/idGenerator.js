// @flow
// generate unique ID
const idGenerator = (): string => Math.random().toString(34).slice(2);
export default idGenerator;
