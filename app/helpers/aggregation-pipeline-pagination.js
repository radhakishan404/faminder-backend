// import { FilterQuery } from "mongoose";

export const paginationPipeLine = (
    pageNo,
    filter = {},
    limit,
    sort,
    select = null
) => {
    const skip = (Number(pageNo)) * limit;

    const project = [
        {
            $addFields: {
                _id: "$_id",
            }
        }
    ]

    if (select)
        project.push({ $project: select })

    return [
        {
            $match: {
                ...filter,
            },
        },
        {
            $sort: sort,
        },

        {
            $facet: {
                total: [
                    {
                        $count: "count",
                    },
                ],
                data: project,
            },
        },
        {
            $unwind: "$total",
        },

        {
            $project: {
                result: {
                    $slice: [
                        "$data",
                        skip,
                        {
                            $ifNull: [limit, "$total.count"],
                        },
                    ],
                },
                count: "$total.count",
            },
        },
    ];
};
