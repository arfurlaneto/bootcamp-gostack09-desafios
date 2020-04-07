import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderAnsweredMail from '../jobs/HelpOrderAnsweredMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer_at: null,
      },
      include: { model: Student, as: 'student', attributes: ['id', 'name'] },
      order: [['created_at', 'DESC']],
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id, {
      include: { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Helper order does not exists' });
    }

    if (helpOrder.answer_at) {
      return res.status(400).json({ error: 'Helper order is already answered' });
    }

    const { answer } = req.body;

    await helpOrder.update({
      answer, answer_at: new Date(),
    });

    Queue.add(HelpOrderAnsweredMail.key, { helpOrder });

    return res.send(helpOrder);
  }
}

export default new AnswerController();
