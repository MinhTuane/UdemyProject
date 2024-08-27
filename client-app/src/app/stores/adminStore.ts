import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";

export default class AdminStore {
    users = new Map<string, User>();
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)
    }
    
    loadUsers=async () => {
        this.loadingInitial = true;
        try {
            var users = await agent.Admin.listUser();
            runInAction(()=> {
                users.forEach(user => {
                    this.users.set(user.id,user);             
                })   
                this.loadingInitial= false;           
            })
            
        } catch (error) {
            runInAction(()=> {
                this.loadingInitial = false;
            })
        }
    }

    loadUser = async (id:string) => {
        let user = this.users.get(id);
        if(user) return user;
        else {
            this.loadingInitial = true;
            try {
                user = await agent.Admin.detail(id);
                runInAction(()=> {
                    this.users.set(user!.id,user!);
                    this.loadingInitial=false;
                })
                return user;
            } catch (error) {
                console.log(error);
                runInAction(()=> this.loadingInitial = false);
                
            }
        }
    }

    updateUser = async (user:UserFormValues) => {
        this.loadingInitial = true;
        try {
            var newUser =await agent.Admin.editUser(user);
            runInAction(()=>{
                this.users.set(newUser.id,newUser);
                this.loadingInitial =false;
            })
        } catch (error) {
            runInAction(()=>this.loadingInitial=false);
            console.log(error);
            
        }
    }

    deleteUser = async (id : string) => {
        this.loadingInitial = false;
        try {
            await agent.Admin.deleteUSer(id);
            runInAction(()=> {
                this.users.delete(id);
                this.loadingInitial = false;
            })
        } catch (error) {
            runInAction(()=>this.loadingInitial=false);
            console.log(error);
        }
    }

    get UserOptions() {
        const options = Array.from(this.users.values()).map((user) => ({
            text:`${user.username}`,
            value:`${user.id}`
        }));
        return options;
    }

    get groupUsers() {
        return Object.entries(
            Array.from(this.users.values()).reduce((users,user)=> {
                const role = user.role;
                users[role] = users[role] ? [...users[role],user] : [user];
                return users;
            },{} as {[key:string] : User[]})
        )
    }
    
}