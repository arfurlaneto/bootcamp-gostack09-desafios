const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let reqCount = 0;

const countReqs = (req, res, next) => {
    console.log(`${++reqCount} requests!`)
    next();
}

const checkProjectId = (req, res, next) => {
    const { id } = req.params;

    const project = projects.find(p => p.id == id);
    if (!project) {
        return res.status(400).json({ message: 'Project does not exists'});
    }
    req.project = project;

    next();
};

server.post('/projects', countReqs, (req, res) => {
    const { id, title } = req.body;

    projects.push({ id, title, tasks: [] });

    return res.json(projects);
});

server.get('/projects', countReqs, (req, res) => {
    return res.json(projects);
});

server.put('/projects/:id', countReqs, checkProjectId, (req, res) => {
    const project = req.project;
    const { title } = req.body;

    project.title = title;

    return res.json(projects);
});

server.delete('/projects/:id', countReqs, checkProjectId, (req, res) => {
    const project = req.project;
    const index = projects.indexOf(project);

    projects.splice(index, 1);

    return res.send();
});

server.post('/projects/:id/tasks', countReqs, checkProjectId, (req, res) => {
    const project = req.project;
    const { title } = req.body;

    project.tasks.push(title);
    
    return res.json(projects);
});

server.listen(3000);
