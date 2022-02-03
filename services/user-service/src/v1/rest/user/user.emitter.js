import EventEmitter from 'promise-events';
import {User} from './user.model';
import _ from 'lodash';
const eventEmitter = new EventEmitter()


eventEmitter.on('createUser', async(msg) => {
    try{
      //console.log(msg.data);
      const objectToUpdate = _.omit(msg.data, ['email', 'password', 'verifyCodeExpiration', 'verificationCode']);
      User.create(objectToUpdate)
      .then((response) =>{
        console.log("Response", response)
      })
      .catch(err => console.log("Err", err));

    }
    catch(error){
      console.log(error)
    }
  });
 

export default eventEmitter;