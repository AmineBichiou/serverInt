const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie_reviews'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movies";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const insert = "INSERT INTO movies (movies, review) VALUES (?, ?);";
    db.query(insert, [movieName, movieReview], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete('/api/delete/:movies', (req, res) => {
    const name = req.params.movies;
    const deleteMovie = "DELETE FROM movies WHERE movies = ?";
    db.query(deleteMovie, name, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const update = "UPDATE movies SET review = ? WHERE movies = ?";
    db.query(update, [review, name], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});







app.listen(port, () => console.log(`Example app listening on port ${port}!`));
/*const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'librerie'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/getUser', (req, res) => {
    const sqlSelect = "SELECT * FROM user";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insertUser', (req, res) => {
    const login = req.body.login;
    const tel = req.body.tel;
    const join_time = req.body.join_time;
    const role = req.body.role;
    
    const insert = "INSERT INTO user (login, tel,join_time,role) VALUES (?,?,?,?);";
    db.query(insert, [login,tel,join_time,role], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete('/api/deleteUser/:login', (req, res) => {
    const name = req.body.login;
    const deleteUser = "DELETE FROM user WHERE login = ?";
    db.query(deleteUser, name, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/updateUser', (req, res) => {
    const login = req.body.login;
    const tel = req.body.tel;
    const join_time = req.body.join_time;
    const role = req.body.role;
    const id = req.body.id;
    const update = "UPDATE user SET login = ?,tel = ?,join_time = ?, role = ? WHERE id = ?";
    db.query(update, [login, tel,join_time,role,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});
app.get('/api/getSales', (req, res) => {
    const sqlSelect = "SELECT * FROM sales";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insertSales', (req, res) => {
    const name = req.body.name;
    const product = req.body.product;
    const quality = req.body.quality;
    const budget = req.body.budget;
    
    const insert = "INSERT INTO sales (name, product,quality,budget) VALUES (?,?,?,?);";
    db.query(insert, [name,product,quality,budget], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete('/api/deleteSales/:id', (req, res) => {
    const id = req.body.id;
    const deleteUser = "DELETE FROM sales WHERE id = ?";
    db.query(deleteUser, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/updateSales', (req, res) => {
    const name = req.body.name;
    const product = req.body.product;
    const quality = req.body.quality;
    const budget = req.body.budget;
    const id = req.body.id;
    const update = "UPDATE sales SET name = ?,product = ?,quality = ?, budget = ? WHERE id = ?";
    db.query(update, [name, product,quality,budget,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});
app.get('/api/getProduct', (req, res) => {
    const sqlSelect = "SELECT * FROM product";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insertProduct', (req, res) => {
    const prix = req.body.prix;
    const Qstock = req.body.Qstock;
    const description = req.body.description;
    const marque = req.body.marque;
    const name = req.body.name;

    
    const insert = "INSERT INTO product (prix, Qstock,description,marque,name) VALUES (?,?,?,?,?);";
    db.query(insert, [prix,Qstock,description,marque,name], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete('/api/deleteProduct/:name', (req, res) => {
    const name = req.body.name;
    const deleteUser = "DELETE FROM product WHERE name = ?";
    db.query(deleteUser, name, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/updateProduct', (req, res) => {
    const prix = req.body.prix;
    const Qstock = req.body.Qstock;
    const description = req.body.description;
    const marque = req.body.marque;
    const name = req.body.name;
    const id = req.body.id;
    const update = "UPDATE product SET prix = ?,Qstock = ?,description = ?, marque = ?,name = ? WHERE id = ?";
    db.query(update, [prix,Qstock,description,marque,name,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});
app.get('/api/getCategorie', (req, res) => {
    const sqlSelect = "SELECT * FROM categorie";
    db.query(sqlSelect,(err,result) => {
        res.send(result);
    });
        
    
});
app.post('/api/insertCategorie', (req, res) => {
    const description = req.body.description;
    const name = req.body.name;

    
    const insert = "INSERT INTO categorie (name,description) VALUES (?,?);";
    db.query(insert, [name,description], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send("Values inserted");
        }
    });
});
app.delete('/api/deleteCategorie/:id', (req, res) => {
    const id = req.body.id;
    const deleteUser = "DELETE FROM categorie WHERE id = ?";
    db.query(deleteUser, id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});
app.put('/api/updateCategorie', (req, res) => {
    const description = req.body.description;
    const name = req.body.name;
    const id = req.body.id;
    const update = "UPDATE categorie SET name = ?,description = ? WHERE id = ?";
    db.query(update, [name,description,id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);

        }
    });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));*/