
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projectRoot = path.resolve(process.cwd());

function verifyFile(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return false;
    }

    // Check if file is readable
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
    } catch (err) {
      console.error(`❌ File not readable: ${filePath}`);
      return false;
    }

    // Check for syntax errors in JS/JSX files
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      try {
        execSync(`node -c ${filePath}`, { stdio: 'pipe' });
      } catch (err) {
        console.error(`❌ Syntax error in: ${filePath}`);
        console.error(err.message);
        return false;
      }
    }

    // Check for required exports in JS/JSX files
    if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (!content.includes('export default') && !content.includes('export const')) {
        console.warn(`⚠️ No exports found in: ${filePath}`);
      }
    }

    console.log(`✅ Verified: ${filePath}`);
    return true;
  } catch (err) {
    console.error(`❌ Error verifying ${filePath}:`, err.message);
    return false;
  }
}

function verifyDirectory(dirPath) {
  try {
    const files = fs.readdirSync(dirPath);
    let allValid = true;

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (!verifyDirectory(fullPath)) {
          allValid = false;
        }
      } else {
        if (!verifyFile(fullPath)) {
          allValid = false;
        }
      }
    });

    return allValid;
  } catch (err) {
    console.error(`❌ Error verifying directory ${dirPath}:`, err.message);
    return false;
  }
}

function runVerification() {
  console.log('🚀 Starting file verification...\n');
  const startTime = Date.now();

  const result = verifyDirectory(projectRoot);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`\n⏱️ Verification completed in ${duration} seconds`);
  console.log(result ? '