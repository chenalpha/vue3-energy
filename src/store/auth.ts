import { defineStore } from "pinia";
import { loginApi } from "@/api/user";
interface LoginParams{
  username:string,
  password:string
}

export const useUserStore=defineStore("user",{
  state:()=>({
    token:sessionStorage.getItem("token")||"",
    roles:JSON.parse(sessionStorage.getItem("roles") || "[]"),
    username:sessionStorage.getItem("username")||"",
    menu:JSON.parse(sessionStorage.getItem("menu") || "[]")
  }), 
  actions:{
    async login(data:LoginParams){
      try{
        const {data:{token,user:{username,roles},menulist}}=await loginApi(data);
        this.token=token;
        this.username=username;
        this.roles=roles || [];
        this.menu=menulist || [];
        sessionStorage.setItem("token",token);
        sessionStorage.setItem("username",username);
        sessionStorage.setItem("roles",JSON.stringify(roles || []));
        sessionStorage.setItem("menu",JSON.stringify(menulist || []));
      }catch(error){
        
      }
    }
  }
})