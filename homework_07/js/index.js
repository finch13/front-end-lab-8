let whiteMove = true, // The White's first turn
  winningCombination = 4, // 4 stones for win
  boadrSize = 15; // Go-board size 15 x 15

for (let i = 0; i < boadrSize + 1; i++) {
  let boardRow = $('<div></div>').addClass('board-row');
  $('.board-play_zone').append(boardRow);
  for (let j = 0; j < boadrSize + 1; j++) {
    let boadrColumn = $('<div></div>').addClass('board-column');
    let boadrCell = $('<div></div>').addClass('board-cell');
    boadrColumn.append(boadrCell);
    boardRow.append(boadrColumn);
  }
}

$(".board-cell").hover(function () {
  if ($(this).hasClass("white") || $(this).hasClass("black")) return;
  else if (whiteMove) $(this).addClass("hover-white");
  else $(this).addClass("hover-black");
}, function () {
  if (whiteMove) $(this).removeClass("hover-white");
  else $(this).removeClass("hover-black");
});

$('.cancel').on('click', function () {
  $('.modal-gomoku').removeClass('active');
  $('.new-game-process').addClass('active');
});
$('.new-game').on('click', function () {
  whiteMove = true;
  $(this).removeClass('active');
  $('.board-play_zone div').removeClass('wht blck hover-white white hover-black black');
  $('.modal-gomoku').removeClass('active');
  $(".move.black").css({ display: "none" });
  $(".move.white").css({ display: "flex" });
});

$(".board-cell").on("click", function () {

  let $prevCell = $(this).parent().prev().children(),
    $nextCell = $(this).parent().next().children(),
    $prevAllCells = $(this).parent().prevAll().children(),
    $nextAllCells = $(this).parent().nextAll().children(),

    $currentIndexStone = $(this).parent().index(),
    $prevRow = $(this).parent().parent().prev(),
    $prevAllRows = $(this).parent().parent().prevAll(),
    $nextRow = $(this).parent().parent().next(),
    $nextAllRows = $(this).parent().parent().nextAll(),

    currentWhiteHorizCombination = 1,
    currentBlackHorizCombination = 1,

    currentWhiteVertCombination = 1,
    currentBlackVertCombination = 1,

    currentWhiteDiagCombOne = 1,
    currentWhiteDiagCombTwo = 1,
    currentBlackDiagCombOne = 1,
    currentBlackDiagCombTwo = 1,
    index = 1;

  $(".move").toggle();

  if ($(this).hasClass("white") || $(this).hasClass("black")) {
    return;
  } else if (whiteMove) {
    whiteMove = false;
    $(this).toggleClass("white");
    $(this).parent().toggleClass("wht");
    $(this).parent().parent().toggleClass("wht");
  } else {
    whiteMove = true;
    $(this).toggleClass("black");
    $(this).parent().toggleClass("blck");
    $(this).parent().parent().toggleClass("blck");
  }

  function checkingWin() {
    if ((!whiteMove ? currentWhiteHorizCombination : currentBlackHorizCombination) >= winningCombination) {
      $('.modal-gomoku').addClass('active');
      $('.modal-text').text(`The ${!whiteMove ? 'WHITE' : 'BLACK'} won`);
      !whiteMove ? currentWhiteHorizCombination = 1 : currentBlackHorizCombination = 1;
      return !whiteMove ? currentWhiteHorizCombination : currentBlackHorizCombination;
    }
    if ((!whiteMove ? currentWhiteVertCombination : currentBlackVertCombination) >= winningCombination) {
      $('.modal-gomoku').addClass('active');
      $('.modal-text').text(`The ${!whiteMove ? 'WHITE' : 'BLACK'} won`);
      !whiteMove ? currentWhiteVertCombination = 1 : currentBlackVertCombination = 1;
      return !whiteMove ? currentWhiteVertCombination : currentBlackVertCombination;
    }
    if ((!whiteMove ? currentWhiteDiagCombOne : currentBlackDiagCombOne) >= winningCombination) {
      $('.modal-gomoku').addClass('active');
      $('.modal-text').text(`The ${!whiteMove ? 'WHITE' : 'BLACK'} won`);
      index = 1;
      !whiteMove ? currentWhiteDiagCombOne = 1 : currentBlackDiagCombOne = 1;
      return !whiteMove ? currentWhiteDiagCombOne : currentBlackDiagCombOne;
    }
    if ((!whiteMove ? currentWhiteDiagCombTwo : currentBlackDiagCombTwo) >= winningCombination) {
      $('.modal-gomoku').addClass('active');
      $('.modal-text').text(`The ${!whiteMove ? 'WHITE' : 'BLACK'} won`);
      index = 1;
      !whiteMove ? currentWhiteDiagCombTwo = 1 : currentBlackDiagCombTwo = 1;
      return !whiteMove ? currentWhiteDiagCombTwo : currentBlackDiagCombTwo;
    }
  }

  // checking winning HORIZONTAL-combination
  $prevAllCells.each(function (element) {
    if ($(this).hasClass(`${!whiteMove ? 'white' : 'black'}`)) {
      !whiteMove ? currentWhiteHorizCombination++ : currentBlackHorizCombination++;
      checkingWin();
    } else return false;
  });
  $nextAllCells.each(function (element) {
    if ($(this).hasClass(`${!whiteMove ? 'white' : 'black'}`)) {
      !whiteMove ? currentWhiteHorizCombination++ : currentBlackHorizCombination++;
      checkingWin();
    } else return false;
  });

  // checking winning VERTICAL-combination
  $prevAllRows.each(function (element) {
    if ($(this).children().eq($currentIndexStone).hasClass(`${!whiteMove ? 'wht' : 'blck'}`)) {
      !whiteMove ? currentWhiteVertCombination++ : currentBlackVertCombination++;
      checkingWin();
    } else return false;
  });
  $nextAllRows.each(function (element) {
    if ($(this).children().eq($currentIndexStone).hasClass(`${!whiteMove ? 'wht' : 'blck'}`)) {
      !whiteMove ? currentWhiteVertCombination++ : currentBlackVertCombination++;
      checkingWin();
    } else return false;
  });

  // checking winning DIAGONAL-combination
  $prevAllRows.each(function (element) {
    if ($(this).children().eq($currentIndexStone + index).hasClass(`${!whiteMove ? 'wht' : 'blck'}`)) {
      index++;
      !whiteMove ? currentWhiteDiagCombOne++ : currentBlackDiagCombOne++;
      checkingWin();
    } else {
      index = 1;
      return false;
    }
  });
  $prevAllRows.each(function (element) {
    if ($(this).children().eq($currentIndexStone - index).hasClass(`${!whiteMove ? 'wht' : 'blck'}`)) {
      index++;
      !whiteMove ? currentWhiteDiagCombTwo++ : currentBlackDiagCombTwo++;
      checkingWin();
    } else {
      index = 1;
      return false;
    }
  });

  $nextAllRows.each(function (element) {
    if ($(this).children().eq($currentIndexStone + index).hasClass(`${!whiteMove ? 'wht' : 'blck'}`)) {
      index++;
      !whiteMove ? currentWhiteDiagCombTwo++ : currentBlackDiagCombTwo++;
      checkingWin();
    } else {
      index = 1;
      return false;
    }
  });
  $nextAllRows.each(function (element) {
    if ($(this).children().eq($currentIndexStone - index).hasClass(`${!whiteMove ? 'wht' : 'blck'}`)) {
      index++;
      !whiteMove ? currentWhiteDiagCombOne++ : currentBlackDiagCombOne++;
      checkingWin();
    } else {
      index = 1;
      return false;
    }
  });
});