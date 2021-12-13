import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/container/providers/StorageProvider/IStorageProvider';
import { deleteFile } from '../../../../utils/files';
import { ICarsImagesRepository } from '../../repositories/ICarsImagesRepository';

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject('CarsImagesRepository')
        private carsImagesRepository: ICarsImagesRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
            this.storageProvider.save(image, 'cars');
        });
    }
}

export { UploadCarImagesUseCase };
