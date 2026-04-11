// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// ⚠️ Замени эти строки на свои значения:
const supabaseUrl = 'https://jmliyolllwemixymxsgu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbGl5b2xsbHdlbWl4eW14c2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNjMyMTcsImV4cCI6MjA3MzYzOTIxN30.kMPWHalWVg6FD99boKERKTNbAb8f-Y4rnilcZpM4QO4'

// 📌 Клиент Supabase — используем везде
export const supabase = createClient(supabaseUrl, supabaseKey)
