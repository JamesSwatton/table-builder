// Computes arrays of minimum column widths and row heights for a grid of cells.
// The 'rows' variable will hold an array of arrays, with each inner array representing
// a row of cells.

// Uses 'reduce' to compute the maximum height of an array of cells and wraps that in 'map'
// in order to do it for all rows in the 'rows' array.
function rowHeights(rows) {
    return rows.map(row => {
        return row.reduce((max, cell) => {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

// The second argument that 'map' takes is index of the current element. The first argument (_)
// will not be used. By mapping over the elements in the first row and only using the mapping
// functions second argument, 'colWidths' builds up an array with one element for every
// column index. The call to 'reduce' runs over the outer 'rows' array for each index and
// picks out the width of the widest cell at that index.
function colWidths(rows) {
    return rows[0].map((_, i) => {
        return rows.reduce((max, row) => {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

// This function uses an internal helper function 'drawRow' to draw all rows and then joins
// them together with newline characters.
function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(block => {
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(row, rowNum) {
        var blocks = row.map((cell, colNum) => {
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        return blocks[0].map((_, lineNo) => {
            return drawLine(blocks, lineNo);
        }).join("\n");
    }

    return rows.map(drawRow).join("\n");
}

function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

function TextCell(text) {
    this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
    return this.text.reduce((width, line) => {
        return Math.max(width, line.length);
    }, 0);
};
TextCell.prototype.minHeight = function() {
    return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};

function UnderlinedCell(inner) {
    this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1)
        .concat([repeat("-", width)]);
};

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(name => {
        return new UnderlinedCell(new TextCell(name));
    });
    var body = data.map(row => {
        return keys.map(name => {
            return new TextCell(String(row[name]));
        });
    });
    return [headers].concat(body);
}

// var rows = [];

// for (var i = 0; i < 6; i++) {
//     var row = [];
//     for (var j = 0; j < 6; j++) {
//         if ((j + i) % 2 == 0) {
//             row.push(new TextCell("##"));
//         } else {
//             row.push(new TextCell(" "));
//         }
//     }
//     rows.push(row);
// }

// console.log(drawTable(rows));

