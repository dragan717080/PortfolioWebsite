const pages = document.getElementsByClassName('page');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function demo() {
  const durations = [1040, 240, 420];
  
  for (let i = 1; i <= durations.length; i++) {
    await wait(durations[i - 1]);
    pages[i].innerText = '';
  }
}

demo();
