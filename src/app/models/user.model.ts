import { PayHistory } from './payHistory.model';

export class User {
    constructor () {
        this.pay_history = []
    }
    public _id: string
    public name: string;
    public email: string;
    public password: string;
    public isBlock: boolean;
    public profile_img: string;
    public background: string;
    public about: string;
    public access: string;
    public provider: string
    public pay_history: PayHistory[]
}