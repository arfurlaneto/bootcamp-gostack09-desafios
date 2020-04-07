import { subDays, startOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    return res.send(await Checkin.findAll({
      where: {
        student_id: id,
      },
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name'] },
      ],
    }));
  }

  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findOne({ where: { id } });

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const date = (subDays(startOfDay(new Date()), 6));
    const checkinsCount = await Checkin.count({
      where: {
        student_id: id,
        created_at: {
          [Op.gte]: date,
        },
      },
    });

    if (checkinsCount >= 5) {
      return res.status(400).json({ error: 'Only 5 checkins in past 7 days' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.send(checkin);
  }
}

export default new CheckinController();
