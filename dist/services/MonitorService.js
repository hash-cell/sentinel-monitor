"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorService = void 0;
const metrics_1 = require("../lib/metrics");
const prisma_1 = require("../lib/prisma");
const pinger_1 = require("../utils/pinger");
class MonitorService {
    async execute(url) {
        const result = await (0, pinger_1.pingURL)(url);
        metrics_1.checkCounter.inc({
            url: url,
            status: result.status
        });
        metrics_1.latencyGauge.set({
            url: url,
        }, result.latency);
        const log = await prisma_1.prisma.monitorLog.create({
            data: {
                url: url,
                status: result.status,
                latency: result.latency,
                statusCode: result.statusCode
            }
        });
        return log;
    }
}
exports.MonitorService = MonitorService;
