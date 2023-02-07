import { UserRequest } from '../../interface/user/CreateUser'

class CreateUserService {
    async execute(response: UserRequest) {
        console.log(response.name);
        return ({ ok: true })
    }
}

export { CreateUserService }