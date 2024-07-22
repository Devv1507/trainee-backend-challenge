import app from './app';
import sequelize from './database/connection';

const PORT = process.env.PORT || 3000;

/**
 * Main
 *
 * @function main
 * @description Asynchronous function to test for errors during connection to the database.
 * If the connection is successful, it synchronizes the Sequelize models and starts the server on the specified port.
 * @throws {Error} If there is an error during the database connection or server initialization.
 */
async function main() {
  try {
    await sequelize.authenticate();
    console.log('✔️  Connection has been established successfully');
    await sequelize.sync({ force: false });
    console.log('✔️  Database synchronized successfully');

    // Configurated to listen on defined port (local or production)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log(
      `📜 Version 1 Docs are available on http://localhost:${PORT}/api/docs`
    );
  } catch (error: any) {
    console.error('❌  Error during database authentication:', error);
    process.exit(1); // Exit the process with an error code
  }
}

main();
