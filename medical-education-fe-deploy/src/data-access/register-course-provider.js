import clientUtils from '@utils/client-utils';
import constants from '@src/resourses/const';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    search(param){
        const parameters = (param.page?'?page='+param.page:'?page=0')+
        (param.size?'&size='+param.size:'&size=10')+
        (param.name?'&name='+param.name:'')

        return new Promise((resolve, reject) => {
            clientUtils.requestApi('get', constants.api.registerCourse + parameters, {}).then(x => {
                resolve(x)
            }).catch(e => {
                reject(e)
            })
        })
    },
    register(param){
        return new Promise((resolve, reject) => {
            var body = {

            }
            clientUtils.requestApi('post', constants.api.registerCourse, body).then(x => {
                resolve(x)
            }).catch(e => {
                reject(e)
            })
        })
    }
}