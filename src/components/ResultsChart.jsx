import { useContext } from 'react';
import { 
    Chart, 
    LineController, 
    LineElement, 
    PointElement, 
    CategoryScale, 
    LinearScale,
    Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2'
import { useBoundStore } from '../utils/stores/boundStore';
import { ThemeContext } from '../hooks/useTheme';
import { themes } from "../static/themes/themes.json"

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip);

const ResultsChart = () => {
    const { webTheme } = useContext(ThemeContext)

    const {
        pointInTimeStats
    } = useBoundStore((state) => ({
        pointInTimeStats: state.pointInTimeStats,
    }))

    return <div id="chart-container">
        <Line
            data={
                {
                    labels: pointInTimeStats.map((stat, index) => index + 1),
                    datasets: [
                        {
                            label: 'Words per Minute',
                            data: pointInTimeStats.map(stat => stat.wpm),
                            borderColor: themes[webTheme].textSecondary,
                            backgroundColor:  themes[webTheme].textPrimary,
                            tension: 0.4,
                        },
                    ]
                }
            }
            options={{
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Time (seconds)',
                            color: themes[webTheme].textPrimary,
                            font: {
                                family: "Fira Code",
                                size: 12
                            }
                        },
                        ticks: {
                            color: themes[webTheme].textSecondary,
                            font: {
                                family: "Fira Code",
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Words per Minute',
                            color: themes[webTheme].textPrimary,  
                            font: {
                                family: "Fira Code",
                                size: 12
                            }
                        },
                        ticks: {
                            color: themes[webTheme].textSecondary,
                            font: {
                                family: "Fira Code",
                            }
                        },
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: (context) => `Time: ${context[0].parsed.x}s`,
                            label: (context) => `WPM: ${context.parsed.y.toPrecision(4)}`,
                        },
                        backgroundColor: themes[webTheme].backgroundSecondary,
                    },
                }
            }}
        />
    </div>;
};

export default ResultsChart;