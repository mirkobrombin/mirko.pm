import build from './build.js';
import { watch } from 'chokidar';
import liveServer from 'live-server';

/**
 * Watch source files and rebuild on changes.
 */
async function start() {
  await build();
  liveServer.start({ root: 'dist', watch: ['dist'] });
  watch(['src/**/*', 'assets/**/*', 'uploads/**/*', 'site.yml'])
    .on('change', async () => {
      try { await build(); } catch (err) { console.error(err); }
    });
}

start().catch(err => { console.error(err); process.exit(1); });
