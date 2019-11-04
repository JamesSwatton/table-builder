// Computes arrays of minimum column widths and row heights for a grid of cells.
// The 'rows' variable will hold an array of arrays, with each inner array representing
// a row of cells.

function rowHeights(rows) {
    return rows.map(row => {
        return row.reduce((max, cell) => {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map((_, i) => {
        return rows.reduce((max, row) => {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

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


