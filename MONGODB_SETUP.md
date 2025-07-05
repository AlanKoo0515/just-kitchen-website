# MongoDB Setup Guide

This guide will help you set up MongoDB with your Next.js project.

## Prerequisites

- Node.js and npm installed
- MongoDB Atlas account (or local MongoDB instance)
- Your MongoDB connection string

## Setup Steps

### 1. Create Environment File

Create a `.env.local` file in your project root with the following content:

```env
# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

**Replace `your_mongodb_connection_string_here` with your actual MongoDB URI.**

### 2. MongoDB URI Format

Your MongoDB URI should look like this:

```
mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

### 3. Install Dependencies

The required dependencies are already installed:

- `mongoose` - MongoDB ODM
- `dotenv` - Environment variable management

### 4. Test the Setup

1. Start your development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Use the MongoDB test interface to:
   - Test the database connection
   - Create users
   - Fetch users from the database

## Project Structure

```
src/
├── lib/
│   └── mongodb.ts          # MongoDB connection utility
├── models/
│   └── User.ts             # User model example
├── app/
│   ├── api/
│   │   ├── test-db/
│   │   │   └── route.ts    # Database connection test API
│   │   └── users/
│   │       └── route.ts    # User CRUD operations API
│   └── page.tsx            # Main page with MongoDB test interface
└── components/
    └── MongoDBTest.tsx     # React component for testing
```

## API Endpoints

- `GET /api/test-db` - Test MongoDB connection
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create a new user

## Creating Your Own Models

To create a new model, follow the pattern in `src/models/User.ts`:

```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface IYourModel extends Document {
  // Define your model properties here
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const YourModelSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.YourModel ||
  mongoose.model<IYourModel>("YourModel", YourModelSchema);
```

## Troubleshooting

### Connection Issues

- Ensure your MongoDB URI is correct
- Check if your IP address is whitelisted in MongoDB Atlas
- Verify your username and password are correct

### Environment Variables

- Make sure `.env.local` is in the project root
- Restart your development server after adding environment variables
- Check that the variable names match exactly (case-sensitive)

### Common Errors

- `MONGODB_URI is not defined` - Check your `.env.local` file
- `Authentication failed` - Verify your MongoDB credentials
- `Network timeout` - Check your internet connection and MongoDB Atlas settings

## Next Steps

Once you've confirmed the MongoDB connection is working:

1. Create your own models based on your application needs
2. Build API routes for your specific use cases
3. Implement authentication and authorization
4. Add data validation and error handling
5. Consider using MongoDB indexes for better performance

## Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
