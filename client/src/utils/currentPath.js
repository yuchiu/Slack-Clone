export default path => {
  if (path.toLowerCase().includes("channel")) {
    return "channel";
  }
  if (path.toLowerCase().includes("direct-message")) {
    return "direct-message";
  }
  return null;
};
