"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingURL = pingURL;
const axios_1 = __importDefault(require("axios"));
async function pingURL(url) {
    const start = performance.now();
    try {
        const response = await axios_1.default.get(url, {
            timeout: 5000
        });
        const end = performance.now();
        return {
            status: 'UP',
            latency: Math.round(end - start),
            statusCode: response.status
        };
    }
    catch (error) {
        return {
            status: 'DOWN',
            latency: 0,
            statusCode: error.response?.status || 0
        };
    }
}
