# Market Predictor Dashboard

A comprehensive market prediction application with AI integration for Insurance, Loan Claims, and Preclosure markets.

## Features

- **Dashboard Overview**: Real-time market trends visualization
- **Market Categories**: 
  - Insurance Market Analysis
  - Loan Claims Tracking
  - Preclosure Market Insights
- **AI Integration**: OpenAI-powered market predictions
- **News Aggregation**: Latest market news for each category
- **Interactive Charts**: Visual representation of market data

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
   - Copy `.env` file and add your OpenAI API key
   - Replace `your-openai-api-key-here` with actual API key

4. Run the Flask server:
```bash
python app.py
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

## Usage

1. Access the dashboard at `http://localhost:3000`
2. Navigate between different market categories using tabs
3. View latest news for each market segment
4. Use AI prediction panel to get market insights
5. Monitor overall market trends in the dashboard overview

## API Endpoints

- `GET /api/dashboard` - Get dashboard overview data
- `GET /api/news/<category>` - Get news for specific category
- `POST /api/predict` - Get AI-powered market predictions

## Technologies Used

- **Backend**: Flask, OpenAI API, Python
- **Frontend**: React, Material-UI, Chart.js
- **AI**: OpenAI GPT-3.5-turbo for market analysis