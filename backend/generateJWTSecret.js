const crypto = require('crypto');

// Function to generate a JWT secret
function generateJWTSecret() {
    return crypto.randomBytes(32).toString('hex');
}

// Generate and print the JWT secret
const jwtSecret = generateJWTSecret();
console.log('Generated JWT Secret:', jwtSecret);
