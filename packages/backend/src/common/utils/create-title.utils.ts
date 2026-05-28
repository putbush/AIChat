export const createTitle = (message: string): string => {
  const words = message.split(' ');

  let title = '';
  for (const word of words) {
    if (title.length + word.length + 1 > 45) {
      title += '...';
      break;
    }
    title += (title ? ' ' : '') + word;
  }
  return title;
};
