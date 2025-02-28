"use strict";(self.webpackChunkkims_frontend=self.webpackChunkkims_frontend||[]).push([[124],{1246:(e,t,a)=>{a.d(t,{p:()=>l});var n=a(6178),s=a.n(n);const l=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];const a=s()(e);if(!a.isValid())return"Invalid Date";const n=t?"MMM D, YYYY h:mm A":"MMM D, YYYY";return a.format(n)}},6124:(e,t,a)=>{a.r(t),a.d(t,{default:()=>i});var n=a(5043),s=a(214),l=a(5030),o=a(1036),r=a(1246),c=a(579);const i=()=>{const[e,t]=(0,n.useState)([]),[a,i]=(0,n.useState)(0),[u,d]=(0,n.useState)(1),[m,h]=(0,n.useState)(10),[p,g]=(0,n.useState)(""),[v,f]=(0,n.useState)(""),[y,b]=(0,n.useState)("item_name"),[x,j]=(0,n.useState)(""),[k,N]=(0,n.useState)(""),w=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:m,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:v;try{const l={page:e,limit:a};n&&(l[y]=n),x&&k&&(l.startDate=x,l.endDate=k);const o=await s.A.post("/transactions/search",l);t(o.data.data),i(o.data.pagination.total)}catch(l){o.oR.error("Error fetching items:")}};(0,n.useEffect)((()=>{const e=setTimeout((()=>{f(p)}),500);return()=>{clearTimeout(e)}}),[p]),(0,n.useEffect)((()=>{w(1,m,v)}),[v,m,u]);const C=e=>{g(e)};(0,n.useEffect)((()=>{w()}),[u,m]),(0,n.useEffect)((()=>{g(""),j(""),N("")}),[y]);const S=[{key:"date",label:"Date",render:e=>(0,r.p)(e)},{key:"Item.itemname",label:"Item"},{key:"credit_quantity",label:"Credit Quantity"},{key:"debit_quantity",label:"Debit Quantity"},{key:"invoice_no",label:"Invoice No"},{key:"Vendor.vendorname",label:"Vendor"},{key:"Recipe.recipe_name",label:"Recipe"},{key:"RecipeCategory.category",label:"Category"},{key:"Uom.uomname",label:"UOM"}];return(0,c.jsxs)("div",{className:"container mt-100",children:[(0,c.jsx)("h2",{className:"text-center",children:"Transaction Page"}),(0,c.jsxs)("div",{className:"mb-3 d-flex justify-content-between align-items-center",children:[(0,c.jsxs)("div",{className:"d-flex",children:[(0,c.jsxs)("select",{className:"form-select w-auto",value:y,onChange:e=>b(e.target.value),children:[(0,c.jsx)("option",{value:"item_name",children:"Item Name"}),(0,c.jsx)("option",{value:"invoice_no",children:"Invoice No"}),(0,c.jsx)("option",{value:"vendor_name",children:"Vendor Name"}),(0,c.jsx)("option",{value:"date",children:"Date"}),(0,c.jsx)("option",{value:"date-range",children:"Date Range"})]}),"date"===y?(0,c.jsx)("input",{type:"date",className:"form-control w-100 ms-2",value:p,onChange:e=>C(e.target.value)}):"date-range"===y?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("input",{type:"date",className:"form-control w-auto ms-2",value:x,onChange:e=>j(e.target.value)}),(0,c.jsx)("input",{type:"date",className:"form-control w-auto ms-2",value:k,onChange:e=>N(e.target.value)}),(0,c.jsx)("button",{className:"btn btn-primary ms-2",onClick:async()=>{x&&k&&w(1,m,p)},children:"Search"})]}):(0,c.jsx)("input",{type:"text",className:"form-control w-100 ms-2",value:p,placeholder:`Search by ${y.replace("_"," ")}...`,onChange:e=>C(e.target.value)})]}),(0,c.jsxs)("button",{onClick:()=>{window.print()},className:"btn btn-success",children:[(0,c.jsx)("span",{className:"bi bi-printer-fill"})," Print"]})]}),(0,c.jsx)(l.A,{data:e,columns:S,totalItems:a,currentPage:u,rowsPerPage:m,onPageChange:e=>{d(e)},handleRowsPerPageChange:e=>{h(e),d(1)},handleSearch:C,showSearch:!1,pagenation:!0,placeholder:`Search by ${y.replace("_"," ")}...`})]})}}}]);
//# sourceMappingURL=124.341ff189.chunk.js.map