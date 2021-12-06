import { inject, injectable } from 'tsyringe';
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
        private carsImagesRepository: ICarsImagesRepository
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        const carImages = await this.carsImagesRepository.findById(car_id);

        console.log(carImages.length);
        
        if (carImages) {
            carImages.map(async (image) => {
                if (image.image_name) {
                    console.log(image.image_name);
                    
                    await deleteFile(`./tmp/cars/${image.image_name}`)
                }
            })
        }

        // await deleteFile('./tmp/cars/*.JPG');

        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
        })
    }
}

export { UploadCarImagesUseCase };
