# Lyrics Concordance Backend

This backend uses FastAPI and PostgreSQL to manage song lyrics and their metadata.

## Setup:

1. Set up a PostgreSQL database.
2. Update the DATABASE_URL in `database.py` with your connection details.
3. Install the required packages: `pip install -r requirements.txt`
4. Run the FastAPI server: `uvicorn main:app --reload`

Endpoints are available for song addition, metadata management, and textual search.
