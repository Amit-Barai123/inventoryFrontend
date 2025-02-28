"use strict";(self.webpackChunkkims_frontend=self.webpackChunkkims_frontend||[]).push([[923],{250:(e,s,t)=>{t.d(s,{A:()=>n});var a=t(5043),l=t(214),c=t(1036),i=t(579);const n=e=>{let{recipes:s,onSelectRecipe:t,fetchRecipes:n,deleteButtons:r}=e;const[d,o]=(0,a.useState)(null),m=s.reduce(((e,s)=>{const t=s.RecipeCategory.category;return e[t]||(e[t]=[]),e[t].push(s),e}),{});return(0,i.jsx)("div",{className:"accordion",id:"recipeAccordion",children:Object.keys(m).map(((e,s)=>(0,i.jsxs)("div",{className:"accordion-item",children:[(0,i.jsx)("h2",{className:"accordion-header",id:`heading-${s}`,children:(0,i.jsx)("button",{className:"accordion-button "+(d===e?"":"collapsed"),type:"button",onClick:()=>(e=>{o(d===e?null:e)})(e),"aria-expanded":d===e,"aria-controls":`collapse-${s}`,children:e})}),(0,i.jsx)("div",{id:`collapse-${s}`,className:"accordion-collapse collapse "+(d===e?"show":""),"aria-labelledby":`heading-${s}`,"data-bs-parent":"#recipeAccordion",children:(0,i.jsx)("div",{className:"accordion-body",children:(0,i.jsx)("ul",{className:"list-group",children:m[e].map((e=>(0,i.jsxs)("li",{className:"list-group-item d-flex justify-content-between align-items-center",children:[(0,i.jsx)("span",{children:e.recipe_name}),(0,i.jsxs)("div",{children:[(0,i.jsx)("button",{className:"btn btn-primary me-2",onClick:()=>t(e),children:(0,i.jsx)("i",{className:"bi bi-eye"})}),!0===r&&(0,i.jsx)("button",{className:"btn btn-danger",onClick:()=>(async e=>{try{const{data:s}=await l.A.delete(`/recipe/${e}`);console.log(`the data of deleting is ${s}`),n(),s.success?c.oR.success(s.success.message||s.message):c.oR.error(s.error.message||s.error)}catch(s){console.error("Error deleting recipe:",s.message)}})(e.id),children:(0,i.jsx)("i",{className:"bi bi-trash"})})]})]},e.id)))})})})]},s)))})}},7735:(e,s,t)=>{t.d(s,{A:()=>c});t(5043);var a=t(1108),l=t(579);const c=e=>{let{showModal:s,header:t,onClose:c,onSubmit:i,isEditing:n,formData:r,setFormData:d,fields:o,items:m,uoms:u}=e;const h=e=>{d({...r,[e.target.name]:e.target.value})};return(0,l.jsx)("div",{className:"modal modal-overlay "+(s?"d-block":"d-none"),tabIndex:"-1",role:"dialog",children:(0,l.jsx)("div",{className:"modal-dialog",role:"document",children:(0,l.jsxs)("div",{className:"modal-content",children:[(0,l.jsxs)("div",{className:"modal-header",children:[(0,l.jsxs)("h5",{className:"modal-title",children:[n?"Edit":"Add"," ",t]}),(0,l.jsx)("button",{type:"button",className:"btn-close",onClick:c})]}),(0,l.jsx)("div",{className:"modal-body",children:o.map(((e,s)=>{if("select"===e.type){const t="item_id"===e.name?m.map((e=>({value:e.id,label:e.itemname}))):u.map((e=>({value:e.id,label:e.uomname})));return(0,l.jsxs)("div",{className:"form-group mb-3",children:[(0,l.jsx)("label",{children:e.label}),(0,l.jsx)(a.A,{data:t,isMulti:!1,selectedValue:r[e.name],placeholder:`Select ${e.label}`,onUpdateSelectedValue:s=>{return t=e.name,a=null===s||void 0===s?void 0:s.value,void d({...r,[t]:a});var t,a}})]},s)}return(0,l.jsxs)("div",{className:"form-group mb-3",children:[(0,l.jsx)("label",{children:e.label}),(0,l.jsx)("input",{type:e.type,name:e.name,value:r[e.name]||"",onChange:h,className:"form-control"})]},s)}))}),(0,l.jsxs)("div",{className:"modal-footer",children:[(0,l.jsx)("button",{type:"button",className:"btn btn-secondary",onClick:c,children:"Cancel"}),(0,l.jsx)("button",{type:"button",className:"btn btn-primary",onClick:()=>i(r),children:n?"Update":"Save"})]})]})})})}},1108:(e,s,t)=>{t.d(s,{A:()=>n});var a=t(5043),l=t(249),c=t(579);class i extends a.Component{constructor(e){super(e),this.handleChange=e=>{this.setState({selectedValue:e}),this.props.onUpdateSelectedValue(e)},this.state={selectedValue:this.props.selectedValue||(this.props.isMulti?[]:"")}}componentDidUpdate(e){e.selectedValue!==this.props.selectedValue&&this.setState({selectedValue:this.props.selectedValue||(this.props.isMulti?[]:"")})}render(){const{selectedValue:e}=this.state,{data:s,placeholder:t,width:a,placeholderColor:i,menuPlacement:n,isMulti:r}=this.props;return(0,c.jsx)("div",{className:"DropDownList m-1 "+(a?`w-${a}`:""),children:(0,c.jsx)(l.Ay,{className:"dropdown",placeholder:t,value:e,options:s,onChange:this.handleChange,isMulti:r,isClearable:!0,styles:{control:e=>({...e,cursor:"pointer"}),placeholder:e=>({...e,color:i||"#6c757d"}),menu:e=>({...e,overflow:"hidden"}),menuList:e=>({...e,maxHeight:200,overflowY:"auto"})},menuPlacement:n||"auto"})})}}const n=i},1923:(e,s,t)=>{t.r(s),t.d(s,{default:()=>o});var a=t(5043),l=t(214),c=t(1036),i=t(250),n=t(5030),r=t(7735),d=t(579);const o=()=>{const[e,s]=(0,a.useState)([]),[t,o]=(0,a.useState)(null),[m,u]=(0,a.useState)([]),[h,p]=(0,a.useState)(!1),[b,g]=(0,a.useState)({item_id:"",reference_qty:""}),[x,j]=(0,a.useState)([]),[y,v]=(0,a.useState)([]),[f,N]=(0,a.useState)(!1),[R,w]=(0,a.useState)(null);(0,a.useEffect)((()=>{A()}),[]);const A=async()=>{try{const[e,t,a]=await Promise.all([l.A.get("/recipes"),l.A.get("/items"),l.A.get("/uoms")]);s(e.data.recipes),j(t.data.items),j(t.data.items),v(a.data.uom)}catch(e){c.oR.error(e.message||"Error fetching data:")}},S=async e=>{o(e.id);try{const s=await l.A.get(`/ingredient/${e.id}`);u(s.data.ingredients),c.oR.success(s.data.message)}catch{u([])}};return(0,d.jsxs)("div",{style:{marginTop:"20vh"},className:"container",children:[(0,d.jsx)("h2",{className:"text-center mb-12",children:"Recipe Ingredients Page"}),(0,d.jsxs)("div",{className:"row",children:[(0,d.jsxs)("div",{className:"col-md-4",children:[(0,d.jsx)("h5",{className:"text-center",children:"Recipe List"}),(0,d.jsx)(i.A,{recipes:e,onSelectRecipe:S,fetchRecipes:A})]}),(0,d.jsxs)("div",{className:"col-md-8",children:[(0,d.jsx)("h5",{className:"text-center",children:"Recipe Ingredients"}),t&&(0,d.jsxs)("div",{children:[(0,d.jsxs)("button",{onClick:()=>{p(!0),N(!1),g({item_id:"",reference_qty:""})},className:"btn btn-success mb-2",children:["Add Recipe Ingredients ",(0,d.jsx)("i",{className:"bi bi-plus-circle-fill"})]}),(0,d.jsx)(n.A,{data:m,columns:[{key:"Item.itemname",label:"Ingredients"},{key:"reference_qty",label:"Reference Quantity"},{key:"Item.Uom.uomname",label:"UOM"}],onEdit:e=>{p(!0),N(!0),w(e.id),g({item_id:e.item_id,reference_qty:e.reference_qty})},onDelete:async e=>{const s=await l.A.delete(`/ingredient/${e}`);c.oR.success(s.data.message),S({id:t})},Action:!0})]})]})]}),(0,d.jsx)(r.A,{showModal:h,header:"Recipe Ingredients",onClose:()=>p(!1),onSubmit:async e=>{let s;try{f?(s=await l.A.put(`ingredient/${R}`,{...e,recipe_id:t}),c.oR.success(s.data.message||"Record updated successfully")):(s=await l.A.post("/ingredient",{...e,recipe_id:t}),c.oR.success(s.data.message||"Record added successfully")),S({id:t}),g({item_id:"",reference_qty:""}),p(!1),N(!1),w(null)}catch(a){console.error("Error submitting form:",a),c.oR.error(a.response.data.message||"Something went wrong")}},isEditing:f,formData:b,setFormData:g,fields:[{name:"item_id",label:"Item",type:"select"},{name:"reference_qty",label:"Reference Quantity",type:"number"}],items:x,uoms:y})]})}}}]);
//# sourceMappingURL=923.1573c5e5.chunk.js.map