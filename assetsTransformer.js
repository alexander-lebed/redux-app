// const path = require('path');
import path from 'path';

export default {
    process(src, filename/*, config, options*/) {
        return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
    },
};