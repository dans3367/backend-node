
import crypto from 'crypto';
import jwt from "jsonwebtoken";

// Example usage
const header = {
    alg: 'HS256',  // Algorithm used for signing, e.g., HMAC SHA-256
    typ: 'JWT'     // Type of the token
};

export const decodejwtToken = (token) => {
    if (!token) {
        return {};
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function base64UrlEncode(str) {
    let base64 = Buffer.from(str).toString('base64');
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

export function verifyJWT(token) {
    

    let payload = {};

    try {
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
           if(!err){
             payload = decoded;
           }
        })

        return {payload};
        

    } catch (e) {
        console.log('errrr', e.message)

    }


    return {
        header,
        payload
    };
}

export function generateJWT(payload) {
    // Step 1: Encode the header and payload
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));

    // Step 2: Create the signature
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto.createHmac('sha256', secret).update(signatureInput).digest('base64');
    const encodedSignature = base64UrlEncode(signature);

    // Step 3: Combine the encoded parts to create the JWT
    const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
    return jwt;
}