import{d,r as p,c as o,w as t,u as a,V as f,o as r,a as n,m as _,b as w,t as V,e as h,f as y,g,h as x}from"./index-f54a2335.js";import{c as l,V as b,D as v}from"./index-aa0ece0f.js";const D=d({__name:"LoginView",setup(C){const i=g(),e=p(""),u={fields:[{label:"E-Mail",name:"email",as:"input",type:"text",rules:l().email().min(5).required()},{label:"Passwort",name:"password",as:"input",type:"password",rules:l().required()}]};async function c(s){try{await x.post("/api/user/login",s),e.value="Anmeldung läuft ...",i.push("/")}catch{e.value="E-Mail und/oder Passwort falsch."}}return(s,m)=>(r(),o(a(f),{dense:""},{default:t(()=>[n(a(y),{cols:"12"},{default:t(()=>[e.value?(r(),o(a(b),{key:0,type:"info",icon:a(_)},{default:t(()=>[w(V(e.value),1)]),_:1},8,["icon"])):h("",!0),n(v,{schema:u,buttonLabel:"Anmelden",onUpdate:c})]),_:1})]),_:1}))}});export{D as default};