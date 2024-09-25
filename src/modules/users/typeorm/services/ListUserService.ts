import { getCustomRepository } from "typeorm"
import UsersRepository from "../repositories/UsersRepository";
import User from "../entities/User";



class ListUserService{
    public async execute(): Promise<User[]>{
        const usersRepository = getCustomRepository(UsersRepository);

        const users = await usersRepository.find()

        return users;
    }
}

export default ListUserService;
