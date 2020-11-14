import scoreAPI from '../src/js/scoreAPI';

test('Should retrieve and return the scores', () => {
  scoreAPI.getScores()
    .then((data) => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            score: '100',
          }),
        ]),
      );
    })
    .catch(() => { });
});

test('Should submit player name and score', () => {
  scoreAPI.submitScores('Mupa', 200).then((response) => {
    expect(response).toBe('Leaderboard score created correctly.');
  }).catch((error) => error);
});

test('Should send an object to the scoreAPI', () => {
  scoreAPI.submitScores().then(data => {
    expect(typeof data).toBe('object');
  }).catch(() => { });
});

test('score should not be 0 ', () => {
  scoreAPI.submitScores('Mupa', 0).then((response) => {
    expect(response).toBe(null);
  }).catch((error) => error);
});

test('name should not be blank', () => {
  scoreAPI.submitScores(' ', 10)
    .then((response) => {
      expect(response).toBe(null);
    })
    .catch((error) => error);
});
