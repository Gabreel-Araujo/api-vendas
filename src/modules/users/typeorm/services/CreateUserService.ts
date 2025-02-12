import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError";
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";


interface IRequest{
    name: string,
    email: string,
    password: string
}

class CreateUserService{
    public async execute({name,email,password}: IRequest ):Promise <User>{

        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);

        if(emailExists){
            throw new AppError('email address already used.');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });
        await usersRepository.save(user);
        return user
    }

}

export default CreateUserService;
