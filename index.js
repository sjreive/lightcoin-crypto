class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach(function(transaction) {
      balance += transaction;
    });
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  isAllowed() {
    if ((this.value < 0) && (this.amount > this.account.balance)) {
      return false;
    }
    return true;
  }
  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this.value);
      return `Transaction of ${this.value} successful. New balance is ${this.account.balance}`;
    } else {
      return "Unable to perform transaction- insufficient funds.";
    }
  }
}


class Withdrawl extends Transaction {
  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

// let t1 = new Withdrawl(50.25, myAccount);
// t1.commit();
// console.log(t1.value);
// console.log(myAccount.balance);


const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawl(1.00, myAccount);
console.log('Commit result:', t1.commit());

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawl(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
