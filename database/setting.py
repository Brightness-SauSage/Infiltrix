import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
