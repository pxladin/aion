const { moov } = require('../constants/mp4');
const read32 = require('../buffer/mp4/read32');
const write32 = require('../buffer/mp4/write32');

module.exports = (read, duration, timescale) => {
  let offset = 0;

  while (true) {
    const chunk = read(8, offset);

    if (read32(chunk, 4) === moov) {
      offset += 16;

      break;
    }

    offset += read32(chunk);
  }

  const header = read(32, offset);

  let index = header[0] === 0 ? 12 : 20;

  write32(header, timescale, index);
  write32(header, duration, index + 4);

  return [header, offset];
};
