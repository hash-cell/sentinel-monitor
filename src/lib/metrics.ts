import client from 'prom-client';

export const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const checkCounter = new client.Counter({
    name: 'sentinel_check_total',
    help: 'Total de verificaçoes realizadas',
    labelNames: ['url', 'status'],
});

export const latencyGauge = new client.Gauge({
    name: 'sentinel_latency_ms',
    help: 'Latencia da ultima verificaçao em MS',
    labelNames: ['url'],
});

register.registerMetric(checkCounter);
register.registerMetric(latencyGauge);