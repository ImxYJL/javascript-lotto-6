export const parseNumbers = (string) => string.split(',').map(Number);

export const formatArray = (array) => `[${array.join(', ')}]`;
