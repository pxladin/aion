const { ftyp } = require('../constants/mp4');
const read32 = require('../buffer/mp4/read32');

module.exports = (read) => read32(read(4, 4)) === ftyp;
