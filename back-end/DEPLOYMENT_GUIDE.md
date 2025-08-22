# Vercel Deployment Guide

## Environment Variables Setup

To deploy successfully to Vercel, you need to set the following environment variables in your Vercel dashboard:

### MongoDB Variables
- `DB_USER`: Your MongoDB username
- `DB_PASSWORD`: Your MongoDB password

### Cloudinary Variables  
- `CLOUD_NAME`: Your Cloudinary cloud name
- `API_KEY`: Your Cloudinary API key
- `API_SECRET`: Your Cloudinary API secret

## Steps to Set Environment Variables on Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with its corresponding value
5. Redeploy your application

## Testing the Deployment

After setting up the environment variables, test your API endpoints:

1. **Health Check**: `GET /` - Should return "API is running"
2. **Signup**: `POST /api/signup` - Test user registration
3. **Login**: `POST /api/login` - Test user authentication

## Troubleshooting

If you still encounter issues:

1. Check Vercel logs for detailed error messages
2. Verify all environment variables are correctly set
3. Ensure MongoDB connection string is correct
4. Test Cloudinary configuration locally first

## Local Development

For local development, create a `.env` file in the back-end directory with the same variables.
