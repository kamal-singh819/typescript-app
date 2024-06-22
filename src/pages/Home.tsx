import { useQuery } from "react-query";
import axios from "axios";
import { getCropStats, getYearlyProduction } from "../helper/dataPreparation";
export type CropData = {
    Country: string;
    Year: string;
    CropName: string;
    CropProduction: number;
    YieldOfCrops: number;
    AreaUnderCultivation: number;
};
export type YearlyProduction = {
    Year: string;
    MaxProductionCrop: string;
    MinProductionCrop: string;
};

export type CropStats = {
    CropName: string;
    AvgYield: number;
    AvgCultivationArea: number;
};

const Home: React.FC = () => {
    // function for data fetching using axios library
    const dataFetch = async (): Promise<CropData[]> => {
        const response = await axios.get("/data.json");
        return response.data.map((item: any) => ({
            Country: item.Country,
            Year: item.Year.substring(item.Year.length - 4),
            CropName: item['Crop Name'],
            CropProduction: Number(item['Crop Production (UOM:t(Tonnes))'] || '0'),
            YieldOfCrops: Number(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] || '0'),
            AreaUnderCultivation: Number(item['Area Under Cultivation (UOM:Ha(Hectares))'] || '0'),
        }));
    }
    // using React Query to manage the state fo data when it is being fetched
    const { data, error, isLoading } = useQuery<CropData[], Error>(["jsondata"], dataFetch);
    if (error) return <div>Error</div>;
    if (isLoading) return <div>Loading...</div>;

    //prepare data for first table
    const YearlyProduction = getYearlyProduction(data as CropData[]);
    //prepare data for second table
    const CropsStats = getCropStats(data as CropData[]);

    return (
        <div className="home">
            {/* first table */}
            <h3>Maximum and Minimum Production of a Crop per Year</h3>
            <div className="fullTable">
                <div className="tableRow">
                    <p style={{ fontSize: "18px", fontWeight: 700 }}>Year</p>
                    <p style={{ fontSize: "18px", fontWeight: 700 }}>Crop with Maximum Production in that Year</p>
                    <p style={{ fontSize: "18px", fontWeight: 700 }}>Crop with Minimum Production in that Year</p>
                </div>
                {YearlyProduction.map(ele => {
                    return <div className="tableRow">
                        <p>{ele.Year}</p>
                        <p>{ele.MaxProductionCrop}</p>
                        <p>{ele.MinProductionCrop}</p>
                    </div>
                })}
            </div>
            {/* second table */}
            <h3>Crops Statistics</h3>
            <div className="fullTable">
                <div className="tableRow">
                    <p style={{ fontSize: "18px", fontWeight: 700 }}>Crop</p>
                    <p style={{ fontSize: "18px", fontWeight: 700 }}>Average Yield of theCrop between 1950-2020</p>
                    <p style={{ fontSize: "18px", fontWeight: 700 }}>Average Cultivation Areaof the Crop between 1950-2020</p>
                </div>
                {CropsStats.map(ele => {
                    return <div className="tableRow">
                        <p>{ele.CropName}</p>
                        <p>{ele.AvgYield.toFixed(3)}</p>
                        <p>{ele.AvgCultivationArea.toFixed(3)}</p>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Home;
