export default (messageGroupName, currentUsername) => {
  const position = messageGroupName.indexOf(currentUsername);

  if (!currentUsername || !messageGroupName) {
    return null;
  }
  // if current username at the begining
  if (position === 0)
    return messageGroupName.substring(
      position + currentUsername.length + 2,
      messageGroupName.length
    );

  // if current username at the end
  if (position + currentUsername.length === messageGroupName.length) {
    return messageGroupName
      .substring(0, position - 2)
      .concat(
        messageGroupName.substring(
          position + currentUsername.length,
          messageGroupName.length
        )
      );
  }

  // if current username at the middle
  return messageGroupName
    .substring(0, position - 2)
    .concat(
      messageGroupName.substring(
        position + currentUsername.length,
        messageGroupName.length
      )
    );
};
