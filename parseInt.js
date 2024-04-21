function parseInt(str) {
    let result = 0;
    const isNegative = str[0] === '-';
    let startIndex = isNegative ? 1 : 0;

    for (let i = startIndex; i < str.length; i++) {
        const digit = parseInt(str[i]);
        if (isNaN(digit)) {
            break;
        }
        result = result * 10 + digit;
    }

    return isNegative ? -result : result;
}

