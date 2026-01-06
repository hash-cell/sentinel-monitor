"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.latencyGauge = exports.checkCounter = exports.register = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.register = new prom_client_1.default.Registry();
prom_client_1.default.collectDefaultMetrics({ register: exports.register });
exports.checkCounter = new prom_client_1.default.Counter({
    name: 'sentinel_check_total',
    help: 'Total de verificaçoes realizadas',
    labelNames: ['url', 'status'],
});
exports.latencyGauge = new prom_client_1.default.Gauge({
    name: 'sentinel_latency_ms',
    help: 'Latencia da ultima verificaçao em MS',
    labelNames: ['url'],
});
exports.register.registerMetric(exports.checkCounter);
exports.register.registerMetric(exports.latencyGauge);
