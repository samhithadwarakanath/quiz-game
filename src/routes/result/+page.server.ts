export const load = async ({ url }) => {
    const score = url.searchParams.get("score");
    const total = url.searchParams.get("total");

    return { score, total };
};
