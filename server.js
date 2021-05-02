const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// dynamic port allocation
const PORT = process.env.PORT || 3001;
let app = express();
// tells port to use middleware from public
app.use(express.static('public'));

// tells port it has to dig deep because there may be nested arrs in json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// makes port operate off of external files routers
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// begins server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});