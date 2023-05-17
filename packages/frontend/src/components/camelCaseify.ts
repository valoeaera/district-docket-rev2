const camelCaseify = (titleCaseText: string) => {
  let returnVal = "";
  const wordsList = titleCaseText
    .replaceAll("&", "and")
    .replaceAll("?", "")
    .replaceAll("-", " ")
    .split(" ");
  wordsList.forEach((word, index) => {
    const returnWord = index === 0 ? word.toLowerCase() : word;
    returnVal += returnWord;
  });
  return returnVal;
};

export default camelCaseify;
