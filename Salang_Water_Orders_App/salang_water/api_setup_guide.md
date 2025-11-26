# Salang Water App - API Setup Guide

This guide explains how to obtain and configure the necessary API keys for the Salang Water application.

## 1. EmailJS (For Order Emails)

EmailJS is used to send order confirmations to both the customer and the admin.

1.  **Create an Account**: Go to [EmailJS](https://www.emailjs.com/) and sign up for a free account.
2.  **Add a Service**:
    *   Click "Add New Service" and select "Gmail" (or your preferred provider).
    *   Connect your account and note the **Service ID** (e.g., `service_xyz123`).
3.  **Create an Email Template**:
    *   Go to "Email Templates" and create a new template.
    *   Design your email. You can use variables like `{{to_name}}`, `{{order_id}}`, `{{total_amount}}`, `{{delivery_address}}`, `{{order_items}}`.
    *   Save and note the **Template ID** (e.g., `template_abc456`).
4.  **Get Public Key**:
    *   Go to "Account" -> "General".
    *   Copy your **Public Key**.

**Configuration**:
Update your `.env` file:
```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

## 2. Google Maps (For Location Picking)

Google Maps is used to allow users to pin their delivery location.

1.  **Google Cloud Console**: Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Create Project**: Create a new project for "Salang Water".
3.  **Enable APIs**:
    *   Go to "APIs & Services" -> "Library".
    *   Search for and enable **Maps JavaScript API**.
    *   (Optional but recommended) Enable **Places API** and **Geocoding API** for better address resolution.
4.  **Create Credentials**:
    *   Go to "APIs & Services" -> "Credentials".
    *   Click "Create Credentials" -> "API Key".
    *   **Restrict your key**: Under "Application restrictions", set it to "HTTP referrers" and add your website URL (e.g., `localhost:3000` for dev, `your-domain.com` for prod). This prevents unauthorized use.
    *   Copy the **API Key**.

**Configuration**:
Update your `.env` file:
```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

## 3. Gemini AI (For Salang Bot)

Gemini AI powers the helpful chat assistant.

1.  **Google AI Studio**: Go to [Google AI Studio](https://aistudio.google.com/).
2.  **Get API Key**:
    *   Click "Get API key" in the sidebar.
    *   Click "Create API key in new project".
    *   Copy the **API Key**.

**Configuration**:
Update your `.env` file:
```env
REACT_APP_GEMINI_API_KEY=your_gemini_key
```

## Final Step: Materialize the Keys

1.  In the root of the `salang_water` directory, create a file named `.env` (if it doesn't exist).
2.  Copy the contents of `.env.example` into `.env`.
3.  Replace the placeholder values with your actual keys obtained above.
4.  Restart your development server (`npm start`) for the changes to take effect.

> [!WARNING]
> Never commit your `.env` file to version control (GitHub, etc.). It contains sensitive secrets. Ensure `.env` is listed in your `.gitignore` file.
