import { Component } from "react";
import DeleteItem from "./delete_item";
import UpdateItem from "./update_item";

export default class GetAllItems extends Component {
    render() {
        const { items, uoms, uomsMap, loading, fetchItems } = this.props;

        if (loading) {
            return (
                <div className="w-100 text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="row">
            {items.length ? (
                items.map((item) => (
                    <div key={item.id} className="col-md-4 col-sm-6 col-12 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Name:<span className="text-grey"> {item.itemname}</span></h5>
                                <h5 className="card-title">Threshold:<span className="text-grey"> {item.threshold} {uomsMap[item.uomid] || "Unknown UOM"}</span></h5>
                                <div>
                                    <label></label>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <UpdateItem
                                        item={item}
                                        uoms={uoms}
                                        fetchItems={fetchItems}
                                    />
                                    <div className="me-3"></div>
                                    <DeleteItem
                                        item={item}
                                        fetchItems={fetchItems}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-12 text-center">No items found</div>
            )}
        </div>
);
    }
}
