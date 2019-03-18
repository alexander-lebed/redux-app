// @flow

const orderBy = (array: Array<any>, key: string, order: 'asc' | 'desc' = 'asc') => {
    return array.sort((a, b) => {
        const x = a[key], y = b[key];
        const predicate = order === 'asc' ? (x < y) : (x > y);
        return (predicate ? -1 : (!predicate ? 1 : 0));
    });
};

export default orderBy;