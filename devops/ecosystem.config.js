module.exports = {
  apps : [{
    name: 'server',
    cwd: '/home/gestordeobra/repositories/basis/gestor-de-obra-integral/',
    script: './src/server.js',
    env: {
      MONIT_LOG_NAME: 'SERVER',
    },
  }, {
    name: 'test-server',
    cwd: '/home/gestordeobra/repositories/basis/test-gestor-de-obra-integral/',
    script: './src/server.js',
    env: {
      PORT: "8081",
      MONIT_LOG_NAME: 'TEST-SERVER',
      NODE_ENV: 'production',
    },
  }],
};
