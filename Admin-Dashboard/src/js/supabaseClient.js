import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://vtgocfxbcezgtksvoqqb.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Z29jZnhiY2V6Z3Rrc3ZvcXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDkyMDksImV4cCI6MjA2NzM4NTIwOX0.1SoLE8KpSF5yVG6K6CobSqv_ot353AAAXhmvF9g8NEo'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
