const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\gaeta\\AppData\\Roaming\\Code\\User\\History';

let latestFiles = {};

try {
    const dirs = fs.readdirSync(historyDir);
    for (const d of dirs) {
        const p = path.join(historyDir, d);
        if (fs.statSync(p).isDirectory()) {
            const entriesFile = path.join(p, 'entries.json');
            if (fs.existsSync(entriesFile)) {
                try {
                    const data = JSON.parse(fs.readFileSync(entriesFile, 'utf8'));
                    if (data.resource && data.resource.toLowerCase().includes('desktop/tcv/')) {
                        const idx = data.resource.toLowerCase().indexOf('desktop/tcv/') + 12;
                        const relPath = decodeURIComponent(data.resource.substring(idx));
                        
                        if (data.entries && data.entries.length > 0) {
                            const latestEntry = data.entries[data.entries.length - 1];
                            const backupFile = path.join(p, latestEntry.id);
                            if (fs.existsSync(backupFile)) {
                                if (!latestFiles[relPath] || latestFiles[relPath].timestamp < latestEntry.timestamp) {
                                    latestFiles[relPath] = {
                                        timestamp: latestEntry.timestamp,
                                        content: fs.readFileSync(backupFile, 'utf8')
                                    };
                                }
                            }
                        }
                    }
                } catch(e) {
                    // skip
                }
            }
        }
    }

    for (const [relPath, info] of Object.entries(latestFiles)) {
        const dest = path.join('c:\\Users\\gaeta\\Desktop\\tcv', relPath);
        const dir = path.dirname(dest);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        
        // Only recover if missing or older (for safety)
        if (!fs.existsSync(dest)) {
            fs.writeFileSync(dest, info.content);
            console.log('Recovered (Missing):', dest, new Date(info.timestamp));
        } else {
            console.log('Skipped (Exists):', dest);
        }
    }
} catch(e) {
    console.error(e);
}
console.log('Recovery finished.');
