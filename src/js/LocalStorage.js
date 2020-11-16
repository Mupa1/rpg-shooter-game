const LocalStorage = (() => {
  const saveScoreLocalStorage = (score) => {
    localStorage.setItem('score', JSON.stringify(score));
  };

  const getScoreLocalStorage = () => {
    const score = JSON.parse(localStorage.getItem('score'));

    if (!score) {
      return 1;
    }
    return score;
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return {
    saveScoreLocalStorage,
    getScoreLocalStorage,
    clearLocalStorage,
  };
})();

export default LocalStorage;
