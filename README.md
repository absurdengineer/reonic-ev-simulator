# Reonic EV Charging Station Simulator

A React application that simulates and visualizes EV charging station usage patterns to help optimize charging infrastructure planning.

## Tech Stack

- React 19
- TypeScript 5.8
- Tailwind CSS 3
- Chart.js 4.4 for data visualization
- Node.js 22.13.1

## Requirements

- Node.js 22.x or higher
- Yarn package manager v1.22.x (npm had issues related to peer-legacy between typescript and react-i18next)

## Overview

This simulator helps store owners plan their EV charging infrastructure by:

- Calculating potential power demands
- Visualizing charging patterns
- Analyzing usage statistics
- Optimizing charging station deployment

## Features

- Interactive input form for simulation parameters
- Real-time visualization of charging data
- Responsive design for all devices
- Detailed analytics including:
  - Power consumption per chargepoint
  - Daily/weekly/monthly usage patterns
  - Total energy consumption
  - Peak load analysis

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/absurdengineer/reonic-ev-simulator.git
```

2. Install dependencies using Yarn (do not use npm):

```bash
cd reonic-ev-simulator
yarn
```

3. Run the tests:

```bash
yarn test
```

4. Run the development server:

```bash
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

> Important: This project exclusively uses Yarn for package management. Do not use npm as it may cause dependency conflicts.

## Usage

1. Set simulation parameters:

   - Number of charging points (1-200)
   - Arrival probability multiplier (20-200%)
   - Car consumption (kWh)
   - Charging power per point (kW)

2. View the results in various visualizations:

   1. Overview Statistics

      - Total Energy Consumption (kWh)
      - Peak Load Analysis (kW)

   2. Charts and Visualizations
      - Power Consumption per Chargepoint (Bar Chart)
      - Daily Usage Pattern (Line Chart)
      - Charging Efficiency Distribution (Pie Chart)
      - Performance Metrics (Radar Chart)

## Contact

Mohammad Dilshad Alam - mddalam1@gmail.com
Project Link: [https://github.com/absurdengineer/reonic-ev-simulator](https://github.com/absurdengineer/reonic-ev-simulator)
