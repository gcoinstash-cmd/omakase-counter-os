# Turnkey Supabase Setup — Omakase & Counter (16-Seat Hinoki Reservation & Tasting OS)

Follow this 3-minute turnkey walkthrough to wire your PostgreSQL database, real-time counter reservations, and rare sake cellar catalog.

---

## Step 1: Create Supabase Project
1. Log in to [Supabase](https://supabase.com).
2. Click **New Project** and name it `omakase-counter` (Select region nearest your location).
3. Save your database password securely.

---

## Step 2: Run SQL Schema & Seed Data
1. In the Supabase Dashboard, open the **SQL Editor** from the left navigation bar.
2. Open `supabase/schema.sql` from this directory, copy its entire contents, paste into the editor, and click **Run**.
3. Open `supabase/seed.sql`, copy and paste into the SQL editor, and click **Run** to inject sample tasting reservations, seat allocations, and sommelier bottle profiles.

---

## Step 3: Wire Environment Keys
1. In Supabase, navigate to **Project Settings** > **API**.
2. Copy your **Project URL** (`https://<project-ref>.supabase.co`) and **anon / public key**.
3. Create a `.env` file in the root of `omakase-counter`:
   ```bash
   VITE_SUPABASE_URL="https://your-project-id.supabase.co"
   VITE_SUPABASE_ANON_KEY="your-anon-key-here"
   ```
4. Run `npm run build` and launch:
   ```bash
   npm run dev
   ```

---

## Chef's Counter Admin Door
- Visit `/admin` or click **ADMIN PASS** in the top navigation.
- Passcode: `omakase2026`
- Instantly manage tonight's 16-seat counter manifest, track course progression, and oversee pairing revenue.
