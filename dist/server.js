"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduler_1 = require("./jobs/scheduler");
const metrics_1 = require("./lib/metrics");
const fastify_1 = __importDefault(require("fastify"));
const app = (0, fastify_1.default)({ logger: true });
app.get('/', async () => {
    return { message: 'Sentinel Monitor API is running!' };
});
app.get('/metrics', async (request, reply) => {
    reply.header('Content-Type', metrics_1.register.contentType);
    return metrics_1.register.metrics();
});
const start = async () => {
    try {
        await app.listen({
            port: 3333,
            host: '0.0.0.0'
        });
        console.log('Server running at http://localhost:3333');
        (0, scheduler_1.startScheduler)();
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
start();
