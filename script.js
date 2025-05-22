(() => {
  const boardElem = document.querySelector('.board');
  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusElem = document.getElementById('status');
  const resetBtn = document.getElementById('resetBtn');

  // Game state variables
  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameActive = true;

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
  ];

  // Update status message
  function updateStatus(message) {
    statusElem.textContent = message;
  }

  // Check win condition
  function checkWin(player) {
    return winningCombinations.some(combination => {
      return combination.every(index => board[index] === player);
    });
  }

  // Check draw condition
  function checkDraw() {
    return board.every(cell => cell !== null);
  }

  // Highlight winning cells visually
  function highlightWin(player) {
    const combo = winningCombinations.find(combination =>
      combination.every(index => board[index] === player)
    );

    if (!combo) return;

    combo.forEach(index => {
      cells[index].classList.add('win-cell');
      cells[index].style.textShadow = player === 'X' ? '0 0 15px #FF6347' : '0 0 15px #1E90FF';
      cells[index].style.transition = 'transform 0.3s ease';
      cells[index].style.transform = 'scale(1.3)';
    });
  }

  // Reset all highlights
  function resetHighlights() {
    cells.forEach(cell => {
      cell.classList.remove('win-cell');
      cell.style.textShadow = '';
      cell.style.transform = '';
    });
  }

  // Handle a cell click or keyboard action on focused cell
  function handleCellClick(e) {
    const index = parseInt(e.target.dataset.index);
    if (!gameActive || board[index] !== null) {
      return;
    }

    // Set the cell for currentPlayer
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());
    e.target.classList.add('taken');
    e.target.removeAttribute('tabindex');

    // Check for win or draw
    if (checkWin(currentPlayer)) {
      highlightWin(currentPlayer);
      updateStatus(`Player ${currentPlayer} wins! 🎉`);
      gameActive = false;
      return;
    }

    if (checkDraw()) {
      updateStatus("It's a draw! 🤝");
      gameActive = false;
      return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(`Player ${currentPlayer}'s turn`);
  }

  // Allow keyboard controls: Enter or Space activates a cell
  function handleKeyDown(e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('cell')) {
      e.preventDefault();
      e.target.click();
    }
  }

  // Reset game
  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    updateStatus("Player X's turn");
    cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('x', 'o', 'taken', 'win-cell');
      cell.style.textShadow = '';
      cell.style.transform = '';
      cell.setAttribute('tabindex', '0');
    });
  }

  // Set event listeners
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.addEventListener('keydown', handleKeyDown);
  });
  resetBtn.addEventListener('click', resetGame);

  // Initialize display
  updateStatus("Player X's turn");
})();
