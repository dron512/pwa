import {supabaseClient} from '@supabase/supabase-js';

const supabase = new supabaseClient( import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY );