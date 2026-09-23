-- ==============================================================================
-- OMAKASE & COUNTER — SUPABASE SEED DATA (v1.0.0)
-- ==============================================================================

-- Seed Counter Reservations
INSERT INTO public.counter_reservations (reservation_code, guest_name, guest_email, guest_phone, party_size, reservation_date, seating_time, course_selection, sommelier_pairing, dietary_restrictions, total_deposit, status)
VALUES
('OMK-491028', 'Kenzo Takahashi & Guest', 'kenzo@takahashi-holdings.jp', '+81 90-1234-5678', 2, CURRENT_DATE, '8:15 pm', '16-Course Grand Master Tasting ($395/guest)', 'Rare Junmai Daiginjo Flight (+$145)', 'Strictly zero gluten shoyu, loves wild wasabi root.', 1080.00, 'Confirmed'),
('OMK-771920', 'Dr. Evelyn Vance & Party', 'evelyn.vance@vance-partners.com', '+1 (415) 890-4421', 4, CURRENT_DATE, '5:30 pm', '12-Course Imperial Omakase ($285/guest)', 'Burgundy Premier Cru Selection (+$195)', 'No shellfish allergies, requests extra otoro nigiri pieces.', 1920.00, 'Seated at Counter'),
('OMK-339182', 'Marcus Sterling', 'msterling@sterlingtrust.org', '+1 (310) 902-1433', 2, CURRENT_DATE, '8:15 pm', '16-Course Grand Master Tasting ($395/guest)', 'Rare Junmai Daiginjo Flight (+$145)', 'Allergies: zero uni for guest 2.', 1080.00, 'Confirmed'),
('OMK-110294', 'Elena Rostova', 'elena@rostovacap.com', '+1 (212) 440-9811', 2, CURRENT_DATE, '5:30 pm', '12-Course Imperial Omakase ($285/guest)', 'Rare Junmai Daiginjo Flight (+$145)', 'None.', 860.00, 'Completed')
ON CONFLICT (reservation_code) DO NOTHING;

-- Seed Sommelier Bottle Catalog
INSERT INTO public.sommelier_catalog (bottle_name, brewery_or_domaine, classification, vintage_year, serving_temp, tasting_notes, glass_price, bottle_price, in_stock_bottles)
VALUES
('Jokigen Original Luxury', 'Jokigen Shuzo, Yamagata', 'Junmai Daiginjo', '2024', 'Serve chilled (10°C)', 'Velvety viscosity with smooth green melon esters that frame the ocean-rich fat of raw unpasteurized uni.', 32.00, 240.00, 12),
('Kokuryu Black Dragon Ryusen', 'Kokuryu Sake Brewing, Fukui', 'Junmai Daiginjo', '2023', 'Serve slightly chilled (12°C)', 'Intense cedar and dry pear finish that cuts cleanly through aged bluefin fat levels.', 48.00, 390.00, 6),
('Isojiman Nakadori', 'Isojiman Shuzo, Shizuoka', 'Daiginjo', '2024', 'Serve cold (8°C)', 'Delicate white peach and pristine mountain stream minerality designed for king salmon and kinmedai.', 36.00, 280.00, 8)
ON CONFLICT DO NOTHING;
