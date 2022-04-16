const Incident = require('../models/incidents')
const common = require('../lib/common')


module.exports = class IncidentController {
    /**
     * show list of incident
     */
    static list(req, res, next) {
        console.log('in list')
        Incident.find((err, incidents) => {
            console.log('in find')
            if(err) {
                return next(common.getErrorMessage(err))
            }

            res.status(200).json(incidents)
        })
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
                return next(common.getErrorMessage(err))
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
        let data = Incident({
            _id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags.split(",").map(word => word.trim()),
            priority: req.body.priority
        })
        
        Incident.create(data, (err,incident) => {
            if(err) {
                return next(common.getErrorMessage(err))
            }

            res.status(200).json(incident);
        })
    }

    /**
     * update operation
     */
    static update(req, res, next) {
        let id = req.params.id
        let incident = Incident({
            _id: id,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags.split(",").map(word => word.trim()),
            priority: req.body.priority
        })
        
        Incident.updateOne({_id : id} , incident, (err) => {
            if(err) {
                return next(common.getErrorMessage(err))
            }

            return res.status(200).json({ 
                  success: true, 
                  message: 'Incdient updated successfully.'
                }
            );
        })
    }
    
    /**
     * delete operation
     */
    static delete(req, res, next) {
        let id = req.params.id
        Incident.remove({_id: id}, (err) => {
            if(err) {
                return next(common.getErrorMessage(err))
            }

            // refresh the book list
            return res.status(200).json({
                success: true,
                message: "Incident removed successfully."
            });
        })
    }
}