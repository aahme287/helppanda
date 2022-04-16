
/**
 * user friendly error message display
 * 
 * @param {*} err 
 * @returns 
 */
module.exports.getErrorMessage = (err) => {
    console.log("===> Erro: " + err);
    let message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }
    } else if(err.errors) {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    } else {
        return err
    }
  
    return message;
};

