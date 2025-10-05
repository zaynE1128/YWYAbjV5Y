// 代码生成时间: 2025-10-05 17:51:41
 * Numerical Integration Calculator
 * This module provides a simple numerical integration calculator 
 * using the trapezoidal rule for approximating the definite integral.
 * 
 * @module numericalIntegrationCalculator
 */

// Import required modules
const { TrapezoidalRule } = require('./trapezoidalRule'); // Assuming a separate module for trapezoidal rule

/**
 * Numerical Integration Calculator
 * Calculates the definite integral of a function using the trapezoidal rule.
 * 
 * @param {Function} func - The function to integrate.
 * @param {number} a - The lower limit of integration.
 * @param {number} b - The upper limit of integration.
 * @param {number} n - The number of subintervals for the trapezoidal rule.
 * @returns {number} The approximated value of the definite integral.
 */
function numericalIntegrationCalculator(func, a, b, n) {
    // Error handling for invalid parameters
    if (typeof func !== 'function') {
        throw new Error('The first argument must be a function.');
    }
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('The second and third arguments must be numbers.');
    }
    if (typeof n !== 'number' || n <= 0) {
        throw new Error('The fourth argument must be a positive integer.');
    }

    // Initialize the trapezoidal rule calculator
    const trapezoidalRuleCalculator = new TrapezoidalRule(func, a, b, n);

    // Perform the integration
    const result = trapezoidalRuleCalculator.calculate();

    // Return the result
    return result;
}

// Export the calculator function
module.exports = {
    numericalIntegrationCalculator
};