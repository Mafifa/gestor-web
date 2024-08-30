import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uglndmujuggjftvsxyzp.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnbG5kbXVqdWdnamZ0dnN4eXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5MDE1MTUsImV4cCI6MjA0MDQ3NzUxNX0.re2HUqSgWGkP7vyJSQDqaEf9Rf7T0y3dcf9D7QNgVEg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
