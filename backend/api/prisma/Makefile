include ../config.env

generate:
	@echo "Generating Prisma Client"
	DATABASE_URL=$(DATABASE_URL) npx prisma generate

migrate:
	@echo "Migrating Prisma Schema"
	DATABASE_URL=$(DATABASE_URL) npx prisma migrate dev --preview-feature

seed-db:
	DATABASE_URL=$(DATABASE_URL) node seed.mjs
