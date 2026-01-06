import axios from "axios";

interface PingResult {
    status: 'UP' | 'DOWN';
    latency: number;
    statusCode: number;
}

export async function pingURL(url: string): Promise<PingResult> {
    const start = performance.now();

    try {
        const response = await axios.get(url, {
            timeout: 5000
        });

        const end = performance.now();

        return {
            status: 'UP',
            latency: Math.round(end - start),
            statusCode: response.status
        };

    } catch(error: any) {
        return {
            status: 'DOWN',
            latency: 0,
            statusCode: error.response?.status || 0
        };
    }
}