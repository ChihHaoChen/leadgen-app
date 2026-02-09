# Lead Generation App - Development Instructions

## Project Overview
This is a Next.js lead generation system for martial arts dojos. Each dojo gets a subdomain landing page (e.g., espada.leadersdojo.co) that captures trial class requests.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL (raw SQL, no ORM)
- Docker for deployment

## Key Architecture Decisions
- **No Prisma**: We use raw SQL with `pg` library for simplicity
- **Subdomain routing**: `app/[subdomain]/page.tsx` handles all dojo landing pages
- **Single template**: One landing page design for all dojos, populated from database
- **n8n integration**: Form submissions trigger n8n webhook for SMS/email automation

## Database Schema
```sql
-- dojos table: stores dojo information
CREATE TABLE dojos (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  subdomain VARCHAR(100) UNIQUE,
  address TEXT,
  phone VARCHAR(50),
  email_from VARCHAR(255),
  twilio_account_sid VARCHAR(255),
  twilio_auth_token VARCHAR(255),
  twilio_phone_number VARCHAR(50),
  created_at TIMESTAMP
);

-- leads table: stores trial class requests
CREATE TABLE leads (
  id UUID PRIMARY KEY,
  dojo_id UUID REFERENCES dojos(id),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  experience_level VARCHAR(50),
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## File Structure
```
app/
├── [subdomain]/page.tsx     # Landing page for each dojo
├── api/
│   ├── submit-lead/route.ts # Form submission handler
│   └── health/route.ts      # Health check endpoint
├── thank-you/page.tsx       # Post-submission page
lib/
├── db.ts                     # PostgreSQL client
├── types.ts                  # TypeScript interfaces
```

## Development Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
docker build -t leadgen-app .  # Build Docker image
```

## Environment Variables
```
DATABASE_URL=postgresql://user:pass@host:5432/leadgen
N8N_WEBHOOK_URL=http://n8n:5678/webhook/new-lead
NODE_ENV=development|production
NEXT_PUBLIC_API_URL=https://espada.leadersdojo.co
```

## Code Style Guidelines
- Use TypeScript for all new files
- Prefer async/await over promises
- Use Tailwind utility classes (no custom CSS)
- Keep components functional (no classes)
- Write SQL queries inline (no query builder)

## When Making Changes
1. Always test form submission locally
2. Check that subdomain routing works
3. Verify database connection in health endpoint
4. Test thank-you page redirect

## Common Tasks

### Adding a New Dojo
1. Insert into database:
```sql
INSERT INTO dojos (name, subdomain, address, phone, email_from)
VALUES ('New Dojo', 'new-dojo', 'Address', 'Phone', 'email@dojo.com');
```
2. Add subdomain to nginx config on VPS
3. Add DNS A record

### Debugging Form Issues
- Check `/api/health` endpoint first
- Verify DATABASE_URL is correct
- Check n8n webhook is accessible
- Look at Docker logs: `docker logs leadgen-app`

### Deploying
- Push to master branch → GitHub Actions auto-deploys
- Manual: `docker-compose pull leadgen-app && docker-compose up -d leadgen-app`
```

## Step 4: Configure Cursor

Create `.cursorrules` in your repo:
```
# Lead Generation App - Cursor Rules

## Code Style
- TypeScript strict mode
- Functional React components only
- Tailwind CSS for all styling
- Raw SQL queries (no ORM)
- Async/await for all promises

## Naming Conventions
- Files: kebab-case (submit-lead.ts)
- Components: PascalCase (ThankYouPage)
- Functions: camelCase (getDojo)
- Database tables: snake_case (dojo_id)

## Import Order
1. React/Next.js imports
2. Third-party libraries
3. Local utilities (@/lib)
4. Local types (@/lib/types)
5. Relative imports

## Database Queries
- Always use parameterized queries ($1, $2)
- Include error handling with try/catch
- Return null for not found, don't throw

## API Routes
- Always validate input
- Return proper HTTP status codes
- Log errors with context
- Handle database errors gracefully
