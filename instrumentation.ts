import connectDb from "./src/lib/mongodb";

/* Start the database connection once we run the app */
export function register() {
  connectDb();
}
