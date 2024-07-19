import app from './app';
import connection from './config/connection';
const PORT = process.env.PORT || 3000;

async function main() {
  try {
    // Initializing the server, configurated to listen on defined port (local or production)
    await connection.sync({ force: false });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.log(error);
  }
}

main();