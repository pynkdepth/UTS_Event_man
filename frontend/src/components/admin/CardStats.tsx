import { ReactNode } from "react";

type CardStatsProps = {
    color: string;
    icon?: ReactNode;
    title: string;
    value: number;
    url: string;
};

export const CardStats = ({ title, value, color, icon, url }: CardStatsProps) => {
    return (
        <div className={`${color} text-white p-6 rounded-lg shadow-md`}>
            <h3 className="text-lg font-medium flex items-center">
                {title}
                {icon && <span className="ml-2 text-xl">{icon}</span>}
            </h3>
            <p className="text-3xl font-bold mt-2 mb-2">{value}</p>
            <a href={url} className="hover:underline">
                lihat selengkapnya
            </a>
        </div>
    );
};