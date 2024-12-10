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
## Login Instructions
1. On the login page, use the following credentials:
   ```bash
   Username: user
   Password: password
You can choose to hide or see your password by click on the eye/monkey button:
 ![Screenshot 2024-12-10 093526](https://github.com/user-attachments/assets/f10b32b6-d2d4-48b9-ad79-dc0cfede2c72)
![Screenshot 2024-12-10 093516](https://github.com/user-attachments/assets/58a1c06e-7a9d-452a-838a-38e556b1c85a)

2. Click Login to access the application.
If you put in right credentials, you will see this default page:
![Screenshot 2024-12-10 092651](https://github.com/user-attachments/assets/0e3089d7-5b34-4f83-8329-6b9505808d9a)

3. Start input your stock symbol for technical analysis, sentiment analysis, and overall analysis.
![Screenshot 2024-12-10 092517](https://github.com/user-attachments/assets/a7aae0a8-9366-45de-b4f9-352bf7d4491f)

4. You can also click on Prediction on top right for a simple regression line prediction. It is a good tool to see the trend.
![Screenshot 2024-12-10 092629](https://github.com/user-attachments/assets/53eaaba7-9fee-4b58-81cc-bcfe56c0f8c2)

# !!! Please note! This is just a information providing tool! Please do not use any information or image showing here from this project as advisoring for your investment!
