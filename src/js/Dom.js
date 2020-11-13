import scoreAPI from './scoreAPI';

const Dom = (() => {
  const nameform = () => {
    const form = document.createElement('div');
    const p = document.createElement('p');
    form.setAttribute('id', 'form');
    form.innerHTML = `
      <input type="search" id="input" placeholder="Enter your name" aria-label="Search" required/></br>
      <button type="submit" id="submit"> Submit Score</button>
    `;
    form.appendChild(p);
    const body = document.body.appendChild(form);
    return body;
  };

  const submitButtonAction = (score) => {
    const input = document.querySelector('#input');
    const form = document.querySelector('#form');
    const button = document.querySelector('#submit');
    const p = document.querySelector('p');
    setTimeout(() => {
      button.onclick = () => {
        if (input.value !== '') {
          form.innerHTML = '<h3 id="submitting">Submitting... </h3>';
          scoreAPI.submitScores(input.value, score).then((response) => {
            form.innerHTML = `<h3 id="response">${response.result} </h3>`;
          });
        } else {
          p.innerHTML = 'Enter a valid name';
        }
      };
    }, 1000);
  };

  return {
    nameform,
    submitButtonAction,
  };
})();

export default Dom;
