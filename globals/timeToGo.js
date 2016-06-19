exports.main = (d) => {
    // Utility to add leading zero
    function z(n) {
	return (n < 10? '0' : '') + n;
    }

    // Convert string to date object
    var diff = d - new Date();

    // Allow for previous times
    var sign = diff < 0? -1 : 1;
    diff = Math.abs(diff);

    // Get time components
    var hours = diff/3.6e6 | 0;
    var mins  = diff%3.6e6 / 6e4 | 0;
    var secs  = Math.round(diff%6e4 / 1e3);

    // Return array
    return [z(hours), z(mins), z(secs), sign];
}
