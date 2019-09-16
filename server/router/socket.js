const Company = require('../models/company')

module.exports = function(io) {
    io.on('connection', (socket) => {
        socket.on('sendComment', (message) => {
            Company.findById(message.company_id, (err, company) => {
                if(err){
                    console.error('error:' + err)
                } else {  
                    if(company) {
                        company.comments.push(message.comment)
                        company.save()
                    }
                }
            })
            io.emit('sendOutComment', message.comment)
        })
    })
}