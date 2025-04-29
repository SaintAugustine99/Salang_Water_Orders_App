# Salang Water Refill App

A simple web application for ordering water refills with an admin dashboard for order management.

## Features

- Customer order form with location detection
- Admin dashboard for order management
- Secure authentication with Netlify Identity
- Serverless functions for backend operations
- No database required - uses file-based storage

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Netlify Identity

1. Deploy your site to Netlify
2. Enable Netlify Identity from your Netlify site dashboard
3. Go to Site settings > Identity > Settings
4. Enable "Git Gateway" for authentication
5. Set registration preferences to "Invite only"
6. Invite yourself as an admin user (Settings > Identity > Invite users)

### 3. Local Development

```bash
npm run dev
```

This will start the Netlify development server with serverless functions.

### 4. Deploy to Production

```bash
netlify deploy --prod
```

## Project Structure

- `/` - Main website files
  - `index.html` - Order form for customers
  - `admin.html` - Admin dashboard
  - `/css` - Stylesheets
  - `/js` - JavaScript files
- `/functions` - Netlify serverless functions
  - `create-order.js` - Create new orders
  - `get-orders.js` - Get all orders
  - `get-order.js` - Get a specific order
  - `update-order.js` - Update order status
  - `delete-order.js` - Delete orders
  - `/util` - Utility functions
    - `db-helpers.js` - Database helpers

## Data Storage

Orders are stored in a JSON file at `.data/orders.json`. This is a simple solution that works well for low to moderate volume without requiring a database.

## Security

- Admin dashboard is protected by Netlify Identity
- JWT authentication is required for all admin API calls
- CORS headers are properly set

## Limitations

- File-based storage works for simple applications with low to moderate volume
- For higher volume, consider upgrading to a database like Fauna, MongoDB Atlas, or Supabase

## License

ISC