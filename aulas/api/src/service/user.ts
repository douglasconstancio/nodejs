import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/user'

export class UserService {

    async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository)
        const { name, email } = request.body
        const userAlreadyExists = await userRepository.findOne({ email })

        if (userAlreadyExists) {
            return response.status(400).json({ error: 'User already exists' })
        }

        const user = userRepository.create({ name, email })

        await userRepository.save(user)

        return response.json(user)
    }

}
