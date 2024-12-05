import { defineEventHandler } from 'h3';
import pidusage from 'pidusage';

const pid = process.pid;

export default defineEventHandler(async () => {
  try {
    const stats = await pidusage(pid);
    return {
      cpu: stats.cpu.toFixed(2),
      memory: (stats.memory / 1024 / 1024).toFixed(2),
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      error: 'Unable to fetch CPU usage',
    };
  }
});
