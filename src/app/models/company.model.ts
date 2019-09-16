import { Bonuce } from './bonuce.model';
import { News } from './news.model';
import { Comment } from './comment.model';

export class Company {
    constructor () {
        this.bonuces = []
        this.images = []
        this.news = []
        this.comments = []
    }

    public _id: string;
    public name: string;
    public user_id: string;
    public story: string;
    public thematic: string;
    public tags: string[];
    public images: string[];
    public video: string;
    public goal: number;
    public presently: number;
    public expiration_date: Date;
    public bonuces: Bonuce[]
    public update_date: Date
    public news: News[]
    public comments: Comment[]
}