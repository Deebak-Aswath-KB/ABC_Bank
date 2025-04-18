const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '717822Z108',
    database: 'abc_bank'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


// Customer table
// API to fetch ALL Customer Data
app.get('/customer', (req, res) => {
    const query = 'SELECT * FROM customers';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            console.log('Query result:', results);

            return;
        }
        res.json(results);
    });
});
 
// API to fetch details by Customer_id
app.get('/customer/:id', (req, res) => {
    const customerId = req.params.id;
    const query = 'SELECT * FROM customers WHERE Customer_id = ?';
    db.query(query, [customerId], (err, results) => {
        if (err) {
            console.error('Error fetching customer details:', err);
            res.status(500).send('Error fetching customer details');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Customer not found');
            return;
        }
        res.json(results[0]);
    });
});

//API  to create new customer
app.post('/new_customer', (req, res) => {
    const { Name, DOB, E_mail, Phone, Address, PAN } = req.body;
    const query = 'INSERT INTO Customers (Name, DOB, E_mail, Phone, Address, PAN) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [Name, DOB, E_mail, Phone, Address, PAN], (err, results) => {
        if (err) {
            console.error('Error in creating customer:', err);
            res.status(500).send('Error creating customer');
            return;
        }
        res.status(201).json({ message: 'Customer created successfully', customerId: results.insertId });
    });
});

// API to delete customer details by customerID
app.delete('/customer/delete/:id', (req, res) => {
    const customerId = req.params.id;
    const query = 'DELETE FROM customers WHERE Customer_id = ?';
  
    db.query(query, [customerId], (err, result) => {
      if (err) {
        console.error('Error deleting customer:', err);
        res.status(500).send('Error deleting customer');
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Customer not found' });
        return;
      }
  
      res.json({ message: 'Customer deleted successfully' });
    });
  });
  

//API for updating customers
app.put('/customer/update/:id', (req, res) => {
    const customerId = req.params.id;
    const { Name, DOB, E_mail, Phone, Address, PAN } = req.body;
    const query = 'UPDATE customers SET Name = ?, DOB = ?, E_mail = ?, Phone = ?, Address = ?, PAN = ? WHERE Customer_id = ?';
    db.query(query, [Name, DOB, E_mail, Phone, Address, PAN, customerId], (err, results) => {
        if (err) {
            console.error('Error updating customer:', err);
            res.status(500).send('Error updating customer');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Customer not found');
            return;
        }
        res.json({ message: 'Customer updated successfully' });
    });
});


//Account Table
// API to fetch ALL Account Data
app.get('/account', (req, res) => {
    const query = 'SELECT * FROM accounts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});

//Api to fetch account details by Account_id
app.get('/account/:id', (req, res) => {
    const accountId = req.params.id;
    const query = 'SELECT * FROM accounts WHERE Account_id = ?';
    db.query(query, [accountId], (err, results) => {
        if (err) {
            console.error('Error fetching account details:', err);
            res.status(500).send('Error fetching account details');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Account not found');
            return;
        }
        res.json(results[0]);
    });
});

//API to create new account
app.post('/new_account', (req, res) => {
    const { Account_type, Balance, Customer_id } = req.body;
    const query = 'INSERT INTO accounts (Account_type, Balance, Customer_id) VALUES (?, ?, ?)';
    db.query(query, [Account_type, Balance, Customer_id], (err, results) => {
        if (err) {
            console.error('Error in creating account:', err);
            res.status(500).send('Error creating account');
            return;
        }
        res.status(201).json({ message: 'Account created successfully', accountId: results.insertId });
    });
});

//API to Delete account details by Account_id
app.delete('/account/delete/:id', (req, res) => {
    const accountId = req.params.id;
    const query = 'DELETE FROM accounts WHERE Account_id = ?';
  
    db.query(query, [accountId], (err, result) => {
      if (err) {
        console.error('Error deleting account:', err);
        res.status(500).send('Error deleting account');
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ message: 'Account not found' });
        return;
      }
  
      res.json({ message: 'Account deleted successfully' });
    });
  });

//API to fetch all the accounts of the customer by customerID
app.get('/customer/:id/accounts', (req, res) => {
    const customerId = req.params.id;
    const query = 'SELECT * FROM accounts WHERE Customer_id = ?';
    db.query(query, [customerId], (err, results) => {
        if (err) {
            console.error('Error fetching accounts:', err);
            res.status(500).send('Error fetching accounts');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Account not found');
            return;
        }
        res.json(results);
    });
});


//Transaction table
//API to fetch all transactions
app.get('/Transactions', (req, res) => {
    const query = 'SELECT * FROM Transactions';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching transactions:', err);
            res.status(500).send('Error fetching transactions');
            return;
        }
        res.json(results);
    });
});

//Api to fetch transactions by transaction_id
app.get('/Transactions/:id', (req, res) => {
    const transactionId = req.params.id;
    const query = 'SELECT * FROM Transactions WHERE Transaction_id = ?';
    db.query(query, [transactionId], (err, results) => {
        if (err) {
            console.error('Error fetching transaction details:', err);
            res.status(500).send('Error fetching transaction details');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Transaction not found');
            return;
        }
        res.json(results[0]);
    });
});


//API to fetch all transaction details by Account_id
app.get('/Transactions/account/:id', (req, res) => {
    const accountId = req.params.id;
    const query = 'SELECT * FROM Transactions WHERE Account_id = ?';
    db.query(query, [accountId], (err, results) => {
        if (err) {
            console.error('Error fetching transaction details:', err);
            res.status(500).send('Error fetching transaction details');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('No transactions found for the given account');
            return;
        }
        res.json(results);
    });
});


//API to create new transaction
app.post('/new_transaction', (req, res) => {
    const { Transaction_id,Account_id,Type, Amount, Description } = req.body;
    const query = 'INSERT INTO Transactions (Transaction_id,Account_id,Type, Amount,Description ) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [Transaction_id,Account_id,Type, Amount, Description], (err, results) => {
        if (err) {
            console.error('Error in creating transaction:', err);
            res.status(500).send('Error creating transaction');
            return;
        }
        res.status(201).json({ message: 'Transaction created successfully', Transaction_id: results.insertId });
    });
});

//API to fetch all details based on type of transaction

app.get('/Transactions/type/:type', (req, res) => {
    const transactionType = req.params.type;
    const query = 'SELECT * FROM Transactions WHERE Type = ?';
    db.query(query, [transactionType], (err, results) => {
        if (err) {
            console.error('Error fetching transaction details:', err);
            res.status(500).send('Error fetching transaction details');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('No transactions found for the given type');
            return;
        }
        res.json(results);
    });
});

// Loan Table
// API to fetch ALL Loan Data
app.get('/loan', (req, res) => {
    const query = 'SELECT * FROM loans';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).send('Error fetching data');
            return;
        }
        res.json(results);
    });
});
// API to fetch loan details by Loan_id

app.get('/loan/:id', (req, res) => {
    const loanId = req.params.id;
    const query = 'SELECT * FROM loans WHERE Loan_id = ?';
    db.query(query, [loanId], (err, results) => {
        if (err) {
            console.error('Error fetching loan details:', err);
            res.status(500).send('Error fetching loan details');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Loan not found');
            return;
        }
        res.json(results[0]);
    });
});

// API to fetch loan details of the customer using customer_ID
app.get('/customer/:id/loan', (req, res) => {
    const customerId = req.params.id;
    const query = 'SELECT * FROM loans WHERE Customer_id = ?';
    db.query(query, [customerId], (err, results) => {
        if (err) {
            console.error('Error fetching loan details:', err);
            res.status(500).send('Error fetching loan details');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Loan not found');
            return;
        }
        res.json(results);
    });
});

// API to create new loan with the fields Customer_id Loan_type,Amount,Interest_rate
app.post('/new_loan', (req, res) => {
    const { Customer_id, Loan_type, Amount, Interest_rate } = req.body;
    const query = 'INSERT INTO loans (Customer_id, Loan_type, Amount, Interest_rate) VALUES (?, ?, ?, ?)';
    db.query(query, [Customer_id, Loan_type, Amount, Interest_rate], (err, results) => {
        if (err) {
            console.error('Error in creating loan:', err);
            res.status(500).send('Error creating loan');
            return;
        }
        res.status(201).json({ message: 'Loan created successfully', loanId: results.insertId });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});