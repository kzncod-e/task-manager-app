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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "error while retrieving users", error });
    }
});
exports.getUsers = getUsers;
// export const createUser = async (req: Request, res: Response): Promise<void> => {
//   const { username, email } = req.body;
//   try {
//     const users = await prisma.user.create({data: { username,  } });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "error while retrieving users", error });
//   }
// };
