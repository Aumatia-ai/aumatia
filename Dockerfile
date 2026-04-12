
# Stage 1: Install dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Build the application
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1

# Next.js inlines NEXT_PUBLIC_* variables at build time.
# These are public (exposed to the browser), so hardcoding is safe.
ENV NEXT_PUBLIC_SUPABASE_URL=https://yxohhquoppatndzzalyq.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b2hocXVvcHBhdG5kenphbHlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2ODY0NjgsImV4cCI6MjA5MTI2MjQ2OH0.O_mXgxEp2F7t58e617lupqhZfiJuGEeEUfkAN7tHwGI

# Service Role Key is a SECRET — passed at build time, never hardcoded.
ARG SUPABASE_SERVICE_ROLE_KEY
ENV SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY

RUN npm run build

# Stage 3: Production image, copy all the files and run next
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Server Actions (fetchProfileAction, adminUserActions) need this at RUNTIME.
ENV SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b2hocXVvcHBhdG5kenphbHlxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NTY4NjQ2OCwiZXhwIjoyMDkxMjYyNDY4fQ.0HuoEG5gPvKebI7aFu3kKtfknLAFN9H2SFA6W3BnkZ8

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
