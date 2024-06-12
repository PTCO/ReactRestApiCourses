const express = require('express');
const { Model, where } = require('sequelize');
const User = require('../models').Users;
const Course = require('../models').Course
const authenticate = require('../middleware/authenticate');

const Router = express.Router();

Router.get('/courses', async (req, res, next)=>{
    try {
        const courses = await Course.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt']},
            include: [
                {
                    model: User,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password']},
                }
            ]
        });
        res.status(200).send(courses);
    } catch (error) {
        next(error)
    }
})

Router.get('/courses/:id', async (req, res, next)=>{
    try {
        const courses = await Course.findOne({
            where: {
                id: req.params.id
            },
            attributes: { exclude: ['createdAt', 'updatedAt']},
            include: [
                {
                    model: User,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password']},
                }
            ]
        });
        const error = new Error('Not Found');
        error.status = 404;
        if(!courses) throw error;
        res.status(200).send(courses);
    } catch (error) {
        next(error)
    }
})

Router.put('/courses/:id', async (req, res, next)=>{
    try {
        await Course.update(
            {
                title: req.body.title,
                description: req.body.desc,
                UserId: req.body.userId,
                estimatedTime: req.body.estTime,
                materialsNeeded: req.body.materials
            },
            {
                where: {
                    id: req.params.id
                },
            }
        );
        res.status(204).end();
    } catch (error) {
        next(error)
    }
})

Router.delete('/courses/:id', async (req, res, next)=>{
    try {
        const deleteCourse = await Course.findByPk(req.params.id)
        await deleteCourse.destroy();
        res.status(204).end();
    } catch (error) {
        next(error)
    }
})

Router.post('/courses', async (req, res, next)=>{
    try {
        console.log(req.body)
        const course = await Course.create({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.desc,
            estimatedTime: req.body.estTime,
            materialsNeeded: req.body.materials,
        })
        res.location('/courses/' + course.id).status(201).end();
    } catch (error) {
        next(error)
    }
})

module.exports = Router;