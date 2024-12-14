import fs from 'fs';

function getConfig() {
  const configFile = './server/appsettings.json';

  if (fs.existsSync(configFile)) {
    const configContent = fs.readFileSync(configFile, 'utf8');
    return JSON.parse(configContent);
  }
}

export const config = getConfig();
