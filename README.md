# Reonic EV Charging Station Simulator

A React application that simulates and visualizes EV charging station usage patterns to help optimize charging infrastructure planning.

## Tech Stack

- React 18
- TypeScript 5.4
- Tailwind CSS 3.4
- Chart.js 4.4 for data visualization
- Node.js 22.13.1

## Requirements

- Node.js 22.x or higher
- Yarn package manager (npm had issues related to peer-legacy between typescript and react-i18next)

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
yarn install
```

3. Run the development server:

```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

> Important: This project exclusively uses Yarn for package management. Do not use npm as it may cause dependency conflicts.

## Usage

1. Set simulation parameters:

   - Number of charging points (1-200)
   - Arrival probability multiplier (20-200%)
   - Car consumption (kWh)
   - Charging power per point (kW)

2. View the results in various visualizations:
   - Real-time power usage charts
   - Daily consumption patterns
   - Statistical analysis

## Contact

Mohammad Dilshad Alam - mddalam1@gmail.com
Project Link: [https://github.com/absurdengineer/reonic-ev-simulator](https://github.com/absurdengineer/reonic-ev-simulator)
