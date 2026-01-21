# MongoDB Migrations

This project uses lightweight, script-based migrations. Each migration is a
timestamped TypeScript file that connects to MongoDB, performs an idempotent
change, and exits.

## Conventions
- Name format: `YYYYMMDDHHMM_description.ts`
- Keep migrations idempotent (safe to run multiple times).
- Use one migration per change.

## Running
Use ts-node directly:
- `pnpm ts-node scripts/migrations/202601110900_add_index.ts`
