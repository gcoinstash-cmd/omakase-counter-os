-- ==============================================================================
-- OMAKASE & COUNTER — SUPABASE DATABASE SCHEMA (v1.0.0)
-- 16-Seat Hinoki Reservation Ledger & Rare Sake Pairing OS
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Counter Reservations Table
CREATE TABLE IF NOT EXISTS public.counter_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reservation_code VARCHAR(32) NOT NULL UNIQUE,
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(64) NOT NULL,
    party_size INTEGER NOT NULL DEFAULT 2,
    reservation_date DATE NOT NULL,
    seating_time VARCHAR(32) NOT NULL, -- '5:30 pm' or '8:15 pm'
    course_selection VARCHAR(128) NOT NULL,
    sommelier_pairing VARCHAR(128) NOT NULL DEFAULT 'None',
    dietary_restrictions TEXT,
    total_deposit NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(32) NOT NULL DEFAULT 'Confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Daily Counter Seat Allocations Table
CREATE TABLE IF NOT EXISTS public.counter_seat_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seating_date DATE NOT NULL,
    seating_slot VARCHAR(32) NOT NULL,
    seat_number INTEGER NOT NULL CHECK (seat_number >= 1 AND seat_number <= 16),
    reservation_id UUID REFERENCES public.counter_reservations(id) ON DELETE SET NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'Open',
    UNIQUE (seating_date, seating_slot, seat_number)
);

-- 4. Sommelier Cellar & Rare Sake Catalog Table
CREATE TABLE IF NOT EXISTS public.sommelier_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bottle_name VARCHAR(255) NOT NULL,
    brewery_or_domaine VARCHAR(255) NOT NULL,
    classification VARCHAR(128) NOT NULL, -- e.g. Junmai Daiginjo, Grand Cru
    vintage_year VARCHAR(32),
    serving_temp VARCHAR(64) NOT NULL,
    tasting_notes TEXT NOT NULL,
    glass_price NUMERIC(10, 2) NOT NULL,
    bottle_price NUMERIC(10, 2) NOT NULL,
    in_stock_bottles INTEGER NOT NULL DEFAULT 6,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE public.counter_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.counter_seat_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sommelier_catalog ENABLE ROW LEVEL SECURITY;

-- 6. Public Read & Booking Policies
CREATE POLICY "Allow public read access to sommelier catalog" 
    ON public.sommelier_catalog FOR SELECT USING (true);

CREATE POLICY "Allow guests to insert reservation requests" 
    ON public.counter_reservations FOR INSERT WITH CHECK (true);

-- 7. Chef & Maitre D' Admin Policies
CREATE POLICY "Counter shokunin manage all reservations" 
    ON public.counter_reservations FOR ALL USING (true);

CREATE POLICY "Counter shokunin manage seat allocations" 
    ON public.counter_seat_allocations FOR ALL USING (true);

CREATE POLICY "Sommelier manage cellar catalog" 
    ON public.sommelier_catalog FOR ALL USING (true);
