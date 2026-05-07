export const createTitle = (message: string): string => {
  return message.length > 25 ? message.slice(0, 25) : message;
};
