const bcrypt = require('bcryptjs');
const helpers = {}

helpers.encryptPwd = (pwd) => {
    const hash =  bcrypt.hashSync(pwd,10)
    return hash
}

helpers.matchPwd = (pwd, savedPwd) => {
         bcrypt.compare(pwd,savedPwd,(err, result) => {
            return result
        })
    }


module.exports = helpers