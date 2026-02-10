You're working on a lead generation system for martial arts dojos. This is an MVP that captures trial class requests through subdomain landing pages.

PROJECT OVERVIEW:
- Each dojo gets a subdomain (e.g., espada.leadersdojo.co)
- Landing pages capture trial requests (name, email, phone, experience)
- Forms trigger n8n webhooks for automated SMS/email follow-up
- PostgreSQL stores dojos and leads
- Deployed via Docker to Hostinger VPS with GitHub Actions CI/CD

TECH STACK:
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS for styling
- PostgreSQL with raw SQL (no ORM/Prisma - intentional choice for simplicity)
- pnpm for package management
- Docker for deployment
- n8n for automation

KEY ARCHITECTURAL DECISIONS:
1. NO PRISMA - We use raw SQL with pg library for simplicity
2. Single template - One landing page design for all dojos, data from database
3. Subdomain routing - app/[subdomain]/page.tsx handles all dojo pages
4. Minimal Docker image - Using pnpm and multi-stage builds (~120MB)

PROJECT STRUCTURE:
app/
  [subdomain]/page.tsx       - Dynamic landing page for each dojo
  api/submit-lead/route.ts   - Form submission handler (inserts to DB, triggers n8n)
  api/health/route.ts        - Health check endpoint
  thank-you/page.tsx         - Post-submission success page
lib/
  db.ts                      - PostgreSQL connection pool
  types.ts                   - TypeScript interfaces for Dojo and Lead
migrations/
  init.sql                   - Database schema (auto-runs on first deploy)

DATABASE SCHEMA:
dojos table: id, name, subdomain, address, phone, email_from, twilio credentials
leads table: id, dojo_id, name, email, phone, experience_level, status, timestamps

CURRENT STATE:
- First customer: Espada BJJ Hong Kong (subdomain: espada)
- CI/CD configured: Push to master → GitHub Actions → Docker Hub → VPS
- PostgreSQL running in Docker on VPS
- Nginx reverse proxy configured for subdomains

DEVELOPMENT WORKFLOW:
1. Work on develop branch
2. Test locally with: pnpm dev
3. Commit and push to develop
4. Merge to master triggers auto-deployment

COMMON TASKS I MIGHT ASK YOU:
- Add new features to landing page
- Improve form validation
- Add new fields to capture
- Debug database connections
- Optimize Docker build
- Create dashboard for viewing leads

CODE STYLE:
- TypeScript strict mode
- Functional React components only
- Tailwind utility classes (no custom CSS)
- Raw SQL queries with parameterized inputs ($1, $2)
- Async/await for all async operations

IMPORTANT CONSTRAINTS:
- Keep it simple - this is an MVP for 3-5 customers
- No fancy ORMs or complex abstractions
- Fast iteration is more important than perfect architecture
- Every change should work for ALL dojos (single template approach)

When I ask you to make changes:
1. Show me the exact code
2. Explain the reasoning
3. Consider impact on existing dojos
4. Keep it minimal and maintainable

Ready to help! What would you like to work on?
