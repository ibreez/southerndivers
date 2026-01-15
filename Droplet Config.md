Perfect — this folder tree tells me **exactly** what you have 👍
You are running a **single-repo (monorepo) Vite + React frontend with a Node.js backend in `server.js`**.

Below is a **refined, CORRECT deployment guide specifically for *this exact structure***.
No guessing, no generic steps.

---

# ✅ Southern Maldives – DigitalOcean Deployment Guide

**Vite + React + Node.js + MySQL (Single Repo)**

## 📁 Your Project Type (Important)

You have **ONE project** with:

* **Frontend:** Vite + React (root-level)
* **Backend:** Node.js (`server.js`)
* **Build output:** `dist/` (Vite default)
* **NOT** separate `frontend/` or `backend/` folders

---

## 1️⃣ Server Preparation (Once)

```bash
apt update && apt upgrade -y
apt install -y nginx mysql-server git
```

### Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
```

Verify:

```bash
node -v
npm -v
```

---

## 2️⃣ Upload / Clone the Project

```bash
cd /var/www
git clone https://github.com/ibreez/southerndivers.git
cd southerndivers
```

Your server path is now:

```
/var/www/southerndivers
```

---

## 3️⃣ Install Project Dependencies

```bash
npm install
```

This installs:

* React dependencies
* Node/Express dependencies
* Vite
* Tailwind

---

## 4️⃣ Environment Variables (Backend)

Create `.env` in **project root**:

```bash
nano .env
```

Example:

```env
PORT=5000
DB_HOST=127.0.0.1
DB_USER=myapp_user
DB_PASSWORD=STRONG_PASSWORD
DB_NAME=myapp_db
NODE_ENV=production
```

---

## 5️⃣ Build the React Frontend (Vite)

⚠️ Nginx **cannot serve JSX** — it must serve the Vite build.

```bash
npm run build
```

This creates:

```
/var/www/southerndivers/dist
```

Verify:

```bash
ls dist
```

You **must see**:

```
index.html
assets/
```

---

## 6️⃣ Start Backend with PM2

Your backend entry file is:

```
server.js
```

### Install PM2

```bash
npm install -g pm2
```

### Start API

```bash
pm2 start server.js --name southerndivers-api
```

Enable reboot persistence:

```bash
pm2 startup
pm2 save
```

Check:

```bash
pm2 status
```

---

## 7️⃣ Nginx Configuration (Correct for Vite + API)

### Create config

```bash
nano /etc/nginx/sites-available/southerndivers
```

### Paste THIS (tailored to your project)

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    root /var/www/southerndivers/dist;
    index index.html;

    # React Router (VERY IMPORTANT)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Node API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
ln -s /etc/nginx/sites-available/southerndivers /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

## 8️⃣ Permissions (IMPORTANT)

```bash
chown -R www-data:www-data /var/www/southerndivers
chmod -R 755 /var/www/southerndivers
```

---

## 9️⃣ React API URL (Correct for Production)

In `.env` (root):

```env
VITE_API_URL=/api
```

Use it in React:

```js
import.meta.env.VITE_API_URL
```

Rebuild after change:

```bash
npm run build
systemctl restart nginx
```

---

## 🔟 Access Your App

Open browser:

```
http://YOUR_DROPLET_IP
```

✔ React loads
✔ React Router works
✔ `/api/*` hits Node backend

---

## 1️⃣1️⃣ (Optional but Recommended) SSL

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## ✅ Final Architecture (Clean & Correct)

```
Nginx (Port 80 / 443)
│
├── React (Vite dist/)
│
└── /api → Node.js (PM2 → server.js → MySQL)
```

---

## 🚨 Common Mistakes You AVOIDED

✔ No `/root` serving
✔ No double frontend folders
✔ Correct Vite `dist/` usage
✔ React Router fixed
✔ PM2 used correctly

