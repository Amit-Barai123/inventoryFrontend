import React, { Component } from 'react';
import CreateVendor from '../components/vendors/create_vendor';
import GetAllVendors from '../components/vendors/get_all_vendors';


export default class VendorsScreen extends Component {
    constructor(props) {
        super(props);
        this.getAllVendorsRef = React.createRef();
    }

    getAllVendors = () => {
        if (this.getAllVendorsRef.current) {
            this.getAllVendorsRef.current.getAllVendors();
        }
    };

    render() {
        const { isOperator, isAdmin, isOwner } = this.props;
        return (
            <div className='mt-100'>
                <h2 className='text-center'>Vendors Page</h2>
                <CreateVendor getAllVendors={this.getAllVendors} />
                <GetAllVendors
                    ref={this.getAllVendorsRef}
                    isOperator={isOperator} isAdmin={isAdmin} isOwner={isOwner}
                />
            </div>
        );
    }
}
