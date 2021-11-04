import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        );

        const { id } = request.body;
        const avatar_file = request.file.filename;
        // receber arquivo

        await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };
