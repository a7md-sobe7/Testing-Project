const fs = require('fs');
const path = require('path');

const dirs = [
    'cypress',
    'cypress/e2e',
    'cypress/fixtures',
    'cypress/support'
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});

if (!fs.existsSync('cypress/support/e2e.js')) {
    fs.writeFileSync('cypress/support/e2e.js', "import './commands'");
}
if (!fs.existsSync('cypress/support/commands.js')) {
    fs.writeFileSync('cypress/support/commands.js', "");
}
