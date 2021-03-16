# Node.js Legacy Web App

## Starten der Anwendung

### Development Mode

Wähle eine der Varianten:

* ```npm start```
* ```pm2 start```

### Production Mode

Zunächst den Client erstellen: ```npm run build```

Und anschließend

* ```npm start``` mit NODE_ENV=production (zum Beispiel über ```.env``` gesetzt)
* ```pm2 start ecosystem.config.js --env=production```
