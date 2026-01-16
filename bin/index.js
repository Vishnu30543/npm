#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import pc from 'picocolors';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('create-react-express-auth')
  .description('Scaffold a MERN stack app with Auth (Vite + Express)')
  .argument('[project-name]', 'Name of the project directory')
  .option('--no-google', 'Skip wiring Google OAuth (omit buttons/provider)')
  .action(async (projectName, options) => {
    try {
      if (!projectName) {
        console.error(pc.red('Please specify the project name:'));
        console.log(`  ${pc.cyan('npx create-react-express-auth')} ${pc.green('<project-name>')}`);
        process.exit(1);
      }

      const projectPath = path.resolve(process.cwd(), projectName);
      const templatePath = path.join(__dirname, '../template');

      if (fs.existsSync(projectPath)) {
        console.error(pc.red(`Error: Directory ${projectName} already exists.`));
        process.exit(1);
      }

      console.log(pc.blue(`\nCreating a new MERN Auth app in ${pc.bold(projectPath)}...`));

      await fs.copy(templatePath, projectPath);

      await renameIfExists(path.join(projectPath, '_gitignore'), path.join(projectPath, '.gitignore'));
      await renameIfExists(path.join(projectPath, 'client', '_gitignore'), path.join(projectPath, 'client', '.gitignore'));
      await renameIfExists(path.join(projectPath, 'server', '_gitignore'), path.join(projectPath, 'server', '.gitignore'));

          // Create a default .env file in the server folder
          const envPath = path.join(projectPath, 'server', '.env');
          if (!fs.existsSync(envPath)) {
            await fs.writeFile(envPath, 'PORT=5000\nMONGO_URI=mongodb://localhost:27017/test\nJWT_SECRET=dev_jwt_secret\nGOOGLE_CLIENT_ID=your_google_client_id_here\nCLIENT_URL=http://localhost:5173\nSMTP_HOST=smtp.gmail.com\nSMTP_PORT=587\nSMTP_EMAIL=your_email@gmail.com\nSMTP_PASSWORD=your_app_specific_password_here\nFROM_NAME=Support Team\n');
            console.log(pc.green('Created default .env file in server folder.'));
          }

        // Create a default .env file in the client folder
        const clientEnvPath = path.join(projectPath, 'client', '.env');
        if (!fs.existsSync(clientEnvPath)) {
          await fs.writeFile(clientEnvPath, 'VITE_API_URL=http://localhost:5000\nVITE_GOOGLE_CLIENT_ID=your_web_oauth_client_id_here\n');
          console.log(pc.green('Created default .env file in client folder.'));
        }

          // Create a default .env file in the server folder (alternative content)
          const envPath2 = path.join(projectPath, 'server', '.env');
          if (!fs.existsSync(envPath2)) {
            await fs.writeFile(envPath2, 'MONGO_URI=your_mongo_uri_here\nJWT_SECRET=your_jwt_secret_here\n');
            console.log(pc.green('Created default .env file in server folder.'));
          }

      // Commander sets --no-google default to true; use source to know if user passed a flag.
      const googleSource = program.getOptionValueSource('google');
      let useGoogle = options.google;
      if (googleSource === 'default') {
        useGoogle = await askYesNo('Include Google Auth? (Y/n): ', true);
      }

      if (!useGoogle) {
        const overlayPath = path.join(__dirname, '../template/google-off');
        await applyOverlay(projectPath, overlayPath);
        console.log(pc.yellow('Google auth wiring removed.'));
      }

      // Drop overlay folder from the generated project to keep it clean.
      await fs.remove(path.join(projectPath, 'google-off'));

      console.log(pc.green('\nSuccess! Created project structure.'));
      console.log('\nNext steps:');
      console.log(`  ${pc.cyan(`cd ${projectName}`)}`);

      console.log(pc.yellow('\n1. Setup Backend:'));
      console.log(`  ${pc.cyan('cd server')}`);
      console.log(`  ${pc.cyan('npm install')}`);
      console.log(`  ${pc.cyan('cp .env.example .env')}  (and configure MONGO_URI)`);
      console.log(`  ${pc.cyan('npm run dev')}`);

      console.log(pc.yellow('\n2. Setup Frontend:'));
      console.log(`  ${pc.cyan('open new terminal')}`);
      console.log(`  ${pc.cyan(`cd ${projectName}/client`)}`);
      console.log(`  ${pc.cyan('npm install')}`);
      console.log(`  ${pc.cyan('npm run dev')}`);

      console.log(pc.magenta('\nHappy Coding! 🚀\n'));
    } catch (error) {
      console.error(pc.red('Error creating project:'), error);
      process.exit(1);
    }
  });

program.parse(process.argv);

async function askYesNo(question, defaultYes = true) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const hint = defaultYes ? 'Y/n' : 'y/N';
    rl.question(`${question} ${hint} `, (answer) => {
      rl.close();
      const normalized = answer.trim().toLowerCase();
      if (!normalized) return resolve(defaultYes);
      if (['y', 'yes'].includes(normalized)) return resolve(true);
      if (['n', 'no'].includes(normalized)) return resolve(false);
      return resolve(defaultYes);
    });
  });
}

async function renameIfExists(from, to) {
  if (await fs.pathExists(from)) {
    await fs.move(from, to, { overwrite: true });
  }
}

async function applyOverlay(targetPath, overlayPath) {
  if (!(await fs.pathExists(overlayPath))) return;
  await fs.copy(overlayPath, targetPath, { overwrite: true });
}
