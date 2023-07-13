const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require('pg-promise')();
const path = require('path');

const app = express();
const db = pgp('postgres://hiromu2:password@localhost:5432/mydatabase');

app.use(cors());
app.use(bodyParser.json());

// ユーザー登録
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    db.none('INSERT INTO users(name, email) VALUES($1, $2)', [name, email])
        .then(() => {
            res.status(200).json({ status: 'success', message: 'Registered successfully' });
        })
        .catch((err) => {
            res.status(500).json({ status: 'fail', message: 'Registration failed' });
        });
});

// ログイン
app.post('/api/login', (req, res) => {
    const { email } = req.body;
    db.one('SELECT * FROM users WHERE email = $1', [email])
        .then((user) => {
            res.status(200).json({ status: 'success', message: 'Logged in successfully', user });
        })
        .catch((err) => {
            res.status(500).json({ status: 'fail', message: 'Login failed' });
        });
});

// ビルド結果を提供する設定
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
