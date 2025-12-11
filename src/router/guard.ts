import router from ".";
import { useUserStore } from "@/store/auth";

router.beforeEach((to)=>{
    const userStore=useUserStore();
    const isLogin=userStore.token;
    if(!isLogin){
        if(to.path!=="/login"){
            return {path:"/login"};
        }
    }else{
        if(to.path==="/login"){
            return {path:"/"};
        }
    }
})
