const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const dataFile = path.join(__dirname, 'data', 'products.json');

// Helper to read data
const readData = () => {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
};

// Helper to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 4));
    } catch (err) {
        console.error(err);
    }
};

// Routes
app.get('/', (req, res) => {
    res.send('Krishna Novelty Backend is running! Access /api/products for data.');
});

// GET all products
app.get('/api/products', (req, res) => {
    const products = readData();
    res.json(products);
});

// Upload an image
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

// POST a new product
app.post('/api/products', (req, res) => {
    const products = readData();
    const newProduct = req.body;
    
    // Generate new ID
    const maxId = products.reduce((max, p) => p.id > max ? p.id : max, 0);
    newProduct.id = maxId + 1;
    
    products.push(newProduct);
    writeData(products);
    
    res.status(201).json(newProduct);
});

// PUT (update) an existing product
app.put('/api/products/:id', (req, res) => {
    const products = readData();
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        products[index] = { ...products[index], ...req.body, id };
        writeData(products);
        res.json(products[index]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE a product
app.delete('/api/products/:id', (req, res) => {
    const products = readData();
    const id = parseInt(req.params.id);
    const newProducts = products.filter(p => p.id !== id);
    
    if (products.length !== newProducts.length) {
        writeData(newProducts);
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
