const calculatePoints = (receipt) => {
    let points = 0;

    // 1. One point for every alphanumeric character in the retailer name
    points += (receipt.retailer.match(/\w/g) || []).length;

    // 2. 50 points if the total is a round dollar amount
    if (parseFloat(receipt.total) % 1 === 0) {
        points += 50;
    }

    // 3. 25 points if the total is a multiple of 0.25
    if (parseFloat(receipt.total) % 0.25 === 0) {
        points += 25;
    }

    // 4. 5 points for every two items on the receipt
    points += Math.floor(receipt.items.length / 2) * 5;

    // 5. Points for item descriptions with length a multiple of 3
    receipt.items.forEach((item) => {
        const trimmedLength = item.shortDescription.trim().length;
        if (trimmedLength % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });

    // 6. 6 points if the day in the purchase date is odd
    const day = parseInt(receipt.purchaseDate.split('-')[2], 10);
    if (day % 2 !== 0) {
        points += 6;
    }

    // 7. 10 points if the time of purchase is after 2:00 PM and before 4:00 PM
    const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
    if (hour === 14 || (hour === 15 && minute === 0)) {
        points += 10;
    }

    return points;
};

module.exports = { calculatePoints };
