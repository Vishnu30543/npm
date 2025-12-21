#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import pc from 'picocolors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name('create-react-express-auth')
  .description('Scaffold a MERN stack app with Auth (Vite + Express)')
  .argument('[project-name]', 'Name of the project directory')
  .action(async (projectName) => {
    try {
      if (!projectName) {
        console.error(pc.red('Please specify the project name:'));
        console.log(`  ${pc.cyan('npx create-react-express-auth')} ${pc.green('<project-name>')}\n`);
        process.exit(1);
      }

      const projectPath = path.resolve(process.cwd(), projectName);
      const templatePath = path.join(__dirname, '../template');

      if (fs.existsSync(projectPath)) {
        console.error(pc.red(`Error: Directory ${projectName} already exists.`));
        process.exit(1);
      }

      console.log(pc.blue(`\nCreating a new MERN Auth app in ${pc.bold(projectPath)}...`));

      // Copy template files
      await fs.copy(templatePath, projectPath);

      // Rename _gitignore to .gitignore
      const gitignorePath = path.join(projectPath, '_gitignore');
      const dotGitignorePath = path.join(projectPath, '.gitignore');
      
      if (fs.existsSync(gitignorePath)) {
        await fs.move(gitignorePath, dotGitignorePath);
      }

      // Rename client/_gitignore to client/.gitignore if it exists
      const clientGitignore = path.join(projectPath, 'client', '_gitignore');
      const clientDotGitignore = path.join(projectPath, 'client', '.gitignore');
      if (fs.existsSync(clientGitignore)) {
        await fs.move(clientGitignore, clientDotGitignore);
      }

       // Rename server/_gitignore to server/.gitignore if it exists
      const serverGitignore = path.join(projectPath, 'server', '_gitignore');
      const serverDotGitignore = path.join(projectPath, 'server', '.gitignore');
      if (fs.existsSync(serverGitignore)) {
        await fs.move(serverGitignore, serverDotGitignore);
      }

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
