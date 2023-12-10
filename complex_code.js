/* 
 * Filename: complex_code.js
 * Description: This code is a complex simulation of a banking system that includes multiple classes
 * and demonstrates various advanced concepts in JavaScript such as inheritance, static methods, modules, etc.
 */

// Define a module for the banking system
var BankingSystem = (function() {

    // Define the Account class
    class Account {
        constructor(accountNumber, accountHolder) {
            this.accountNumber = accountNumber;
            this.accountHolder = accountHolder;
            this.balance = 0;
        }

        deposit(amount) {
            this.balance += amount;
        }

        withdraw(amount) {
            if (this.balance >= amount) {
                this.balance -= amount;
            } else {
                console.log('Insufficient balance!');
            }
        }

        static getAccountsCount() {
            return Account.accountsCount;
        }
    }

    Account.accountsCount = 0;

    // Define the SavingsAccount class that extends Account
    class SavingsAccount extends Account {
        constructor(accountNumber, accountHolder) {
            super(accountNumber, accountHolder);
            this.interestRate = 2.5;
        }

        calculateInterest() {
            return (this.balance * this.interestRate) / 100;
        }
    }

    // Define the CurrentAccount class that extends Account
    class CurrentAccount extends Account {
        constructor(accountNumber, accountHolder) {
            super(accountNumber, accountHolder);
            this.overdraftLimit = 5000;
        }

        withdraw(amount) {
            if (this.balance + this.overdraftLimit >= amount) {
                this.balance -= amount;
            } else {
                console.log('Exceeded overdraft limit!');
            }
        }
    }

    // Define the Bank class
    class Bank {
        constructor(bankName) {
            this.bankName = bankName;
            this.accounts = [];
        }

        addAccount(account) {
            this.accounts.push(account);
            Account.accountsCount++;
        }

        getAccountsCount() {
            return this.accounts.length;
        }

        getTotalDepositAmount() {
            let total = 0;
            for (let i = 0; i < this.accounts.length; i++) {
                total += this.accounts[i].balance;
            }
            return total;
        }
    }

    // Export the classes and functions to make them accessible from outside the module
    return {
        Account,
        SavingsAccount,
        CurrentAccount,
        Bank
    };

})();

// Usage:

// Create a bank object
var myBank = new BankingSystem.Bank('My Bank');

// Create and add accounts to the bank
var account1 = new BankingSystem.SavingsAccount(1001, 'John Doe');
var account2 = new BankingSystem.CurrentAccount(1002, 'Jane Smith');

account1.deposit(5000);
account1.withdraw(2000);

account2.deposit(10000);
account2.withdraw(15000);

myBank.addAccount(account1);
myBank.addAccount(account2);

console.log('Total Accounts: ', BankingSystem.Account.getAccountsCount());
console.log('Total Deposit Amount: ', myBank.getTotalDepositAmount());

// End of complex_code.js