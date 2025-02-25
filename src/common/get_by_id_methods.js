import ItemService from "../services/items_service";
import UomService from "../services/uom_service";
import VendorService from "../services/vendors_service";



export const fetchVendorsMap = async () => {
    try {
        const response = await VendorService.getAllVendors();
        const vendorsData = response.data.vendor.reduce((acc, vendor) => {
            acc[vendor.id] = vendor.vendorname;
            return acc;
        }, {});
        return vendorsData;
    } catch (error) {
        console.error("Error fetching vendors", error);
        return {}; 
    }
};


export const fetchItemsMap = async () => {
    try {
        const response = await ItemService.getAllItems();
        const itemsData = response.data.items.reduce((acc, item) => {
            acc[item.id] = item.itemname;
            return acc;
        }, {});
        return itemsData;
    } catch (error) {
        console.error("Error fetching items", error);
        return {}; 
    }
};

export const fetchUOMMap = async () => {
    try {
        const response = await UomService.getAllUoms();
        const uomData = response.data.uom.reduce((acc, uom) => {
            acc[uom.id] = uom.uomname;
            return acc;
        }, {});
        return uomData;
    } catch (error) {
        console.error("Error fetching UOM", error);
        return {}; 
    }
};