# Vercel entrypoint for Flask application
# This file is required by Vercel to locate the Flask app instance

import sys
import os

# Add server directory to path to import App module
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'server'))

# Import the Flask app instance from server/App.py
from App import app

# Export app for Vercel
__all__ = ['app']

# Log that the app has been successfully imported
if __name__ != '__main__':
	print("[app.py] Flask app successfully imported and ready for Vercel", flush=True)
