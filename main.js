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

function colWidth(rows) {
    return rows[0].map((_, i) => {
        return rows.reduce((max, row) => {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}
