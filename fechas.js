
var start = new Date();
var end = new Date();

function Days360() {
    if (!start || !end) return undefined;
    const days = (end.getUTCFullYear() - start.getUTCFullYear()) * 360
        + (end.getUTCMonth() - start.getUTCMonth()) * 30
        + (end.getUTCDate() - start.getUTCDate());
    return parseFloat(parseFloat(days.toString()).toFixed(decimalPlace));
}