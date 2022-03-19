let Incident = require('../models/incidents')

let incidents = [{
    id: 'abc123',
    title: 'Ticket 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    priority: 1,
    tag: ['tag1', 'tag2']
}, {
    id: 'abc222',
    title: 'Ticket 2',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. ',
    priority: 2,
    tag: []
}, {
    id: 'efz522',
    title: 'Ticket 3',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ',
    priority: 2,
    tag: ['tag1', 'tag5']
}
]



module.exports = class IncidentController {
    /**
     * show list of incident
     */
    static list(req, res, next) {
        Incident.find((err, incidents) => {
            if(err) {
                return next(err)
            }

            res.render('incident/list', {
                title: 'Incident list',
                incidents
            })
        })

        // res.render('incident/list', {
        //     title: 'Incident list',
        //     incidents
        // })
    }

    /**
     * render the create form
     */
    static renderCreateForm(req, res, next) {
        let incident = Incident()

        res.render('incident/form', {
            title: 'Create new Incident',
            incident
        })
    }

    /**
     * render the update form
     */
    static renderUpdateForm(req, res, next) {
        let id = req.params.id

        Incident.findById(id, (err, incident) => {
            if(err) {
                return next(err)
            }

            res.render('incident/form', {
                title: 'Create new Incident',
                incident
            })
        })
    }

    /**
     * create operation
     */
    static create(req, res, next) {
        let data = Incident(req.body)
        
        Incident.create(data, (err,incident) => {
            if(err) {
                return next(err)
            }

            res.redirect('/incidents')
        })
    }

    /**
     * update operation
     */
    static update(req, res, next) {
        let id = req.params.id
        let incident = Incident({
            _id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            priority: req.body.priority
        })
        
        Incident.updateOne({_id : id} , incident, (err) => {
            if(err) {
                return next(err)
            }

            res.redirect('/incidents')
        })
    }
    
    /**
     * delete operation
     */
    static delete(req, res, next) {
        let id = req.params.id
        Incident.remove({_id: id}, (err) => {
            if(err) {
                return next(err)
            }

            res.redirect('/incidents')
        })
    }
}