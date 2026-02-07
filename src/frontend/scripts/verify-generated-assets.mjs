import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REQUIRED_ASSETS = [
  'envelope-textured.dim_1400x900.png',
  'dog-holding-rose.jpg',
  'lip-biting-emoji-cartoon.dim_900x1100.png',
];

const assetsDir = join(__dirname, '..', 'public', 'assets', 'generated');

console.log('🔍 Verifying required generated assets...');

const missingAssets = [];

for (const asset of REQUIRED_ASSETS) {
  const assetPath = join(assetsDir, asset);
  if (!existsSync(assetPath)) {
    missingAssets.push(asset);
  } else {
    console.log(`✅ Found: ${asset}`);
  }
}

if (missingAssets.length > 0) {
  console.error('\n❌ Build failed: Missing required assets in frontend/public/assets/generated/');
  console.error('Missing files:');
  missingAssets.forEach(asset => {
    console.error(`  - ${asset}`);
  });
  console.error('\nPlease ensure all required assets are present before building.');
  process.exit(1);
}

console.log('\n✅ All required assets verified successfully!');
