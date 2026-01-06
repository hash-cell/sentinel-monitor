import { request } from "node:http";
import { startScheduler } from "./jobs/scheduler";
import { pingURL } from "./utils/pinger";
import { register } from "./lib/metrics";
import fastify from "fastify";

const app = fastify({logger: true});

app.get('/', async () => {
    return { message: 'Sentinel Monitor API is running!'}
});

app.get('/metrics', async (request, reply) => {
    reply.header('Content-Type', register.contentType);
    return register.metrics();
})

const start = async() => {
    try {
        await app.listen({ 
            port: 3333, 
            host: '0.0.0.0' 
        });
        console.log('Server running at http://localhost:3333')
        
        startScheduler();

    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
start();