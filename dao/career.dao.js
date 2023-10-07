import { Career } from '../models';

export const createCareer = async (name,file_name, description ) => {

    try {
        return await Career.create({
           name: name,
            logo: 'public/career/' + file_name,
            description: description,
        });
    } catch (error) {
        console.log("loi te le");
  
        throw new Error(`${error},traceback  at createCareer function at bussiness.dao.js file`);
    }
  
  }