export const CreateKeyWord = (text) => {
  const arrayKeyWords = [];
  // const pattern = ;
  const arrayWords = text.match(/("[^"]+|[^"\s]+)/g);

  arrayWords.forEach((word) => {
    let resumeWord = "";
    word.split("").forEach((letter) => {
      resumeWord += letter;
      arrayKeyWords.push(resumeWord.toLowerCase());
    });
  });

  let resumeWord = "";
  text.split("").forEach((letter) => {
    resumeWord += letter;
    arrayKeyWords.push(resumeWord);
  });
  return arrayKeyWords;
};
