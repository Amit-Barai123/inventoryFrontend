"use strict";(self.webpackChunkkims_frontend=self.webpackChunkkims_frontend||[]).push([[878],{1108:(e,s,t)=>{t.d(s,{A:()=>o});var n=t(5043),a=t(249),i=t(579);class l extends n.Component{constructor(e){super(e),this.handleChange=e=>{this.setState({selectedValue:e}),this.props.onUpdateSelectedValue(e)},this.state={selectedValue:this.props.selectedValue||(this.props.isMulti?[]:"")}}componentDidUpdate(e){e.selectedValue!==this.props.selectedValue&&this.setState({selectedValue:this.props.selectedValue||(this.props.isMulti?[]:"")})}render(){const{selectedValue:e}=this.state,{data:s,placeholder:t,width:n,placeholderColor:l,menuPlacement:o,isMulti:r}=this.props;return(0,i.jsx)("div",{className:"DropDownList m-1 "+(n?`w-${n}`:""),children:(0,i.jsx)(a.Ay,{className:"dropdown",placeholder:t,value:e,options:s,onChange:this.handleChange,isMulti:r,isClearable:!0,styles:{control:e=>({...e,cursor:"pointer"}),placeholder:e=>({...e,color:l||"#6c757d"}),menu:e=>({...e,overflow:"hidden"}),menuList:e=>({...e,maxHeight:200,overflowY:"auto"})},menuPlacement:o||"auto"})})}}const o=l},878:(e,s,t)=>{t.r(s),t.d(s,{default:()=>C});var n=t(5043),a=t(8087),i=t(1036),l=t(1108),o=t(2153),r=t(579);class c extends n.Component{constructor(e){super(e),this.handleInputChange=e=>{this.setState({[e.target.name]:e.target.value})},this.handleVendorChange=e=>{this.setState({vendor_id:e})},this.handleCreate=async()=>{const{fetchInvoices:e}=this.props,{invoice_number:s,vendor_id:t,invoice_date:n,received_date:a,waybill_number:l,vehicle_number:r,received_by:c,cgst:d,sgst:h,gst:m,total_amount:v}=this.state;if(!t||!t.value)return void i.oR.error("Please select a valid vendor.");const u={invoice_number:s,vendor_id:t.value,invoice_date:n,received_date:a,waybill_number:l,vehicle_number:r,received_by:c,cgst:d,sgst:h,gst:m,total_amount:v};try{await o.A.createInvoice(u),e(),i.oR.success("Invoice created successfully"),this.resetForm(),this.props.onHide()}catch(p){console.error(p),i.oR.error("Failed to create invoice.")}},this.resetForm=()=>{this.setState({invoice_number:"",vendor_id:"",invoice_date:"",received_date:"",waybill_number:"",vehicle_number:"",received_by:"",cgst:"",sgst:"",gst:"",total_amount:""})},this.state={invoice_number:"",vendor_id:"",invoice_date:"",received_date:"",waybill_number:"",vehicle_number:"",received_by:"",cgst:"",sgst:"",gst:"",total_amount:"",vendors:[]}}render(){const{show:e,onHide:s,vendors:t}=this.props,{invoice_number:n,vendor_id:i,invoice_date:o,received_date:c,waybill_number:d,vehicle_number:h,received_by:m,cgst:v,sgst:u,gst:p,total_amount:b}=this.state;return(0,r.jsx)(a.A,{show:e,onHide:s,centered:!0,children:(0,r.jsxs)("div",{className:"modal-content",style:{width:"600px"},children:[(0,r.jsxs)("div",{className:"modal-header",children:[(0,r.jsx)("h5",{className:"modal-title",children:"Create Invoice"}),(0,r.jsx)("button",{type:"button",className:"btn-close",onClick:s})]}),(0,r.jsxs)("div",{className:"modal-body mb-3",children:[(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"col-md-6",children:[(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"invoice_number",className:"mb-2",children:"Invoice Number"}),(0,r.jsx)("input",{type:"text",className:"form-control",name:"invoice_number",id:"invoice_number",placeholder:"Enter Invoice Number",value:n,onChange:this.handleInputChange})]}),(0,r.jsxs)("div",{className:"form-group mt-3",children:[(0,r.jsx)("label",{htmlFor:"vendor_id",className:"mb-2",children:"Vendor"}),(0,r.jsx)(l.A,{name:"vendor_id",placeholder:"Select Vendor",data:t.map((e=>({value:e.id,label:e.vendorname}))),onUpdateSelectedValue:this.handleVendorChange,selectedValue:i})]}),(0,r.jsxs)("div",{className:"form-group mt-3",children:[(0,r.jsx)("label",{htmlFor:"invoice_date",className:"mb-2",children:"Invoice Date"}),(0,r.jsx)("input",{type:"date",className:"form-control",name:"invoice_date",id:"invoice_date",value:o,onChange:this.handleInputChange})]})]}),(0,r.jsxs)("div",{className:"col-md-6",children:[(0,r.jsxs)("div",{className:"form-group mt-3 mt-md-0",children:[(0,r.jsx)("label",{htmlFor:"waybill_number",className:"mb-2",children:"Waybill Number"}),(0,r.jsx)("input",{type:"text",className:"form-control",name:"waybill_number",id:"waybill_number",placeholder:"Enter Waybill Number",value:d,onChange:this.handleInputChange})]}),(0,r.jsxs)("div",{className:"form-group mt-3",children:[(0,r.jsx)("label",{htmlFor:"vehicle_number",className:"mb-2",children:"Vehicle Number"}),(0,r.jsx)("input",{type:"text",className:"form-control",name:"vehicle_number",id:"vehicle_number",placeholder:"Enter Vehicle Number",value:h,onChange:this.handleInputChange})]}),(0,r.jsxs)("div",{className:"form-group mt-3",children:[(0,r.jsx)("label",{htmlFor:"received_by",className:"mb-2",children:"Received By"}),(0,r.jsx)("input",{type:"text",className:"form-control",name:"received_by",id:"received_by",placeholder:"Enter Received By",value:m,onChange:this.handleInputChange})]})]})]}),(0,r.jsxs)("div",{className:"row mt-3",children:[(0,r.jsx)("div",{className:"col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"received_date",className:"mb-2",children:"Received Date"}),(0,r.jsx)("input",{type:"date",className:"form-control",name:"received_date",id:"received_date",value:c,onChange:this.handleInputChange})]})}),(0,r.jsx)("div",{className:"col-md-3",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"cgst",className:"mb-2",children:"CGST"}),(0,r.jsx)("input",{type:"number",className:"form-control",name:"cgst",id:"cgst",placeholder:"Enter CGST Amount",value:v,onChange:this.handleInputChange})]})}),(0,r.jsx)("div",{className:"col-md-3",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"sgst",className:"mb-2",children:"SGST"}),(0,r.jsx)("input",{type:"number",className:"form-control",name:"sgst",id:"sgst",placeholder:"Enter SGST Amount",value:u,onChange:this.handleInputChange})]})})]}),(0,r.jsxs)("div",{className:"row mt-3",children:[(0,r.jsx)("div",{className:"col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"gst",className:"mb-2",children:"GST"}),(0,r.jsx)("input",{type:"number",className:"form-control",name:"gst",id:"gst",placeholder:"Enter GST Amount",value:p,onChange:this.handleInputChange})]})}),(0,r.jsx)("div",{className:"col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"total_amount",className:"mb-2",children:"Total Amount"}),(0,r.jsx)("input",{type:"number",className:"form-control",name:"total_amount",id:"total_amount",placeholder:"Enter Total Amount",value:b,onChange:this.handleInputChange})]})})]})]}),(0,r.jsxs)("div",{className:"modal-footer",children:[(0,r.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:s,children:"Cancel"}),(0,r.jsx)("button",{type:"button",className:"btn btn-primary",onClick:this.handleCreate,children:"Create Invoice"})]})]})})}}const d=c;class h extends n.Component{constructor(e){super(e),this.openInvoiceModal=()=>{this.setState({showInvoiceModal:!0})},this.closeInvoiceModal=()=>{this.setState({showInvoiceModal:!1})},this.state={showInvoiceModal:!1}}render(){const{showInvoiceModal:e}=this.state,{fetchInvoices:s,vendors:t}=this.props;return(0,r.jsx)("div",{className:"container  justify-content-center",children:(0,r.jsxs)("div",{className:"d-flex justify-content-start",children:[(0,r.jsx)("button",{className:"btn btn-primary",onClick:()=>this.openInvoiceModal(),children:"Create Invoice"}),(0,r.jsx)(d,{show:e,onHide:this.closeInvoiceModal,fetchInvoices:s,vendors:t})]})})}}var m=t(4282);class v extends n.Component{render(){const{show:e,onHide:s,onDelete:t,invoice:n}=this.props;return(0,r.jsxs)(a.A,{show:e,onHide:s,children:[(0,r.jsx)(a.A.Header,{closeButton:!0,children:(0,r.jsx)(a.A.Title,{children:"Delete Invoice"})}),(0,r.jsx)(a.A.Body,{children:(0,r.jsxs)("p",{children:["Are you sure you want to delete the Invoice ",(0,r.jsx)("strong",{children:null===n||void 0===n?void 0:n.invoice_number}),"?"]})}),(0,r.jsxs)(a.A.Footer,{children:[(0,r.jsx)(m.A,{variant:"secondary",onClick:s,children:"Cancel"}),(0,r.jsx)(m.A,{variant:"danger",onClick:t,children:"Delete"})]})]})}}class u extends n.Component{constructor(e){super(e),this.openDeleteModal=()=>{this.setState({showDeleteModal:!0})},this.closeDeleteModal=()=>{this.setState({showDeleteModal:!1})},this.handleDelete=async()=>{const{invoice:e,fetchInvoices:s}=this.props;try{await o.A.deleteInvoice(e.invoice_number),i.oR.success(`Invoice ${e.invoicename} deleted successfully`),this.closeDeleteModal(),s()}catch(t){t.response&&t.response.data.error.includes("violates foreign key constraint")?(this.closeDeleteModal(),i.oR.error("Invoice cannot be deleted as it is connected to others.")):i.oR.error("Failed to delete Invoice"),console.error(t)}},this.state={showDeleteModal:!1}}render(){const{showDeleteModal:e}=this.state,{invoice:s}=this.props;return(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{role:"button",className:"btn btn-danger ",title:"Delete Invoice",onClick:this.openDeleteModal,children:(0,r.jsx)("i",{className:"bi bi-trash-fill"})}),(0,r.jsx)(v,{show:e,onHide:this.closeDeleteModal,onDelete:this.handleDelete,invoice:s})]})}}var p=t(3514);class b extends n.Component{constructor(e){super(e),this.loadInvoiceData=()=>{const{invoice:e,vendors:s}=this.props;if(e){const t=s.find((s=>s.id===e.vendor_id));this.setState({invoice_number:e.invoice_number,vendor_id:{value:e.vendor_id,label:t.vendorname},invoice_date:(0,p._)(e.invoice_date),received_date:(0,p._)(e.received_date),waybill_number:e.waybill_number,vehicle_number:e.vehicle_number,received_by:e.received_by,cgst:e.cgst,sgst:e.sgst,gst:e.gst,total_amount:e.total_amount})}},this.handleInputChange=e=>{this.setState({[e.target.name]:e.target.value})},this.handleVendorChange=e=>{this.setState({vendor_id:e})},this.handleUpdate=async()=>{const{fetchInvoices:e,invoice:s}=this.props,{invoice_number:t,vendor_id:n,invoice_date:a,received_date:l,waybill_number:r,vehicle_number:c,received_by:d,cgst:h,sgst:m,gst:v,total_amount:u}=this.state,p={invoice_number:t,vendor_id:n.value,invoice_date:a,received_date:l,waybill_number:r,vehicle_number:c,received_by:d,cgst:h,sgst:m,gst:v,total_amount:u};try{await o.A.updateInvoice(s.invoice_number,p),e(),i.oR.success("Invoice updated successfully"),this.resetForm(),this.props.onHide()}catch(b){console.log(b),i.oR.error("Failed to update invoice.")}},this.resetForm=()=>{this.setState({invoice_number:"",vendor_id:"",invoice_date:"",received_date:"",waybill_number:"",vehicle_number:"",received_by:"",cgst:"",sgst:"",gst:"",total_amount:""})},this.state={invoice_number:"",vendor_id:"",invoice_date:"",received_date:"",waybill_number:"",vehicle_number:"",received_by:"",cgst:"",sgst:"",gst:"",total_amount:""}}componentDidMount(){this.loadInvoiceData()}componentDidUpdate(e){e.invoice!==this.props.invoice&&this.loadInvoiceData()}render(){const{show:e,onHide:s,vendors:t}=this.props,{invoice_number:n,vendor_id:i,invoice_date:o,received_date:c,waybill_number:d,vehicle_number:h,received_by:m,cgst:v,sgst:u,gst:p,total_amount:b}=this.state;return(0,r.jsx)(a.A,{show:e,onHide:s,centered:!0,children:(0,r.jsxs)("div",{className:"modal-content",style:{width:"600px"},children:[(0,r.jsxs)("div",{className:"modal-header",children:[(0,r.jsx)("h5",{className:"modal-title",children:"Update Invoice"}),(0,r.jsx)("button",{type:"button",className:"btn-close",onClick:s})]}),(0,r.jsxs)("div",{className:"modal-body mb-3",children:[(0,r.jsxs)("div",{className:"row",children:[(0,r.jsxs)("div",{className:"col-md-6",children:[(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"invoice_number",className:"mb-2",children:"Invoice Number"}),(0,r.jsx)("input",{type:"text",className:"form-control",name:"invoice_number",id:"invoice_number",placeholder:"Enter Invoice Number",value:n,onChange:this.handleInputChange})]}),(0,r.jsxs)("div",{className:"form-group mt-3",children:[(0,r.jsx)("label",{htmlFor:"vendor_id",className:"mb-2",children:"Vendor"}),(0,r.jsx)(l.A,{name:"vendor_id",placeholder:"Select Vendor",data:t.map((e=>({value:e.id,label:e.vendorname}))),onUpdateSelectedValue:this.handleVendorChange,selectedValue:i})]}),(0,r.jsxs)("div",{className:"form-group mt-3",children:[(0,r.jsx)("label",{htmlFor:"invoice_date",className:"mb-2",children:"Invoice Date"}),(0,r.jsx)("input",{type:"date",className:"form-control",name:"invoice_date",id:"invoice_date",value:o,onChange:this.handleInputChange})]})]}),(0,r.jsxs)("div",{className:"col-md-6",children:[(0,r.jsxs)("div",{className:"form-group mt-3 mt-md-0",children:[(0,r.jsx)("label",{htmlFor:"waybill_number",className:"mb-2",children:"Waybill Number"}),(0,r.jsx)("input",{type:"text",className:"form-control",name:"waybill_number",id:"waybill_number",placeholder:"Enter Waybill Number",value:d,onChange:this.handleInputChange})]}),(0,r.jsxs)("div",{className:"form-group mt-3",children:[(0,r.jsx)("label",{htmlFor:"vehicle_number",className:"mb-12px",children:"Vehicle Number"}),(0,r.jsx)("input",{type:"text",className:"form-control",name:"vehicle_number",id:"vehicle_number",placeholder:"Enter Vehicle Number",value:h,onChange:this.handleInputChange})]}),(0,r.jsxs)("div",{className:"form-group mt-3",children:[(0,r.jsx)("label",{htmlFor:"received_by",className:"mb-2",children:"Received By"}),(0,r.jsx)("input",{type:"text",className:"form-control",name:"received_by",id:"received_by",placeholder:"Enter Received By",value:m,onChange:this.handleInputChange})]})]})]}),(0,r.jsxs)("div",{className:"row mt-3",children:[(0,r.jsx)("div",{className:"col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"received_date",className:"mb-2",children:"Received Date"}),(0,r.jsx)("input",{type:"date",className:"form-control",name:"received_date",id:"received_date",value:c,onChange:this.handleInputChange})]})}),(0,r.jsx)("div",{className:"col-md-3",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"cgst",className:"mb-2",children:"CGST"}),(0,r.jsx)("input",{type:"number",className:"form-control",name:"cgst",id:"cgst",placeholder:"Enter CGST Amount",value:v,onChange:this.handleInputChange})]})}),(0,r.jsx)("div",{className:"col-md-3",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"sgst",className:"mb-2",children:"SGST"}),(0,r.jsx)("input",{type:"number",className:"form-control",name:"sgst",id:"sgst",placeholder:"Enter SGST Amount",value:u,onChange:this.handleInputChange})]})})]}),(0,r.jsxs)("div",{className:"row mt-3",children:[(0,r.jsx)("div",{className:"col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"gst",className:"mb-2",children:"GST"}),(0,r.jsx)("input",{type:"number",className:"form-control",name:"gst",id:"gst",placeholder:"Enter GST Amount",value:p,onChange:this.handleInputChange})]})}),(0,r.jsx)("div",{className:"col-md-6",children:(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"total_amount",className:"mb-2",children:"Total Amount"}),(0,r.jsx)("input",{type:"number",className:"form-control",name:"total_amount",id:"total_amount",placeholder:"Enter Total Amount",value:b,onChange:this.handleInputChange})]})})]})]}),(0,r.jsxs)("div",{className:"modal-footer",children:[(0,r.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:s,children:"Cancel"}),(0,r.jsx)("button",{type:"button",className:"btn btn-primary",onClick:this.handleUpdate,children:"Update Invoice"})]})]})})}}const g=b;class x extends n.Component{constructor(e){super(e),this.openUpdateInvoiceModal=()=>{this.setState({showUpdateInvoiceModal:!0})},this.closeUpdateInvoiceModal=()=>{this.setState({showUpdateInvoiceModal:!1})},this.state={showUpdateInvoiceModal:!1}}render(){const{showUpdateInvoiceModal:e}=this.state,{invoice:s,vendors:t,fetchInvoices:n}=this.props;return(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{role:"button",onClick:this.openUpdateInvoiceModal,className:"btn btn-primary",title:"Edit Invoice",children:(0,r.jsx)("i",{className:"bi bi-pencil-fill"})}),s&&(0,r.jsx)(g,{show:e,onHide:this.closeUpdateInvoiceModal,invoice:s,vendors:t,fetchInvoices:n})]})}}var j=t(6178),_=t.n(j);class N extends n.Component{render(){const{invoices:e,loading:s,search:t,vendorsMap:n,vendors:a,handleSearchChange:i,fetchInvoices:l,isOwner:o,currentPage:c,rowsPerPage:d,handlePageChange:h,totalInvoices:m,handleRowsPerPageChange:v,totalPages:p}=this.props;return s?(0,r.jsx)("div",{className:"w-100 text-center mt-5",children:(0,r.jsx)("div",{className:"spinner-border",role:"status",children:(0,r.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}):(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)("div",{className:"mb-3 d-flex mt-3 justify-content-between align-items-center",children:[(0,r.jsx)("input",{type:"text",className:"form-control w-50",placeholder:"Search Vendors",onChange:i}),(0,r.jsxs)("button",{onClick:()=>window.print(),className:"btn btn-success",children:[(0,r.jsx)("span",{className:"bi bi-printer-fill"})," Print"]})]}),(0,r.jsxs)("div",{className:"table-responsive",children:[(0,r.jsxs)("table",{className:"table table-striped table table-bordered text-center table-striped table-responsive",children:[(0,r.jsx)("thead",{className:"bg-dark text-white",children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Invoice Number"}),(0,r.jsx)("th",{children:"Vendor Name"}),(0,r.jsx)("th",{children:"Invoice Date"}),(0,r.jsx)("th",{children:"Received Date"}),(0,r.jsx)("th",{children:"Waybill Number"}),(0,r.jsx)("th",{children:"Vehicle Number"}),(0,r.jsx)("th",{children:"Total Amount"}),(0,r.jsx)("th",{children:"Actions"})]})}),(0,r.jsx)("tbody",{children:e.length?e.map((e=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{children:e.invoice_number}),(0,r.jsx)("td",{children:n[e.vendor_id]||"Unknown Vendor"}),(0,r.jsx)("td",{children:_()(e.invoice_date).format("MMM D, YYYY")}),(0,r.jsx)("td",{children:_()(e.received_date).format("MMM D, YYYY")}),(0,r.jsx)("td",{children:e.waybill_number}),(0,r.jsx)("td",{children:e.vehicle_number}),(0,r.jsxs)("td",{children:["\u20b9 ",e.total_amount.toFixed(2)]}),(0,r.jsxs)("td",{className:"d-flex",children:[(0,r.jsx)(x,{invoice:e,vendors:a,fetchInvoices:l}),(0,r.jsx)("div",{className:"me-4"}),o&&(0,r.jsx)(u,{invoice:e,fetchInvoices:l})]})]},e.id))):(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:"8",className:"text-center",children:"No invoices found"})})})]}),(0,r.jsxs)("div",{className:"row justify-content-between mt-3",children:[(0,r.jsx)("div",{className:"col-auto"}),(0,r.jsx)("div",{className:"d-flex justify-content-start",children:(0,r.jsx)("nav",{children:(0,r.jsxs)("ul",{className:"pagination",children:[(0,r.jsx)("li",{className:"page-item "+(1===c?"disabled":""),children:(0,r.jsx)("button",{className:"page-link",onClick:()=>h(c-1),children:"Previous"})}),Array.from({length:Math.ceil(m/d)},((e,s)=>(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("li",{className:"page-item "+(c===s+1?"active":""),children:(0,r.jsx)("button",{className:"page-link",onClick:()=>h(s+1),children:s+1})},s+1)}))),(0,r.jsx)("li",{className:"page-item "+(c===p?"disabled":""),children:(0,r.jsx)("button",{className:"page-link",onClick:()=>this.handlePageChange(c+1),children:"Next"})}),(0,r.jsx)("li",{children:(0,r.jsxs)("select",{className:"form-select ms-2",value:d,onChange:v,children:[(0,r.jsx)("option",{value:"10",children:"10 rows"}),(0,r.jsx)("option",{value:"15",children:"15 rows"}),(0,r.jsx)("option",{value:"20",children:"20 rows"}),(0,r.jsx)("option",{value:"25",children:"25 rows"})]})})]})})})]})]})]})}}var y=t(2026);class C extends n.Component{constructor(e){super(e),this.fetchMap=e=>e.reduce(((e,s)=>(e[s.id]=null===s||void 0===s?void 0:s.vendorname,e)),{}),this.handleSearchChange=e=>{this.setState({search:e.target.value})},this.handlePageChange=e=>{this.setState({currentPage:e,loading:!0},(()=>{this.getAllInvoices(e,this.state.rowsPerPage)}))},this.handleRowsPerPageChange=e=>{const s=parseInt(e.target.value,10);this.setState({rowsPerPage:s,loading:!0},(()=>{this.getAllInvoices(1,s)}))},this.state={invoices:[],vendors:[],vendorsMap:{},loading:!0,search:"",currentPage:1,rowsPerPage:10,totalInvoices:0,totalPages:1}}componentDidMount(){0===Object.keys(this.state.vendorsMap).length?(console.log("Item Map is empty, fetching data first..."),this.loadVendors().then((()=>{this.getAllInvoices()}))):this.getAllInvoices()}getAllInvoices(){const e={page:arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,rowsPerPage:arguments.length>1&&void 0!==arguments[1]?arguments[1]:10};o.A.getAllInvoiceWithPagenation(e).then((e=>{const s=e.data.pagination||{};this.setState({invoices:e.data.invoices||[],loading:!1,currentPage:s.currentPage||1,rowsPerPage:s.rowsPerPage||10,totalInvoices:s.totalInvoices||0,totalPages:s.totalPages||1}),console.log(`Invoices data: ${JSON.stringify(e.data)}`)})).catch((e=>{console.error("Error fetching invoices:",e),this.setState({loading:!1,invoices:[]})}))}async loadVendors(){try{const e=(await y.A.getAllVendors()).data.vendor||[],s=this.fetchMap(e);this.setState({vendors:e,vendorsMap:s})}catch(e){console.error("Error fetching vendors:",e)}}render(){const{invoices:e,loading:s,search:t,vendorsMap:n,vendors:a,currentPage:i,rowsPerPage:l,totalInvoices:o,totalPages:c}=this.state,{isOperator:d,isAdmin:m,isOwner:v}=this.props,u=e.filter((e=>{var s,a;const i=(null===(s=n[e.vendor_id])||void 0===s?void 0:s.toLowerCase())||"";return(null===(a=e.invoice_number)||void 0===a?void 0:a.toLowerCase().includes(t.toLowerCase()))||i.includes(t.toLowerCase())}));return s?(0,r.jsx)("div",{className:"w-100 text-center mt-5",children:(0,r.jsx)("div",{className:"spinner-border",role:"status",children:(0,r.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}):(0,r.jsxs)("div",{className:"mt-100",children:[(0,r.jsx)("h2",{className:"text-center",children:"Invoice Page"}),(0,r.jsx)(h,{fetchInvoices:()=>this.getAllInvoices(),vendors:a}),(0,r.jsx)(N,{invoices:u,loading:s,search:t,vendors:a,vendorsMap:n,handleSearchChange:this.handleSearchChange,fetchInvoices:(e,s)=>this.getAllInvoices(e,s),totalInvoices:o,currentPage:i,rowsPerPage:l,totalPages:c,handlePageChange:this.handlePageChange,handleRowsPerPageChange:this.handleRowsPerPageChange,isOperator:d,isAdmin:m,isOwner:v})]})}}},3514:(e,s,t)=>{t.d(s,{_:()=>n});const n=e=>new Date(e).toISOString().split("T")[0]},2153:(e,s,t)=>{t.d(s,{A:()=>a});var n=t(214);class a{static createInvoice(e){return n.A.post("/invoice",e)}static getAllInvoices(){return n.A.get("/invoices")}static getAllInvoiceWithPagenation(e){return n.A.post("/invoices-list",e)}static getInvoiceById(e){return n.A.get(`/invoice/${e}`)}static updateInvoice(e,s){return n.A.put(`/invoice/${e}`,s)}static deleteInvoice(e){return n.A.delete(`/invoice/${e}`)}}},2026:(e,s,t)=>{t.d(s,{A:()=>a});var n=t(214);class a{static createVendor(e){return n.A.post("/vendor",e)}static getAllVendors(){return n.A.get("/vendors")}static getAllVendorsWithPagenation(e){return n.A.post("/vendors-list",e)}static getVendorById(e){return n.A.get(`/vendor/${e}`)}static updateVendor(e,s){return n.A.put(`/vendor/${e}`,s)}static deleteVendor(e){return n.A.delete(`/vendor/${e}`)}}}}]);
//# sourceMappingURL=878.823d6b2c.chunk.js.map