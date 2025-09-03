import prisma from "../config/prisma";

export const getTransactions = async (req, res) => {
    try {
        // CEK USER LOGIN
        const transactions = await prisma.transaction.findMany({
            where: { userId: req.user.id },
        });

        res.json({
            code: 200,
            message: "Get transactions success",
            data: transactions
        });
    } catch (error) {
        console.log(error);
        res.json({
            code: 500,
            message: "Get transactions failed",
            error: error
        });
    }
}

export const addTransaction = async (req, res) => {
    const {title, amount, type} = req.body;

    try {
        const transaction = await prisma.transaction.create({
            data: {
                title,
                amount,
                type,
                userId: req.user.id
            }
        });

        res.json({
            code: 200,
            message: "Add transaction success",
            data: transaction
        });
        
    } catch (error) {
        console.log(error);
        res.json({
            code: 500,
            message: "Add transaction failed",
            error: error
        });
    }
}