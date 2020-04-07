import * as Yup from 'yup';

import MembershipPlan from '../models/MembershipPlan';

class MembershipPlanController {
  async index(req, res) {
    return res.json(await MembershipPlan.findAll());
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required().min(0),
      price: Yup.number().required().min(0),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { title, duration, price } = req.body;

    const membershipPlan = await MembershipPlan.create({
      title, duration, price,
    });

    return res.json(membershipPlan);
  }

  async show(req, res) {
    const { id } = req.params;

    const membershipPlan = await MembershipPlan.findByPk(id);

    if (!membershipPlan) {
      return res.status(400).json({ error: 'Membership plan does not exists' });
    }

    return res.json(membershipPlan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required().min(0),
      price: Yup.number().required().min(0),
    });

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const membershipPlan = await MembershipPlan.findByPk(id);

    if (!membershipPlan) {
      return res.status(400).json({ error: 'Membership plan does not exists' });
    }

    const { title, duration, price } = req.body;

    await membershipPlan.update({ title, duration, price });

    return res.json(membershipPlan);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const membershipPlan = await MembershipPlan.findByPk(id);

    if (!membershipPlan) {
      return res.status(400).json({ error: 'Membership plan does not exists' });
    }

    await MembershipPlan.destroy({ where: { id } });

    return res.send();
  }
}

export default new MembershipPlanController();
