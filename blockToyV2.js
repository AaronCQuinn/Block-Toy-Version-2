const COLORS = {
    RED:"red",
    ORANGE:"orange",
    GREEN:"green",
    BLUE:"blue",
    LIGHTGREY:"lightgrey",
    YELLOW:"yellow"
}

const TILE_DIMENSION = 13 + "vh";
const ROWS = 3;
const COLUMNS = 6;

let tileArray = new Array(ROWS);

initializeGame();

function createGameTile(colour) {
    let newTile = document.createElement("div");
    $(newTile).css({"background-color": colour, "max-height": TILE_DIMENSION, "max-width": TILE_DIMENSION});
    return newTile;
}

function initializeGame() {
    // Function that acts as main.

    // Create and append tiles to array.
    for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
        tileArray[rowIdx] = new Array(COLUMNS);
        for (let colIdx = 0; colIdx < COLUMNS; colIdx++) {
            let newTile = createGameTile(Object.values(COLORS)[colIdx]);
            tileArray[rowIdx][colIdx] = newTile;
        }
    }

    // Set one grey tile transparent before shuffle to allow for vertical swapping.
    $(tileArray[1][4]).css("background-color", "transparent");

    // Shuffle the board before appending.


    // Append game tiles to DOM.
    $(tileArray).each( function(idx) {
        $('#blocks').append(tileArray[idx]);
    });


    addArrowClickEvents();
    // Add vertical moving to tiles.
    addVerticalClickSwap();
};

function swapTiles(x1, x2, y1, y2) {
    // At this time I can't find a solution to swapping two entire divs vertically as they are not adjacent, and are already appended into the DOM. When I figure out a solution I'll return and refactor.

    // Swaps tiles colours.
    let tempTile = tileArray[x1][x2].style.backgroundColor;
    $(tileArray[x1][x2]).css("background-color", $(tileArray[y1][y2]).css("background-color"));
    $(tileArray[y1][y2]).css("background-color", tempTile);
}

function addArrowClickEvents() {
    // Add on click funcitonality to arrows to rotate their respective rows.
    for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {

        // Left arrow rotation.
        $("#leftArrow" + rowIdx).on("click", function() {
            let temp = $(tileArray[rowIdx][0]).css('background-color');
            for (let i = 0; i < 5; i++) {
                $(tileArray[rowIdx][i]).css('background-color', $(tileArray[rowIdx][i + 1]).css('background-color'));
            }
            $(tileArray[rowIdx][5]).css('background-color', temp);
        });

        // Right arrow rotation.
        $("#rightArrow" + rowIdx).on("click", function() {
            let temp = $(tileArray[rowIdx][5]).css('background-color');
            for (let i = 5; i > 0; i--) {
                $(tileArray[rowIdx][i]).css('background-color', $(tileArray[rowIdx][i - 1]).css('background-color'));
            }
            $(tileArray[rowIdx][0]).css('background-color', temp);
        });
    }
}

function addVerticalClickSwap() {
    // Adds functionality to each div to allow for vertical switching if the transparent tile is vertically adjacent.
    let flatTileArray = _.flatten(tileArray);
    $('#blocks').children().each( (idx,div) => {
        $(div).on('click', function() {
            if (idx >= 0 && idx < 6) {
                
                // If middle row contains the transparent tile, clicking on a tile in the first row will swap it vertically.
                if (flatTileArray[idx + 6].style.backgroundColor == "rgba(0, 0, 0, 0)" || flatTileArray[idx + 6].style.backgroundColor == "transparent") {
                    swapTiles(0, idx, 1, idx);
                }
            } else if (idx >= 6 && idx < 12) {
                // If the first row contains the transparent tile, clicking on a tile in the middle row will swap it vertically.
                if (flatTileArray[idx - 6].style.backgroundColor == "rgba(0, 0, 0, 0)") {
                    swapTiles(0, idx - 6, 1, idx - 6);

                // If the third row contains the transparent tile, clicking on a tile in the middle row will swap it veritically.
                } else if (flatTileArray[idx + 6].style.backgroundColor == "rgba(0, 0, 0, 0)") {
                    swapTiles(1, idx - 6, 2, idx - 6);
                }
            } else if (idx >= 12) {

                // If the middle row contains the transparent tile, clicking on a tile in the middle row will swap if vertically to the bottom row.
                if (flatTileArray[idx - 6].style.backgroundColor == "rgba(0, 0, 0, 0)") {
                    swapTiles(1, idx - 12, 2, idx - 12);
                }
            }
        })
    })
}


// console.log(($('#blocks').children(6)).css('background-color'));
// // console.log(($('#blocks')).children());