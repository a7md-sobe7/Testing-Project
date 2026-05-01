const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// --- In-Memory Data ---
const USERS = [
    { username: 'admin', password: 'password123', role: 'admin' },
    { username: 'staff', password: 'staffpassword', role: 'staff' }
];

let ROOMS = [
    { id: 101, type: 'Single', price: 100, status: 'Available' },
    { id: 102, type: 'Double', price: 150, status: 'Occupied' },
    { id: 201, type: 'Suite', price: 300, status: 'Available' }
];

let BOOKINGS = [
    { id: 1, guestName: 'John Doe', roomNumber: 102, checkIn: '2025-12-20' },
    { id: 2, guestName: 'Jane Smith', roomNumber: 201, checkIn: '2025-12-25' }
];

// --- Authentication ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true, token: 'fake-jwt-token', role: user.role });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// --- CRUD: Rooms ---
app.get('/api/rooms', (req, res) => {
    res.json(ROOMS);
});

app.post('/api/rooms', (req, res) => {
    const { number, type, price, status } = req.body;
    const newRoom = { id: parseInt(number), type, price: parseFloat(price), status };
    ROOMS.push(newRoom);
    res.json({ success: true, room: newRoom });
});

app.put('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    const index = ROOMS.findIndex(r => r.id == id);
    if (index !== -1) {
        ROOMS[index] = { ...ROOMS[index], ...req.body };
        res.json({ success: true, room: ROOMS[index] });
    } else {
        res.status(404).json({ success: false, message: 'Room not found' });
    }
});

app.delete('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    ROOMS = ROOMS.filter(r => r.id != id);
    res.json({ success: true });
});

// --- Search: Guests ---
app.get('/api/guests', (req, res) => {
    const { query } = req.query;
    if (!query) return res.json(BOOKINGS);
    
    const results = BOOKINGS.filter(b => 
        b.guestName.toLowerCase().includes(query.toLowerCase())
    );
    res.json(results);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Hotel Management System running on http://localhost:${PORT}`);
});
