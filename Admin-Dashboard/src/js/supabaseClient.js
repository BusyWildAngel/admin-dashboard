import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://vtgocfxbcezgtksvoqqb.supabase.co', // ✅ correct URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0Z29jZnhiY2V6Z3Rrc3ZvcXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MDkyMDksImV4cCI6MjA2NzM4NTIwOX0.1SoLE8KpSF5yVG6K6CobSqv_ot353AAAXhmvF9g8NEo'                 // ✅ correct anon key
)