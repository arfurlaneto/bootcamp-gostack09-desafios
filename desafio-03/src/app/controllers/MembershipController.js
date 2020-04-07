import { addMonths, parseISO } from 'date-fns';
import * as Yup from 'yup';

import Student from '../models/Student';
import MembershipPlan from '../models/MembershipPlan';
import Membership from '../models/Membership';

import NewMembershipMail from '../jobs/NewMembershipMail';
import Queue from '../../lib/Queue';

class MembershipController {
  async index(req, res) {
    return res.json(await Membership.findAll({
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name'] },
        { model: MembershipPlan, as: 'plan', attributes: ['id', 'title'] },
      ],
    }));
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const plan = await MembershipPlan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Membership plan does not exists' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.totalPrice;

    const membership = await Membership.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    Queue.add(NewMembershipMail.key, { membership, student, plan });

    return res.json(membership);
  }

  async show(req, res) {
    const { id } = req.params;

    const membership = await Membership.findByPk(id, {
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name'] },
        { model: MembershipPlan, as: 'plan', attributes: ['id', 'title'] },
      ],
    });

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exists' });
    }

    return res.json(membership);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const membership = await Membership.findByPk(id);

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exists' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' });
    }

    const plan = await MembershipPlan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Membership plan does not exists' });
    }

    const end_date = addMonths(parseISO(start_date), plan.duration);
    const price = plan.totalPrice;

    await membership.update({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json(membership);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const membership = await Membership.findByPk(id);

    if (!membership) {
      return res.status(400).json({ error: 'Membership does not exists' });
    }

    await Membership.destroy({ where: { id } });

    return res.send();
  }
}

export default new MembershipController();
