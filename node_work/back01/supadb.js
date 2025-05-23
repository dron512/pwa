const supabase = require("@supabase/supabase-js");

// export const supabase = createClient(supabaseUrl, supabaseKey);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

exports.supabase = supabase.createClient(supabaseUrl, supabaseKey);
