// Enhanced version suggestion
const fs = require('fs').promises; // Use promises version
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const readline = require('readline');

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function saveCredentials() {
    try {
        const accountid = await new Promise(resolve => 
            rl.question('Enter Account ID: ', resolve)
        );
        
        const password = await new Promise(resolve => 
            rl.question('Enter Password: ', resolve)
        );

        const hashedPassword = await hashPassword(password);
        
        const outputData = {
            ACCOUNTID: parseInt(accountid, 10),
            ACCOUNTPASSWORD: hashedPassword
        };
        
        await fs.writeFile('output.json', JSON.stringify(outputData, null, 4));
        console.log('Account details saved to output.json');
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close();
    }
}

saveCredentials();
