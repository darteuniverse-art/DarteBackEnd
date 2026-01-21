# Darte Backend

NestJS backend scaffold with MongoDB.

## Requirements
- Node.js 20 LTS or newer
- pnpm
- MongoDB

## Setup
1) Copy `.env.example` to `.env` and update values.
2) Install dependencies:
   - `pnpm install`
3) Run the service:
   - `pnpm start:dev`

## Seeding
This project uses simple script-based seeds and migrations for MongoDB.

Seed an admin user:
- `ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD_HASH=<bcrypt-hash> pnpm seed`

## Migrations
Add timestamped scripts under `scripts/migrations/` and run them with:
- `pnpm ts-node scripts/migrations/<timestamp>_<name>.ts`

## Health Check
- `GET /health`
