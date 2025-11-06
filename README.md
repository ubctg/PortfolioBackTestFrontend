# Portfolio Backtest Frontend

React UI for UBC Trading Group portfolio backtesting tools. This repository contains the frontend React application that talks to a separate Flask backend (see Backend section below) to request backtest data, portfolio metrics, and other analytics.

## Table of contents

- Prerequisites
- Frontend — install & run
- Environment configuration
- Backend (Flask) 
- Troubleshooting
- License

## Prerequisites

- Node.js (LTS recommended — v14/16/18 are commonly used). Verify with:

	```powershell
	node --version
	npm --version
	```

- npm (comes with Node.js).
- Python 3.8+ and pip for the backend (see backend repo).
- Git to clone the repositories.

If you are on Windows (PowerShell), the commands in this README are written to work with PowerShell.

## Frontend — install & run

1. Install node dependencies

```powershell
npm install
```

2. Create a `.env` file to point the frontend to your backend server. See Environment configuration below.

3. Run the app in development mode

```powershell
npm start
```

4. Build for production

```powershell
npm run build
```

This generates an optimized static build in the `build/` folder which you can deploy to any static hosting service or serve behind a web server.

## Environment configuration

The frontend expects a backend base URL to contact the Flask server. Create a `.env` file in the project root (next to `package.json`) and add:

```text
REACT_APP_BACKEND_URL=http://127.0.0.1:5000
```

## Backend (Flask)

The backend lives in a separate repo: https://github.com/UBC-Trading-Group/portfolio-management-backtest

To run it locally (PowerShell):

```powershell
git clone https://github.com/UBC-Trading-Group/portfolio-management-backtest.git
cd portfolio-management-backtest
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py      
```

Default backend URL: `http://127.0.0.1:5000` (adjust `REACT_APP_BACKEND_URL` if different).

Note: enable CORS on the Flask side if the frontend (localhost:3000) calls the API. The backend can use `flask-cors`:

```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
```

## Troubleshooting

- CORS errors: enable CORS on the Flask app (for example with `flask-cors`) and confirm the frontend origin (e.g., `http://localhost:3000`) is allowed. Check the browser console for the exact CORS message.
- Backend unreachable / 500 errors: ensure the Flask server is running and `REACT_APP_BACKEND_URL` points to the correct host:port. Inspect backend console/logs for tracebacks.
- Dev server / npm issues: verify Node and npm are available (`node -v; npm -v`). If `npm install` fails, try removing `node_modules` and `package-lock.json` and re-run `npm install`.
- Python / pip issues: activate the virtual environment before installing dependencies. On PowerShell:

	```powershell
	python -m venv venv
	.\venv\Scripts\Activate.ps1
	pip install -r requirements.txt
	```

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

