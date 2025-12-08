/*
    This is our http api, which we use to send requests to
    our back-end API. It has been rewritten to use Fetch, 
    which is a native (to browsers) standard.
    
    @author Karen Elshemy
*/

const baseURL = 'http://localhost:4000/store';

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES

export const createPlaylist = async (newListName, newSongs, userEmail) => {
    const response = await fetch(`${baseURL}/playlist/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        // SPECIFY THE PAYLOAD
        body: JSON.stringify({ name: newListName, songs: newSongs, ownerEmail: userEmail })
    });
    return response;
}
export const deletePlaylistById = async (id) => {
    const response = await fetch(`${baseURL}/playlist/${id}`, {
        method: "DELETE",
        credentials: "include"
    });
    return response;
}
export const getPlaylistById = async (id) => {
    const response = await fetch(`${baseURL}/playlist/${id}`, {
        method: "GET",
        credentials: "include"
    });
    return response;
}
export const getPlaylistPairs = async () => {
    const response = await fetch(`${baseURL}/playlistpairs/`, {
        method: "GET",
        credentials: "include"
    });
    return response;
}
export const updatePlaylistById = async (id, playlist) => {
    const response = await fetch(`${baseURL}/playlist/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        // SPECIFY THE PAYLOAD
        body: JSON.stringify({ playlist: playlist })
    });
    return response;
}

export const queryPlaylists = async (query) => {
    const response = await fetch(`${baseURL}/playlists/query?${query}`, {
        method: "GET",
        credentials: "include",
    });
    return response;
}

const apis = {
    createPlaylist,
    deletePlaylistById,
    getPlaylistById,
    getPlaylistPairs,
    updatePlaylistById,
    queryPlaylists
}

export default apis
