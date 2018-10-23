const uuid = require("uuid/v4");

const getNewId = () => {
  const id = uuid();
  const removedHyphenId = id.replace(/-/g, "");
  return removedHyphenId;
};

module.exports = getNewId;
