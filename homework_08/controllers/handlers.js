var fs = require('fs');
var storage = './data/storage.json';

exports.all = function (req, res) {
    fs.readFile(storage, function (err, data) {
        if (err) throw err;
        res.status(200).send({ response: 200, musicians: JSON.parse(data) });
    })
}

exports.findById = function (req, res) {
    fs.readFile(storage, function (err, data) {
        if (err) throw err;
        var musician = JSON.parse(data).find(function (musician) {
            return musician.id === Number(req.params.id);
        });
        if (musician) {
            res.status(200).send({ name: musician.name, band: musician.band })
        } else {
            res.status(404).send({ response: 404, message: 'Musician has been not found' })
        }
    });
}

exports.create = function (req, res) {
    fs.readFile(storage, function (err, data) {
        if (err) throw err;
        var json = JSON.parse(data);
        var musician = {
            id: req.body.id,
            name: req.body.name,
            band: req.body.band,
            instrument: req.body.instrument
        };
        if (!musician.id) {
            res.sendStatus(400);
            return;
        }
        for (let i = 0; i < json.length; i++) {
            if (musician.id == json[i].id) {
                res.status(409).send({ message: 'Musician already exist.' });
                break;
            } else if (i === json.length - 1) {
                json.push(musician);
                fs.writeFile(storage, JSON.stringify(json), function (err) {
                    if (err) throw err;
                    res.status(201).send({ response: 201, message: 'The handling was successfully' });
                })
                break;
            }
        }
    });
}

exports.update = function (req, res) {
    fs.readFile(storage, function (err, data) {
        if (err) throw err;
        var json = JSON.parse(data);
        var musician = json.find(function (musician) {
            return musician.id === Number(req.params.id);
        });
        if (musician) {
            musician.id = req.body.id;
            musician.name = req.body.name;
            musician.band = req.body.band;
            musician.instrument = req.body.instrument;
            fs.writeFile(storage, JSON.stringify(json), function (err) {
                if (err) throw err;
                res.status(200).send({ name: musician.name, band: musician.band });
            })
        } else {
            res.status(404).send({ response: 404, message: 'Musician has been not found' })
        }
    })
}

exports.delete = function (req, res) {
    fs.readFile(storage, function (err, data) {
        if (err) throw err;
        var json = JSON.parse(data);
        for (let i = 0; i < json.length; i++) {
            if (json[i].id === Number(req.params.id)) {
                json = json.filter(function (musician) {
                    return musician.id !== Number(req.params.id);
                });
                fs.writeFile(storage, JSON.stringify(json), function (err) {
                    if (err) throw err;
                    res.status(200).send({ response: 200, message: "Musician has been successfully removed." });
                });
                break;
            } else if (i === json.length - 1 && json[i].id !== Number(req.params.id)) {
                res.status(404).send({ response: 404, message: 'Musician has been not found' })
            }
        }
    });
}