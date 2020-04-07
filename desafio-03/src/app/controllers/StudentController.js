import Sequelize from 'sequelize';
import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    return res.json(await Student.findAll());
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      weight: Yup.number().required().min(0),
      height: Yup.number().required().min(0),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { name, email, weight, height } = req.body;

    const student = await Student.create({
      name, email, weight, height,
    });

    return res.json(student);
  }

  async show(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      weight: Yup.number().required().min(0),
      height: Yup.number().required().min(0),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const { name, email, weight, height } = req.body;

    const emailUsed = await Student.findOne({
      where: Sequelize.and(
        { email },
        { id: { [Sequelize.Op.ne]: id } },
      ),
    });

    if (emailUsed) {
      return res.status(400).json({ error: 'Email already used' });
    }

    await student.update({ name, email, weight, height });

    return res.json(student);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    await Student.destroy({ where: { id } });

    return res.send();
  }
}

export default new StudentController();
