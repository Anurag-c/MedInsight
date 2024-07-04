const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");

const table = prisma.planPurchases;

exports.setPatientId = (req, res, next) => {
    if (!req.body.patientId) req.body.patientId = req.user.id;
    next();
};

// exports.createPurchasePlan = factory.createOne(table);
exports.getPurchasedPlan = factory.getOne(table);
exports.updatePurchasedPlan = factory.updateOne(table);
exports.deletePurchasedPlan = factory.deleteOne(table);


// I know this is stupid, but it was better than a schema change...
exports.createPurchasePlan = async (req, res, next) => {
    try {
        const { planId, patientId, price } = req.body;
        const purchasedPlan = await table.findFirst({
            where: {
                patientId: patientId,
            },
        });

        if (purchasedPlan) {
            const planPurchase = await table.update({
                where: {
                    id: purchasedPlan.id,
                },
                data: {
                    planId,
                    patientId,
                    price,
                },
            });
            res.status(201).json({
                status: "success",
                data: {
                    planPurchase,
                },
            });
        }else{
            const planPurchase = await table.create({
                data: {
                    planId,
                    patientId,
                    price,
                },
            });
            res.status(201).json({
                status: "success",
                data: {
                    planPurchase,
                },
            });
        }
    } catch (err) {
        next(err);
    }
}
