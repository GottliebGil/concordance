# Lyrics Concordance Backend

This backend uses FastAPI and PostgreSQL to manage song lyrics and their metadata.

## Setup:

1. Create a new Virtual Environment if not exists: `python3 -m venv ./venv`
2. Activate the Virtual Environment: `soruce .venv/bin/activate`
3. Set up a PostgreSQL database.
4. Update the DATABASE_URL in `database.py` with your connection details.
5. Install the required packages: `pip install -r requirements.txt`
6. Run the FastAPI server: `uvicorn main:app --reload`

Endpoints are available for song addition, metadata management, and textual search.
