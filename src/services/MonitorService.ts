import { checkCounter, latencyGauge } from "../lib/metrics";
import { prisma } from "../lib/prisma";
import { pingURL } from "../utils/pinger";

export class MonitorService {
    async execute(url: string) {
        const result = await pingURL(url);

        checkCounter.inc({
            url: url,
            status: result.status
        });

        latencyGauge.set({
            url: url,
        }, result.latency);

        const log = await prisma.monitorLog.create({
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