import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4, 5, 6, 3, 5, 3, 7, 5, 13, 5, 6, 4, 3, 6, 3, 6];

class PostController {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getAll); 
        this.router.post(`${this.path}/:id`, this.addData);     
        this.router.get(`${this.path}/:id`, this.getById);    
        this.router.delete(`${this.path}/:id`, this.deleteData); 
        this.router.get(`/api/posts/:num`, this.getData);  
        this.router.get(`/api/posts`, this.getAllData);
        this.router.delete(`/api/posts`, this.deleteAllData);  
    }

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;
        const { id } = request.params;
        const cleanedId = id.replace(':', ''); 
        const index = parseInt(cleanedId); 
        testArr.push(index);
        response.status(200).json(testArr);
    }

    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params; 
        const cleanedId = id.replace(':', ''); 
        const index = parseInt(cleanedId); 
        console.log(index);

        if (isNaN(index) || index < 0 || index >= testArr.length) {
            return response.status(404).json({ message: 'Element not found' });
        }
        const element = testArr[index]; 
        return response.status(200).json({element});
    }

    private deleteData = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const cleanedId = id.replace(':', ''); 
        const index = parseInt(cleanedId);
    
        if (isNaN(index) || index < 0 || index >= testArr.length) {
            return response.status(400).json({ error: 'Invalid index' });
        }

        const deletedElement = testArr.splice(index, 1);

        response.status(200).json({
            deletedElement: deletedElement[0],
            updatedArray: testArr,
        });
    };

    private getData = async (request: Request, response: Response, next: NextFunction) => {
        const { num } = request.params;
        const cleanedNum = num.replace(':', '');
        const count = parseInt(cleanedNum, 10);
    
        if (isNaN(count) || count <= 0) {
            return response.status(400).json({ error: 'Invalid number of elements' });
        }
        const result = testArr.slice(0, count);
    
        response.status(200).json({
            data: result,
        });
    };

    private getAllData = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json({data: testArr,});
    };
    
    private deleteAllData = async (request: Request, response: Response, next: NextFunction) => {
        testArr.length = 0;
        response.status(200).json({
            data: testArr, 
        });
    };
    
    
    
    
}

export default PostController;
