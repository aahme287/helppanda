

module.exports = class IncidentController {
    static list(req, res, next) {
        res.render('incident/list', {
            title: 'Incident list'
        })
    }

    static renderCreateForm(req, res, next) {
        res.render('incident/form', {
            title: 'Create new Incident'
        })
    }

    static renderUpdateForm(req, res, next) {
        res.render('incident/form', {
            title: 'Create new Incident'
        })
    }

    static create(req, res, next) {
        res.send('create action')
    }

    static update(req, res, next) {
        res.send('update action')
    }
    
    static delete(req, res, next) {
        res.send('delete incident')
    }
}