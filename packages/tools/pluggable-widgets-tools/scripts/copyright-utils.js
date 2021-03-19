function extractParts(copyright) {
    const startYearIndex = copyright.indexOf("2005-");
    const [firstPart, secondPart] = [copyright.slice(0, startYearIndex + 5), copyright.slice(startYearIndex + 5)];
    const textPartStartIndex = secondPart.indexOf(" ");
    const endYear = parseInt(secondPart.slice(0, textPartStartIndex), 10);

    return [firstPart, endYear, secondPart.slice(textPartStartIndex)];
}

module.exports = {
    extractParts
};
