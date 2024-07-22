"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./database/connection"));
const PORT = process.env.PORT || 3000;
/**
 * Main
 *
 * @function main
 * @description Asynchronous function to test for errors during connection to the database.
 * If the connection is successful, it synchronizes the Sequelize models and starts the server on the specified port.
 * @throws {Error} If there is an error during the database connection or server initialization.
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection_1.default.authenticate();
            console.log('✔️  Connection has been established successfully');
            yield connection_1.default.sync({ force: false });
            console.log('✔️  Database synchronized successfully');
            // Configurated to listen on defined port (local or production)
            app_1.default.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
            console.log(`📜 Version 1 Docs are available on http://localhost:${PORT}/api/docs`);
        }
        catch (error) {
            console.error('❌  Error during database authentication:', error);
            process.exit(1); // Exit the process with an error code
        }
    });
}
main();
//# sourceMappingURL=index.js.map