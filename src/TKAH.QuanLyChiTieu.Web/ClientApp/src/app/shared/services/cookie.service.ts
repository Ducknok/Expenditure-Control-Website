import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root',
})
export class CookieService{
    setCookie(name: string, val: string) {
        const date = new Date();
        const value = val;
    
        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    
        // Set it
        document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/";
    }

    getCookie(name: string) {
        let value:string = document.cookie.split(";").filter(x => x.includes(name))[0];
        return value?.split("=")[1];
         
    }

    deleteCookie(name: string) {
        const date = new Date();
    
        // Set it expire in -1 days
        date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    
        // Set it
        document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
    }
}
