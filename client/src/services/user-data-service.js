import http from "../http-common";

class UserDataService{
    userRegister(data){
        return http.post("/users/register", data)
    }

    userLogin(data){
        return http.post("/users/login", data)
    }

    userLogout(){
        return http.post("/users/logout")
    }

    userChangePassword(data){
        return http.post("/users/changepassword", data)
    }
}

export default new UserDataService();