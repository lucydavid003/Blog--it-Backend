 export interface Userpayload  {
    id:string,
    firstName:string,
    lastName:string,
    emailAddress:string,

}
declare global {
    namespace Express {
        interface Request{
          user:Userpayload
        }

    }
}

