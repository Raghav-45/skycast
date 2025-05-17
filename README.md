# SkyCase Weather Application

A full-stack weather application that provides detailed weather information with a modern, responsive UI built using Next.js and FastAPI.

## Features

- **Real-time Weather Data**: Display current weather conditions including temperature and humidity
- **Interactive Weather Charts**: Visualize temperature and humidity trends using Recharts
- **5-Day Weather Forecast**: Extended weather predictions with detailed daily information
- **Today's Highlights**: Key weather metrics for the current day
- **Modern UI Components**: Built with a clean, responsive design using Tailwind CSS
- **Weather Icons**: Custom weather condition icons for clear visual representation

## Tech Stack

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **Charts**: Recharts for weather data visualization
- **Date Handling**: date-fns
- **TypeScript**: For type-safe code
- **Components**: Custom UI components with modern design principles

### Backend
- **Framework**: FastAPI (Python)
- **Database**: Redis for caching weather data
- **Weather Data**: Integration with weather API services
- **Features**: 
  - Hazard detection
  - Weather service integration
  - Efficient data caching
  - API endpoint management

## Project Structure

```
├── frontEnd/
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   ├── lib/                # Utility functions and types
│   └── public/             # Static assets and weather icons
│
├── backEnd/
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core configuration
│   │   ├── db/            # Database management
│   │   ├── models/        # Data models and schemas
│   │   └── services/      # Business logic services
```

## Key Features Implementation

1. **Weather Data Visualization**
   - Interactive charts showing temperature and humidity trends
   - Custom tooltips for detailed data points
   - Responsive design adapting to different screen sizes

2. **API Integration**
   - RESTful API endpoints for weather data
   - Efficient data caching using Redis
   - Error handling and data validation

3. **User Interface**
   - Modern, clean design
   - Responsive components
   - Intuitive weather information display
   - Custom weather condition icons

## Getting Started

1. **Frontend Setup**
```bash
cd frontEnd
npm install
npm run dev
```

2. **Backend Setup**
```bash
# Create and activate virtual environment
cd backEnd
python -m venv venv
.\venv\Scripts\Activate

# Install dependencies
pip install -r requirements.txt

# Start the server on port 8001
uvicorn app.main:app --reload --port 8001
```

Note: For Unix-based systems, use `source venv/bin/activate` instead of `.\venv\Scripts\Activate`

## Development Highlights

- **Type Safety**: Comprehensive TypeScript implementation
- **Component Architecture**: Modular and reusable components
- **API Design**: Clean and efficient endpoint structure
- **Data Management**: Effective caching and state management
- **Code Quality**: Well-documented and maintained codebase

## Future Enhancements

- User location detection
- More detailed weather metrics
- Weather alerts system
- Historical weather data analysis
- Mobile application version

---

*Focusing on clean architecture, performance, and user experience. The implementation showcases my ability to create production-ready applications while maintaining high code quality standards.*
