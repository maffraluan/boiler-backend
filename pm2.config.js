require('dotenv').config()
const path = require('path')

module.exports = {
  apps: [
    {
      name: process.env.PM2_NAME_APP,
      script: process.env.PM2_SCRIPT,
      watch: process.env.PM2_WATCH === 'true',
      ignore_watch: ['node_modules', 'logs'],
      exec_mode: process.env.EXEC_MODE,
      instances: process.env.INSTANCES,
      max_memory_restart: '400M',
      node_args: '--max-old-space-size=8000',
      cwd: process.env.PM2_CWD || path.resolve(__dirname, 'app'),
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        USER: process.env.PM2_USER,
        DB_PORT: process.env.DB_PORT,
        DATABASE_URL: process.env.DATABASE_URL,
        COMMENT: process.env.COMMENT,
        REVISION: process.env.REVISION,
        BRANCH: process.env.BRANCH,
        REMOTE_URL: process.env.REMOTE_URL,
        NODE_VERSION: process.version,
      },
      namespace: 'boiler-backend',
      restart_delay: 5000,
      metadata: {
        last_update: new Date().toISOString(),
        watch_reload: process.env.PM2_WATCH === 'true' ? 'enabled' : 'disabled',
      },
    },
  ],
}
