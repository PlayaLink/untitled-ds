# Vercel Deployment Setup

This repository is configured to automatically deploy to Vercel on every push to the `main` branch.

## Initial Setup

### 1. Link Project to Vercel

If you haven't already, link this project to Vercel:

```bash
npm i -g vercel
vercel link
```

This creates `.vercel/project.json` with your project and org IDs.

### 2. Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Create a new token
3. Copy the token value

### 3. Configure GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

- **VERCEL_TOKEN**: Your Vercel API token from step 2
- **VERCEL_ORG_ID**: Get from `.vercel/project.json` (the `orgId` field)
- **VERCEL_PROJECT_ID**: Get from `.vercel/project.json` (the `projectId` field)

### 4. Push to Main

Once configured, every push to `main` will automatically build and deploy your Storybook to Vercel.

## Manual Deployment

To deploy manually:

```bash
npm run build
vercel --prod
```
