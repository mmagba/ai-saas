import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

import { MAX_FREE_COUNTS } from "@/constants";

export const incrementApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const user = await prismadb.userApiLimit.findUnique({
        where: { userId: userId },
    });

    if (user) {
        await prismadb.userApiLimit.update({
            where: { userId: userId },
            data: { count: user.count + 1 },
        });
    } else {
        await prismadb.userApiLimit.create({
            data: { userId: userId, count: 1 },
        });
    }
};

export const checkApiLimit = async () => {
    const { userId } = auth();

    if (!userId) {
        return false;
    }

    const user = await prismadb.userApiLimit.findUnique({
        where: { userId: userId },
    });

    if (!user || user.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        return false;
    }
};


export const getApiLimitCount = async () => {
    const { userId } = auth();

    if (!userId) {
        return;
    }

    const user = await prismadb.userApiLimit.findUnique({
        where: { userId: userId }
    });

    if (!user) {
        return 0;
    } else {
        return user.count;
    }

}