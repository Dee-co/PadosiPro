import prisma from "../utils/prisma.js";

export const getTasks = async (req, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;
    const [tasks, totalTasks] = await prisma.$transaction([
      prisma.task.findMany({
        skip,
        take: limit,
        orderBy: [
          {
            category: "asc",
          },
          {
            name: "asc",
          },
        ],
        select: {
          id: true,
          name: true,
          category: true,
          description: true,
        },
      }),
      prisma.task.count(),
    ]);
    const totalPages = Math.ceil(totalTasks / limit);
    return res.status(200).json({
      success: true,
      data: tasks,
      pagination: {
        page,
        limit,
        totalItems: totalTasks,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching tasks",
    });
  }
};
export const selectTasks = async (req, res) => {
  try {
    const { taskIds } = req.body;
    if (!Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'taskIds must be a non-empty array',
      });
    }
    const uniqueTaskIds = [...new Set(taskIds)];
    const existingTasks = await prisma.task.findMany({
      where: {
        id: {
          in: uniqueTaskIds,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingTasks.length !== uniqueTaskIds.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more task IDs are invalid',
      });
    }

    const userId = req.user.userId;
    await prisma.$transaction(async tx => {
      await tx.userTask.deleteMany({
        where: {
          userId,
        },
      });
      await tx.userTask.createMany({
        data: uniqueTaskIds.map(taskId => ({
          userId,
          taskId,
        })),
      });
    });
    const selectedTasks = await prisma.task.findMany({
      where: {
        id: {
          in: uniqueTaskIds,
        },
      },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
      },
      orderBy: [
        {
          category: 'asc',
        },
        {
          name: 'asc',
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: 'Tasks selected successfully',
      data: {
        tasks: selectedTasks,
      },
    });
  } catch (error) {
    console.error('Select tasks error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while selecting tasks',
    });
  }
};
export const getSelectedTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userTasks = await prisma.userTask.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      select: {
        id: true,
        createdAt: true,
        task: {
          select: {
            id: true,
            name: true,
            category: true,
            description: true,
          },
        },
      },
    });
    const tasks = userTasks.map(userTask => ({
      selectionId: userTask.id,
      selectedAt: userTask.createdAt,
      ...userTask.task,
    }));
    return res.status(200).json({
      success: true,
      data: {
        tasks,
        total: tasks.length,
      },
    });
  } catch (error) {
    console.error('Get selected tasks error:', error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching selected tasks',
    });
  }
};