/* eslint-disable no-new */
/* eslint-disable arrow-body-style */

// import { getSummary } from "../api";
import Chartist from "chartist";
import DashboardMenu from "../components/DashboardMenu";

const DashboardScreen = {
    after_render: () => {
        new Chartist.Line(".ct-chart-line", {
            labels: ["05-22", "05-23", "05-24", "05-25", "05-26", "05-27"],
            series: [[60, 270, 200, 450, 300, 330]],
        },
        {
            showArea: true,
        }
        );

        new Chartist.Pie(".ct-chart-pie",{
            labels: ["Fruits", "Drinks", "Vegetables"],
            series: [30, 20, 50],
        },
        {
            donut: true,
            donutWidth: 60, 
            startAngle: 270,
            showLabel: true,
            donutSolid: true,
        });
    },
    render: async () => {
        // const summary = await getSummary();
        return `
            <div class="dashboard">
                ${DashboardMenu.render({selected:"dashboard"})}
                <div class="dashboard-content">
                    <h1>Dashboard</h1>
                    <ul class="summary-items">
                        <li>
                            <div class="summary-title color1">
                                <span><i class="bi bi-people-fill"></i> Users</span>
                            </div>
                            <div class="summary-body">
                                10
                            </div>
                        </li>
                        <li>
                            <div class="summary-title color2">
                                <span><i class="bi bi-bag-check"></i> Orders</span>
                            </div>
                            <div class="summary-body">
                                24
                            </div>
                        </li>
                        <li>
                            <div class="summary-title color3">
                                <span><i class="bi bi-cash-coin"></i> Sales</span>
                            </div>
                            <div class="summary-body">
                                $550
                            </div>
                        </li>
                    </ul>
                    <div class="charts">
                        <div>
                            <h2>Sales</h2>
                            <div class="ct-perfect-fourth ct-chart-line"></div>
                        </div>
                        <div>
                            <h2>Categories</h2>
                            <div class="ct-perfect-fourth ct-chart-pie"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
};

export default DashboardScreen;