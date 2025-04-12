import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://bsmywhmzmzzzsggtewhb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzbXl3aG16bXp6enNnZ3Rld2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNTA5OTEsImV4cCI6MjA1ODYyNjk5MX0.n-_ORn3pG17ywJg-nzgWAcWRlGQSmmRLddpBXR_FcsE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
