// random_discount.js

// Define discounting logic based on total price
function calculateDiscount(totalPrice) {
    // Example: Generate a random discount between 5% and 20%
    const minDiscount = 0.05; // 5%
    const maxDiscount = 0.2; // 20%
    const discountRate = Math.random() * (maxDiscount - minDiscount) + minDiscount;

    // Calculate discounted price
    const discountedPrice = totalPrice * (1 - discountRate);

    return {
        discountRate,
        discountedPrice
    };
}

module.exports = {
    calculateDiscount
};
