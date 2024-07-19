import app from './app';
import connection from './database/connection';
const PORT = process.env.PORT || 3000;

// Asyncronic function to test for errors during connection
async function main() {
  try {
    // Initializing the Sequelize-Postgres connection
    await connection.sync({ force: false });
    // Configurated to listen on defined port (local or production)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error: any) {
    console.log(error);
  }
}

main();