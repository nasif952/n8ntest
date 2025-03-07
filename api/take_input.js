const fs = require('fs');
const crypto = require('crypto');
const readline = require('readline');

// Function to hash a password using SHA-256
function hashPasswordSHA256(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt user for account ID and password
rl.question('Enter Account ID: ', (accountid) => {
    rl.question('Enter Password: ', (password) => {
        const hashedPassword = hashPasswordSHA256(password);
        
        const outputData = {
            ACCOUNTID: parseInt(accountid, 10),
            ACCOUNTPASSWORD: hashedPassword
        };
        
        // Write to output.json
        fs.writeFileSync('output.json', JSON.stringify(outputData, null, 4));
        console.log('Account details saved to output.json');

        rl.close();
    });
});
