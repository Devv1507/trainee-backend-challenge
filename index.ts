import app from './app.js';

const PORT = process.env.PORT || 3000;

function main() {
  try {
    // Initializing the server, configurated to listen on defined port (local or production)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();