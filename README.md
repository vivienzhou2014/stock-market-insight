Stock Market Insight Project
To use, first download this repo to your local machine
Then add a file .env under server folder
in .env, add 
PERPLEXITY_API_KEY = ''
MONGO_URL=''
STOCK_PRICE_KEY=''
NEWS_KEY=''
After saving this file, run cd server 
Then run npm run dev
Then open another terminal
Run cd client
Then run npm run dev
ctrl + click the provided link in your terminal
in the login page
type user as username, password as password
click login

# Stock Market Insight Project

Welcome to the **Stock Market Insight Project**! Follow the steps below to set up and run the project on your local machine.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Login Instructions](#login-instructions)

---

## Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (for running the server and client)
- MongoDB (for database setup)

---

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone <repository-url>

2. Navigate to the project directory":
   ```bash
   cd stock-market-insight

## Running the Project

### Step 1: Set Up Environment Variables
1. Navigate to the server folder:
   ```bash
   cd server
2. Create a .env file in the server folder:
   ```bash
   touch .env
3. Add the following keys to the .env file:
   ```bash
    PERPLEXITY_API_KEY=''
    MONGO_URL=''
    STOCK_PRICE_KEY=''
    NEWS_KEY=''
Replace the empty strings with your actual API keys and MongoDB URL.
### Step 2: Start the Server
1. In the server folder, run:
   ```bash
   npm init
   npm run dev
### Step 3: Start the Client
1. Open a new terminal window.
2. Navigate to the client folder:
   ```bash
   cd client
3. Run:
   ```bash
   npm init
   npm run dev
