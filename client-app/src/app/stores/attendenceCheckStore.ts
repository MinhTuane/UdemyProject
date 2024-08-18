import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';
import {format} from 'date-fns';
import { AttendenceCheck } from "../models/attendenceCheck";

export default class AttendenceCheckStore {
    attendenceChecks: AttendenceCheck[] = [];
    attendenceChecksRegister = new Map<string, AttendenceCheck>();
    selectedAttendenceCheck: AttendenceCheck | undefined = undefined;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)
    }

    get attendenceChecksByDate() {
        return Array.from(this.attendenceChecksRegister.values())
            .sort((a, b) => a.date!.getTime()- b.date!.getTime());
    }

    get groupedattendenceChecks() {
        return Object.entries(
            this.attendenceChecksByDate.reduce((attendenceChecks,AttendenceCheck) => {
                const date = format(AttendenceCheck.date!,'dd MMM yyyy')
                attendenceChecks[date] = attendenceChecks[date] ? [...attendenceChecks[date],AttendenceCheck] : [AttendenceCheck];
                return attendenceChecks;
            },{} as {[key:string]: AttendenceCheck[]})
        )
    }

    loadattendenceChecks = async () => {
        this.setLoadingInitial(true);
        try {
            const attendenceChecks = await agent.AttendenceChecks.list();
            runInAction(() => {
                attendenceChecks.forEach(AttendenceCheck => {
                    this.setAttendenceCheck(AttendenceCheck);
                })
            })

            this.setLoadingInitial(false);

        } catch (error) {
            this.setLoadingInitial(false);

        }
    }

    loadAttendenceCheck = async (id: string) => {
        let AttendenceCheck = this.getAttendenceCheck(id);
        if (AttendenceCheck) {
            this.selectedAttendenceCheck = AttendenceCheck;
            return AttendenceCheck;
        }
        else {
            this.setLoadingInitial(true);
            try {
                AttendenceCheck = await agent.AttendenceChecks.details(id);
                this.setAttendenceCheck(AttendenceCheck);
                runInAction(()=>this.selectedAttendenceCheck = AttendenceCheck);
                this.setLoadingInitial(false);
                return AttendenceCheck;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setAttendenceCheck = (AttendenceCheck: AttendenceCheck) => {
        AttendenceCheck.date = new Date(AttendenceCheck.date!);
        this.attendenceChecksRegister.set(AttendenceCheck.id, AttendenceCheck);
    }

    private getAttendenceCheck = (id: string) => {
        return this.attendenceChecksRegister.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createAttendenceCheck = async (AttendenceCheck: AttendenceCheck) => {
        this.loading = true;
        AttendenceCheck.id = uuid();
        try {
            await agent.AttendenceChecks.create(AttendenceCheck);
            runInAction(() => {
                this.attendenceChecksRegister.set(AttendenceCheck.id, AttendenceCheck)
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateAttendenceCheck = async (AttendenceCheck: AttendenceCheck) => {
        this.loading = true;
        try {
            await agent.AttendenceChecks.update(AttendenceCheck);
            runInAction(() => {
                this.attendenceChecksRegister.set(AttendenceCheck.id, AttendenceCheck);
                this.selectedAttendenceCheck = AttendenceCheck;
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteAttendenceCheck = async (id: string) => {
        this.loading = true;
        try {
            await agent.AttendenceChecks.delete(id);
            runInAction(() => {
                this.attendenceChecksRegister.delete(id);
                this.loading = false;
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}