import { CropData, CropStats, YearlyProduction } from "../pages/Home";

const getYearlyProduction = (data: CropData[]): YearlyProduction[] => {
    const yearlyproductionMap: { [key: string]: { max: CropData, min: CropData } } = {};
    data.forEach(item => {
        const year = item.Year;
        if (!yearlyproductionMap[year]) yearlyproductionMap[year] = { max: item, min: item };
        else {
            if (item.CropProduction > yearlyproductionMap[year].max.CropProduction) yearlyproductionMap[year].max = item;
            if (item.CropProduction < yearlyproductionMap[year].min.CropProduction) yearlyproductionMap[year].min = item;
        }
    });
    return Object.keys(yearlyproductionMap).map(year => ({
        Year: year,
        MaxProductionCrop: yearlyproductionMap[year].max.CropName,
        MinProductionCrop: yearlyproductionMap[year].min.CropName
    }));
}

const getCropStats = (data: CropData[]): CropStats[] => {
    const cropStatsMap: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};
    data.forEach(item => {
        const crop = item.CropName;
        if (!cropStatsMap[crop]) {
            cropStatsMap[crop] = { totalYield: item.YieldOfCrops, totalArea: item.AreaUnderCultivation, count: 1 };
        } else {
            cropStatsMap[crop].totalYield += item.YieldOfCrops;
            cropStatsMap[crop].totalArea += item.AreaUnderCultivation;
            cropStatsMap[crop].count += 1;
        }
    });

    return Object.keys(cropStatsMap).map(crop => ({
        CropName: crop,
        AvgYield: cropStatsMap[crop].totalYield / cropStatsMap[crop].count,
        AvgCultivationArea: cropStatsMap[crop].totalArea / cropStatsMap[crop].count,
    }));
}
export { getYearlyProduction, getCropStats };