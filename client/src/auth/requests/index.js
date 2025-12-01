/*
    This is our http api for all things auth, which we use to 
    send authorization requests to our back-end API. It has been 
    rewritten to use Fetch, which is a native (to browsers) standard.
    
    @author Karen Elshemy
*/

const baseURL = 'http://localhost:4000/auth';

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /register). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const getLoggedIn = async () => {
    const response = await fetch(`${baseURL}/loggedIn/`, {
      method: "GET",
      credentials: "include"
    });
    return response;
}
export const loginUser = async (email, password) => {
    const response = await fetch(`${baseURL}/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password })
    });
    return response;
}
export const logoutUser = async () => {
    const response = await fetch(`${baseURL}/logout/`, {
        method: "GET",
        credentials: "include"
    });
    return response;
}
export const registerUser = async (firstName, lastName, email, password, passwordVerify) => {
    const response = await fetch(`${baseURL}/register/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password, passwordVerify: passwordVerify })
    });
    return response;
}

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser
}

export default apis
