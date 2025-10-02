// 代码生成时间: 2025-10-03 02:48:24
const EventEmitter = require('events');

class PromotionEngine extends EventEmitter {
  /**
   * Initializes the PromotionEngine with an empty promotions list.
   */
  constructor() {
    super();
    this.promotions = [];
  }

  /**
   * Adds a promotion to the list.
   * @param {Object} promotion - The promotion to be added.
   * @param {String} promotion.name - The name of the promotion.
   * @param {Function} promotion.condition - A function that returns a boolean indicating if the promotion applies.
   * @param {Function} promotion.discount - A function that applies the promotion's discount.
   * @returns {Boolean} - True if the promotion was added, false otherwise.
   */
  addPromotion(promotion) {
    if (!promotion.name || typeof promotion.condition !== 'function' || typeof promotion.discount !== 'function') {
      throw new Error('Invalid promotion format.');
    }
    this.promotions.push(promotion);
    return true;
  }

  /**
   * Removes a promotion from the list by name.
   * @param {String} promotionName - The name of the promotion to be removed.
   * @returns {Boolean} - True if the promotion was removed, false otherwise.
   */
  removePromotion(promotionName) {
    const index = this.promotions.findIndex(p => p.name === promotionName);
    if (index !== -1) {
      this.promotions.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Applies all applicable promotions to a given item.
   * @param {Object} item - The item to which the promotions will be applied.
   * @param {Number} item.price - The original price of the item.
   * @returns {Number} - The final price after applying all promotions.
   */
  applyPromotions(item) {
    if (typeof item.price !== 'number') {
      throw new Error('Item must have a numeric price.');
    }
    let finalPrice = item.price;
    this.promotions.forEach(promotion => {
      if (promotion.condition(item)) {
        finalPrice = promotion.discount(finalPrice);
      }
    });
    return finalPrice;
  }
}

// Example usage:

try {
  const promotionEngine = new PromotionEngine();

  // Adding a simple 10% discount promotion
  promotionEngine.addPromotion({
    name: '10PercentOff',
    condition: (item) => item.price > 100, // Apply if the item price is greater than 100
    discount: (price) => price * 0.9, // 10% off
  });

  // Adding a free shipping promotion for orders over 200
  promotionEngine.addPromotion({
    name: 'FreeShipping',
    condition: (item) => item.price > 200,
    discount: (price) => price - price, // Free shipping means no price change
  });

  // Applying promotions to an item
  const item = { price: 150 };
  const discountedPrice = promotionEngine.applyPromotions(item);
  console.log(`The discounted price is: ${discountedPrice}`);

} catch (error) {
  console.error('Error in Promotion Engine:', error.message);
}
