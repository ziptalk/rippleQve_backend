import express from 'express';
import { Bot } from '../models/botModel';

const router = express.Router();

router.get('/api/onboarding', async (req, res) => {
    try {
        const totalInvestAmount = await Bot.aggregate([
            {
                $group: {
                    _id: null,
                    total_invest_amount: { $sum: "$investAmount" }
                }
            }
        ]);
        console.log(totalInvestAmount[0]?.total_invest_amount)
        res.json({ total_value_locked: totalInvestAmount[0]?.total_invest_amount || 0 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

export default router;