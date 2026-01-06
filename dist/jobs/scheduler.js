"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startScheduler = startScheduler;
const node_cron_1 = __importDefault(require("node-cron"));
const MonitorService_1 = require("../services/MonitorService");
const monitorService = new MonitorService_1.MonitorService();
const TARGETS = [
    'https://google.com',
    'https://github.com',
    'https://discord.com'
];
function startScheduler() {
    console.log('Scheduler iniciado: Monitorando a cada 1 minuto...');
    node_cron_1.default.schedule('*/1 * * * *', async () => {
        console.log('\n--- 🔎 Iniciando verificação automática ---');
        for (const url of TARGETS) {
            const log = await monitorService.execute(url);
            const icon = log.status === 'UP' ? '✅' : '🔴';
            console.log(`${icon} [${log.status}] ${log.url} - ${log.latency}ms`);
        }
    });
}
