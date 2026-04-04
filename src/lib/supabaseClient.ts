import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wwqqhnbrpgzvjavljwnk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cXFobmJycGd6dmphdmxqd25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxNTU0MTQsImV4cCI6MjA5MDczMTQxNH0.D1VIKknxpboA5DfjVXCHbI2UXj4UEIQHANZRFfPN5VI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);