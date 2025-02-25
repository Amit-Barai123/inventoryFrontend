import React, { Component } from 'react';
import GetAllUoms from '../components/uom/get_all_uoms';
import CreateUom from '../components/uom/create_uom';


export default class UomsScreen extends Component {
    constructor(props) {
        super(props);
        this.getAllUomsRef = React.createRef();
    }

    getAllUoms = () => {
        if (this.getAllUomsRef.current) {
            this.getAllUomsRef.current.getAllUoms();
        }
    };


    render() {
        return (
            <div className='mt-100'>
                 <h2 className='text-center'>Uom Page</h2>
                <CreateUom getAllUoms={this.getAllUoms}/>
                <GetAllUoms ref={this.getAllUomsRef}/>
            </div>
        );
    }
}
