import { Request, Response } from 'express';
import { getRepository } from 'typeorm'; //todas as regras de como criar dados
import orphanageView from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';


export default {
    async index(req:Request, res: Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });
        /*const orphanages = await orphanagesRepository.find({
            where:
        });*/
        return res.json(orphanageView.renderMany(orphanages));
    },
    async show(req:Request, res: Response){
        const { id } = req.params;

        const orphanagesRepository = getRepository(Orphanage);
        //findOneOrfail retorna falha se naão achar o indice
        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations: ['images']
        });
        /*const orphanages = await orphanagesRepository.find({
            where:
        });*/
        //retorna só o que defini na view
        return res.json(orphanageView.render(orphanage));
    },
    async create(req:Request, res:Response){
        //pegando a variavel req.body
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = req.body;
        
        //aqui terá todos os metodos que ajuda personalizar o db
        const orphanagesRepository = getRepository(Orphanage);

        //aqui estou dizendo com as que o files é um array
        const reqImages = req.files as Express.Multer.File[];

        const images = reqImages.map(image=>{
            return {path: image.filename}
        })
        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends == 'true',
            images
        };
        //validação de dados com yup
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatorio!'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        });

        await schema.validate(data, {
            abortEarly: false, //se um dos campos estiverem invalido retorne erro
        });
        
        const orphanage = orphanagesRepository.create(data);
        
        await orphanagesRepository.save(orphanage);
        //o status é semantico, sendo interessante usa-lo
        return res.status(201).json(orphanage);
        }
};