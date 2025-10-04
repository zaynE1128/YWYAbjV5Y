// 代码生成时间: 2025-10-04 20:08:45
const fs = require('fs');

// 薪资计算器类
class SalaryCalculator {
  // 构造函数
  constructor(baseSalary, taxRate) {
    this.baseSalary = baseSalary;
    this.taxRate = taxRate;
  }

  // 计算税后薪资
  calculateNetSalary() {
    if (this.baseSalary < 0 || this.taxRate < 0 || this.taxRate > 1) {
      throw new Error('Base salary and tax rate must be non-negative and tax rate must be between 0 and 1.');
    }
    const tax = this.baseSalary * this.taxRate;
    return this.baseSalary - tax;
  }

  // 加班费计算
  calculateOvertimePay(hours, rate) {
    if (hours < 0 || rate < 0) {
      throw new Error('Overtime hours and rate must be non-negative.');
    }
    return hours * rate;
  }
}

// 使用示例
try {
  const calculator = new SalaryCalculator(5000, 0.2);
  const netSalary = calculator.calculateNetSalary();
  const overtimePay = calculator.calculateOvertimePay(5, 20);
  console.log('Net Salary:', netSalary);
  console.log('Overtime Pay:', overtimePay);
} catch (error) {
  console.error('Error:', error.message);
}
