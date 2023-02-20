const bonusModel = require('../models/bonusModel');
const taskModel = require('../models/taskModel');
const mongoose = require('mongoose');
// const taskService = require('./taskService');

class BonusService {
    async addBonus(user, task) {
        let amount = 0
        const taskData = await taskModel.findById(task)
        if (taskData.deadlineStatus === 'afterSecond') {
            amount = -taskData.penalty
        } else {
            amount = taskData.firstReward;
        }
        const bonus = await bonusModel.create({user: user, task: task, amount: amount}); 
        return bonus;
    }

    async deleteBonus(task) {
        const bonus = await bonusModel.findOneAndDelete({task: task});
        return bonus;
    }

    async getAllBonusesByUserId(id) {
        const bonuses = await bonusModel.find({user: id});
        return bonuses;
    }

    async getAllBonusesByUserIdForWeek(id) {

        const getLastMonday = (date) => {

            let n = null; // last Monday conversion
            [0, 1, 2, 3, 4, 5, 6]
            switch (date.getDay()) {
                case 0: n = -6; break;
                case 1: n = 0; break;
                case 2: n = -1; break;
                case 3: n = -2; break;
                case 4: n = -3; break;
                case 5: n = -4; break;
                case 6: n = -5; break;
                default: "This never happens";
            }
        
            let today_date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            let last_monday_date = today_date.setDate(today_date.getDate() + n );
        
            return last_monday_date;
        }

        const today = new Date();
        const LAST_MONDAY = getLastMonday(today);

        const bonuses = bonusModel.aggregate( [
        { 
            $addFields: { 
                last_monday: { 
                    $dateFromParts : {
                        year: { $year: new Date(LAST_MONDAY) }, 
                        month: { $month: new Date(LAST_MONDAY) }, 
                        day: { $dayOfMonth: new Date(LAST_MONDAY) }
                    }
                },
                created_at: { 
                    $dateFromParts : {
                        year: { $year: "$createdAt" }, 
                        month: { $month: "$createdAt" }, 
                        day: { $dayOfMonth: "$createdAt" }
                    }
                }
            } 
        },
        { 
            $match: { 
                $and:[
                    {$expr: { $gt: [ "$created_at", "$last_monday" ]}},
                    {user: new mongoose.Types.ObjectId(id)}
                ]}
        },
        { 
            $project: { created_at: 0, last_monday: 0 } 
        }
        ] )
        return bonuses;
    }

    async getBonusByTaskId(id) {
        const bonus = await bonusModel.find({task: id});
        return bonus;
    }
}

module.exports = new BonusService();