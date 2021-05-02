import clientUtils from '@utils/client-utils';
import constants from '@src/resourses/const';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    search(param){
        const parameters = (param.page?'?page='+param.page:'?page=0')+
        (param.size?'&size='+param.size:'&size=10')+
        (param.username?'&username='+param.username:'')+
        (param.fullName?'&fullName='+param.fullName:'')+
        (param.phoneNumber?'&phoneNumber='+param.phoneNumber:'')+
        (param.address?'&address='+param.address:'')+
        (param.email?'&email='+param.email:'')+
        (param.roles?'&role='+param.roles:'');
        
        
        console.log(parameters);

        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', constants.api.users + parameters, {}).then(x => {
                resolve(x)
            }).catch(e => {
                reject(e)
            })
        })
    }
}