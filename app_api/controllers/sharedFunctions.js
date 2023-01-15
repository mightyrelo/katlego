const sendJSONResponse = (res, code, data) =>{
    res
     .status(code)
     .json(data)
}

module.exports = sendJSONResponse;