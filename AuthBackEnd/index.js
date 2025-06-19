const express = require('express');
const { dbConnect } = require('./config/dbConnect');
const authRouter = require('./routes/authRoutes');
require('dotenv').config();
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*', 
  credentials: true
}));

app.use(express.json());
app.use('/api/v1', authRouter);

app.listen(PORT, () => {
    dbConnect();
    console.log(`Server is active on http://localhost:${PORT}`);
});