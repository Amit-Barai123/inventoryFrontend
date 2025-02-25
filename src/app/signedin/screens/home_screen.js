import React, { Component } from 'react';
import DailyChartContainer from '../../../Component/ChartsComponent/DailyChartContainer';
import DateRangeConsumption from '../../../Component/ChartsComponent/DateRangeConsumption';
import DailyInventoryChartContainer from '../../../Component/ChartsComponent/DailyInventoryChartContainer';
import InventoryDateRangeItemsChart from '../../../Component/ChartsComponent/InventoryDateRangeItemsChart';


export default class WelcomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOperator, isAdmin, isOwner, currentUser } = this.props;
        let roleMessage = [];

        if (isOwner) {
            roleMessage.push("You are an owner");
        }
        if (isAdmin) {
            roleMessage.push("You are an admin");
        }
        if (isOperator) {
            roleMessage.push("You are an operator");
        }

        return (
            <div className="row mx-0 justify-content-center mb-5 mt-100">
                <div className="col-md-10 px-0">
                    <div className="row mx-0 p-3 shadow rounded-4">
                        <div className="px-0">
                            <h3 className="mb-3 text-warning">
                                Welcome {currentUser.username}...
                            </h3>

                            <div className="d-flex flex-column h-80">
                                <div className="card m-0 p-0 w-100 ">
                                    <div className="rounded-3 w-100 ">
                                        <div className="h-25">
                                           
                                            <DailyInventoryChartContainer/>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 mt-5"></div>
                                <div className="card m-0 p-0 w-100 ">
                                    <div className="w-100 rounded-3 ">
                                      
                                        <InventoryDateRangeItemsChart/>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-column mt-5 h-80">
                                <div className="card m-0 p-0 w-100 ">
                                    <div className="rounded-3 w-100 ">
                                        <div className="h-25">
                                           
                                            <DailyChartContainer/>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 mt-5"></div>
                                <div className="card m-0 p-0 w-100 ">
                                    <div className="w-100 rounded-3 ">
                                      
                                        <DateRangeConsumption/>
                                     
                                    </div>
                                </div>
                            </div>

                            <div className="p-2"></div>
                        </div>
                    </div>
                </div>
            </div>
       
        );
    }
}



