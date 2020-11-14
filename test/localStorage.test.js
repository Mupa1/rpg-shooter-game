import LocalStorage from '../src/js/LocalStorage';

test('Should save data to localStorage', () => {
  LocalStorage.saveScoreLocalStorage('Mupa');
  expect(JSON.parse(localStorage.getItem('score'))).toBe('Mupa');
});

test('Should retrieve data from localStorage', () => {
  localStorage.setItem('score', JSON.stringify('Mupa'));
  expect(JSON.parse(localStorage.getItem('score'))).toBe('Mupa');
});
