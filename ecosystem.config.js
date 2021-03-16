module.exports = {
  apps : [{
    name: 'node-webapp',
    script: 'server/index.js',
    watch: ["server"],
    watch_delay: 1000,
    env: {
      "NODE_ENV": "development",
      "PORT": 3000
    },
    env_production : {
      "NODE_ENV": "production",
      "PORT": 8080
    }
  }],
};
