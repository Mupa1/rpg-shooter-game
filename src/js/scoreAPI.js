const scoreAPI = (() => {
  const key = 'zVfWV8keV9BOq12v1NYI';

  const getScores = async () => {
    try {
      const scores = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      return scores.json();
    } catch (error) {
      return error.json();
    }
  };

  const submitScores = async (name, score) => {
    try {
      const result = await fetch(
        `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores/`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: name,
            score: Number(score),
          }),
        },
      );

      return result.json();
    } catch (error) {
      return error.json();
    }
  };

  return { submitScores, getScores };
})();

export default scoreAPI;
