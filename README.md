# Lead Generation App

Automated lead capture system for martial arts dojos.

## Features
- Subdomain-based landing pages for each dojo
- Automated SMS/email follow-up via n8n
- PostgreSQL for lead storage
- Docker-based deployment

## Development

### Prerequisites
- Node.js 18+
- Docker
- PostgreSQL

### Setup
```bash
npm install
cp .env.local.example .env.local  # Configure your env vars
npm run dev
```

### Deployment
Push to `master` branch → GitHub Actions automatically deploys to VPS

## Environment Variables
See `.env.local.example` for required variables.

## Architecture
- **Frontend**: Next.js 14 (App Router)
- **Database**: PostgreSQL (raw SQL)
- **Automation**: n8n webhooks
- **Deployment**: Docker + GitHub Actions

## Adding a New Dojo
1. Insert into `dojos` table
2. Add subdomain to nginx config
3. Add DNS A record
