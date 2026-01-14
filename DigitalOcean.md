# Deploying Southern Maldives app to DigitalOcean 🐬

This guide shows two straightforward deployment options on DigitalOcean: (A) App Platform (recommended for simplicity), and (B) Docker on a Droplet or Container Registry. It also lists required environment variables, database setup, and helpful troubleshooting tips.

---

## Quick notes about the repository (what I changed) ✅
- Added a `start` script in `package.json`: `npm start` runs `node server.js`.
- Rewrote the `Dockerfile` to build the Vite app from the repo root and copy `dist` into a production image. The container exposes port `5000` and honors the `PORT` environment variable.
- `server.js` already serves the Vite `dist` folder and uses `process.env.PORT`.

---

## Prerequisites
- DigitalOcean account (https://cloud.digitalocean.com/).
- Optional: a Docker Hub (or other) account (if you want to push images to a registry).
- Recommended: set up a Managed MySQL database on DigitalOcean for production.
- Install `doctl` (DigitalOcean CLI) if you prefer CLI operations: https://docs.digitalocean.com/reference/doctl/

---

## Required environment variables
The app expects the following environment variables (set them in App Platform or droplet environment):
- DB_HOST — MySQL host (e.g., managed DB connection host)
- DB_USER — MySQL user
- DB_PASSWORD — MySQL password
- DB_NAME — MySQL database name (default in code: `diving_center`)
- PORT — optional; DigitalOcean sets this for App Platform but you can set to `5000`
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS — for sending enrollment emails
- EMAIL_TO — destination for enrollment notifications
- Any other secrets you use (keep them private and secure)

Note: The server will create tables automatically on startup if permissions are correct.

---

## A. Deploy to DigitalOcean App Platform (recommended)
1. Open the DigitalOcean control panel → Apps → Launch App.
2. Select Source: "GitHub" and connect your repo (authorize DigitalOcean to access your repository).
3. Choose the repo and branch.
4. Build & run settings:
   - If your repo contains a `Dockerfile` (it does), choose "Dockerfile" build method. App Platform will use the Dockerfile to build the image.
   - Make sure the App Platform service uses the environment variable `PORT` (App Platform supplies it automatically) and healthchecks target `/api/health`.
5. Components configuration:
   - Set the Component type to "Web Service".
   - Set the HTTP port to `5000` (this should match the Dockerfile & server defaults) or leave it to the platform's `$PORT` depending on the UI.
   - Set the instance size and scale options according to your traffic needs.
6. Environment variables: add the required environment variables listed above in the App settings.
7. Add a Managed Database (optional but recommended):
   - Create → Databases → Create a MySQL DB cluster.
   - Add a trusted source (the App) or allow connections with a private link.
   - Copy the connection details and set `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` in the App Platform environment variables.
8. Deploy and monitor build logs. After the build completes, the app will be available at the assigned domain.
9. (Optional) Add a custom domain in the App Platform UI and enable HTTPS (automatic cert via Let's Encrypt).

---

## B. Deploy using Docker (Droplet / Container Registry)
Option 1 — Docker image on a Droplet:
1. Create a Droplet with Docker preinstalled (Ubuntu, Docker, Docker Compose if you want)
2. Copy the repo to the droplet (git clone, or upload) or build an image locally and push to Docker Hub.
3. Build the image:
   - Locally: `docker build -t youruser/southernmaldives:latest .`
   - Or on Droplet: same command inside the repo directory.
4. Run the container, passing env vars (replace values accordingly):
   - docker run -d --name southernmaldives -p 80:5000 \
     -e DB_HOST=... -e DB_USER=... -e DB_PASSWORD=... -e DB_NAME=... \
     -e SMTP_HOST=... -e SMTP_PORT=... -e SMTP_USER=... -e SMTP_PASS=... -e EMAIL_TO=... \
     youruser/southernmaldives:latest
5. (Optional) Use nginx as reverse proxy to handle TLS and host multiple services.

Option 2 — Build & push to Container Registry (DigitalOcean Container Registry)
1. Create a Container Registry in DigitalOcean.
2. Tag and push your image to the registry (follow DO registry auth docs or `doctl registry login`).
3. Either pull the image from a Droplet / Kubernetes cluster or use App Platform and choose the Registry image.

---

## Populate the database (seed data)
- The repo includes endpoints to populate the database:
  - `POST /api/populate` — clears and inserts the initial demo data
  - Alternatively, you can run `node populate-db.js` locally or on the server if you prefer a script.

Important: call the populate endpoint only in a trusted environment and not on public/production without confirmation.

---

## Health checks & monitoring
- The app exposes `/api/health` that returns JSON including DB and memory info — use it for readiness/liveness checks.
- Monitor logs in App Platform or via `docker logs` for container deployments.

---

## Security & best practices
- Never commit credentials to the repository — use App Platform environment variables or DO secrets.
- Use Managed Databases for automatic backups and secure connectivity.
- Set up HTTPS (App Platform does automatically with custom domains; for Droplets use nginx and Let's Encrypt).
- Limit database privileges of the app user — do not use the admin DB user for runtime.

---

## Troubleshooting tips
- Build fails on App Platform: check build logs for module errors. Ensure `npm` install works in a fresh environment.
- App cannot connect to DB: confirm `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` and that the firewall/allowlist permit connection from the app.
- Email sending fails: verify SMTP settings and that your SMTP provider allows connections from DO IPs.
- Health endpoint returns `unhealthy`: inspect logs and DB connection pool errors.

---

## Final checklist before production
- [ ] Set environment variables in production (DB, SMTP, emails)
- [ ] Use Managed Database and set network/allowlist correctly
- [ ] Add backups for DB
- [ ] Add monitoring/alerts (App Platform or third-party tools)
- [ ] Secure admin accounts and change default admin password

---

If you want, I can also:
- Add a `docker-compose.yml` with service for app + MySQL for easy local testing.
- Add a short `deploy` script using `doctl` to automate App Platform deployment.

Good next steps: tell me which DigitalOcean flow you prefer (App Platform or Droplet + Docker) and I can add `docker-compose.yml` or an automated `doctl` deploy script. ✅