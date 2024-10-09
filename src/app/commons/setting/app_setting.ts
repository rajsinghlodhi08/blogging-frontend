import { environment } from '../../../environments/environment';
export class AppSettings {
  public static API_ENDPOINT = 'http://localhost:8080';

  public static API_GATEWAY = 'api';
  public static popWidth = '430px';
  public static popHeight = '240px';
  public static backdropClass = 'g-transparent-backdrop';
  public static emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  public static ERROR = 'Something went wrong, Please try again later.';
  public static APIsNameArray = {

    AUTH: {
      LOGIN:'login',
      SIGNUP : 'auth/register',
    },

    USER: {
      USER:'user',
    },
 
   BLOG: {
    blogs:'blogs',
    read:'blogs/read'
   }
  }
}
