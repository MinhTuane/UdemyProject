import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { User } from "../models/user";

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