import{d as c,c as m,w as a,u as s,V as p,o as d,a as r,D as f,b as _,i as b,t as n}from"./index-685dd0ef.js";import{c as e}from"./index-2b2f624c.js";const h=c({__name:"RegisterView",setup(w){const i=b("$myHttp"),o={fields:[{label:"Name",name:"name",as:"input",type:"text",rules:e().min(5).max(30)},{label:"E-Mail",name:"email",as:"input",type:"text",rules:e().email().min(5).required()},{label:"Passwort",name:"password",as:"input",type:"password",rules:e().required()},{label:"Benutzerrolle",name:"role",as:"select",options:[{text:"Benutzer",value:"user"},{text:"Administrator",value:"admin"}],rules:e().required()}]};async function l(t){try{await i.post("/api/user/register",t),n("Benutzeraccount angelegt",{type:"success"})}catch{n("Ein Account mit dieser E-Mail Adresse existiert bereits",{type:"error"})}}return(t,u)=>(d(),m(s(p),{dense:""},{default:a(()=>[r(s(_),{cols:"12"},{default:a(()=>[r(f,{schema:o,"show-submit-button":!0,"button-label":"Registrieren",onUpdate:l})]),_:1})]),_:1}))}});export{h as default};