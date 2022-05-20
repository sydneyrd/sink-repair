const applicationState = {
    requests: []

}
const API = "http://localhost:8088"
/* assign main container to variable (same as on main.js) */
const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

//returns a copy of the database
export const getRequests = () => {
    return applicationState.requests.map(requests => ({ ...requests }))
}
//gets list of plumbre
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumbers => ({ ...plumbers }))
}

//this requests permaent status for the transient object
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST", //tell api you're creating something new
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}

export const fetchCompletions = () => {
    return fetch(`${API}/plumbers`)
    .then(response => response.json()
    .then(
        (data) => {
            applicationState.completions = data
        }
    ))
}

export const saveCompletions = (completionObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObj)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })  //tell api delete the object with this id
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))//tells the main js something changed, it's watching for it, will make it disappear from list on site
            }
        )
}



export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)//get the list of plumbers from api
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}