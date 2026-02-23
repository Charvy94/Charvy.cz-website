# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d85d2ea0-bdab-454b-afec-0b12a557d1fa

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d85d2ea0-bdab-454b-afec-0b12a557d1fa) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Workshop contact form setup (Resend)

The Workshop contact form submits to `php-backend/contact.php` and sends:

1. A notification email to the configured admin recipient.
2. A confirmation copy to the sender.

Set these environment variables for the PHP backend:

```bash
# Existing API/DB variables (already used in backend)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_db_password
APP_ENV=production

# Contact recipient (required)
CONTACT_RECIPIENT_EMAIL=admin@example.com
CONTACT_RECIPIENT_NAME=Admin Name

# Mail sender identity (optional, defaults shown)
CONTACT_FROM_EMAIL=info@charvy.cz
CONTACT_FROM_NAME=Charvy.cz

# Resend (required)
RESEND_API_KEY=re_xxxxxxxxx

# Domain in Resend must be verified for CONTACT_FROM_EMAIL
```

Frontend environment variable (already used):

```bash
VITE_API_URL=https://your-domain.com/api
```

## Manual verification checklist (Workshop form)

1. Open the Workshop page and submit valid values for **name**, **email**, and **message**.
2. Confirm success message appears and submit button is disabled while sending.
3. Confirm admin recipient receives a Workshop inquiry email from `info@charvy.cz` (or configured sender).
4. Confirm sender receives a confirmation copy.
5. Submit invalid payload (short name/email/message) and verify inline validation errors.
6. Submit too quickly or with honeypot field filled and verify request is rejected.
7. Send more than 5 messages from same IP in 10 minutes and verify rate limit response.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d85d2ea0-bdab-454b-afec-0b12a557d1fa) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
