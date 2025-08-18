(function () {
  const symbols = ["1", "2", "3", "4", "5", "6", "7"];
  let balance = 100;

  function $(id) {
    return document.getElementById(id);
  }

  function updateBalance() {
    $('balance').textContent = balance;
  }

  function getRandomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function showResult(bet) {
    const r1 = $('r1').textContent;
    const r2 = $('r2').textContent;
    const r3 = $('r3').textContent;
    const msg = $('message');

    if (r1 === r2 && r2 === r3) {
      balance += bet * 4; // x5 суммарно: +4 * bet
      msg.textContent = 'Jackpot! Three «${r1}». You won ${bet * 4}$!';
      msg.style.color = "#00ff88";
    } else if (r1 === r2  r2 === r3  r1 === r3) {
      balance += bet; // возврат ставки
      msg.textContent = 'Two matches. Bet returned.';
      msg.style.color = "#f1c40f";
    } else {
      balance -= bet;
      msg.textContent = 'No matches. You lost ${bet}$...';
      msg.style.color = "#ff5555";
    }

    if (balance <= 0) {
      msg.textContent = 'You are out of money!';
      $('playBtn').disabled = true;
    }

    updateBalance();
  }

  function spin() {
    const playBtn = $('playBtn');
    const betInput = $('bet');
    const msg = $('message');

    let bet = parseInt(betInput.value, 10);
    msg.textContent = "";

    if (isNaN(bet) || bet <= 0) {
      msg.textContent = "Введите корректную ставку!";
      msg.style.color = "";
      return;
    }
    if (bet > balance) {
      msg.textContent = "Недостаточно средств!";
      msg.style.color = "";
      return;
    }

    playBtn.disabled = true;
    let spinsLeft = 3;

    function nextFrame() {
      $('r1').textContent = getRandomSymbol();
      $('r2').textContent = getRandomSymbol();
      $('r3').textContent = getRandomSymbol();

      spinsLeft--;
      if (spinsLeft === 0) {
        showResult(bet);
        playBtn.disabled = false;
      } else {
        setTimeout(nextFrame, 300);
      }
    }

    nextFrame();
  }

  function init() {
    const playBtn = $('playBtn');
    if (!playBtn) return; // если скрипт случайно подключили на другой странице

    updateBalance();

    playBtn.addEventListener('click', spin);

    // Enter/Space запускает спин, если фокус не в input
    document.addEventListener('keydown', function (event) {
      const tag = document.activeElement && document.activeElement.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if ((event.code === 'Enter' || event.code === 'Space') && !playBtn.disabled) {
        event.preventDefault();
        spin();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
