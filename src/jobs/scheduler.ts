import cron from 'node-cron';
import { MonitorService } from '../services/MonitorService';

const monitorService = new MonitorService();

const TARGETS = [
    'https://google.com',
    'https://github.com',
    'https://discord.com'
]

export function startScheduler() {
    console.log('Scheduler iniciado: Monitorando a cada 1 minuto...')

    cron.schedule('*/1 * * * *', async () => {
        console.log('\n--- 🔎 Iniciando verificação automática ---')
        
        for (const url of TARGETS) {
            const log = await monitorService.execute(url);
            
            const icon = log.status === 'UP' ? '✅' : '🔴';
            console.log(`${icon} [${log.status}] ${log.url} - ${log.latency}ms`);
        }
    });
}