import { getRequests, deleteRequest, getPlumbers, saveCompletions } from "./dataAccess.js"






const mainContainer = document.querySelector("#container")


//this creates a list string of object data, specifically the descriptions of the service requests
export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${requests.map(requestHTMLString).join("")
        }
        </ul>
    `

    return html
}

//this creates a list element with the description property of an object, makes a list with delete buttons
const requestHTMLString = (request) => {
    const plumbers = getPlumbers()
    return `
    <li>
        ${request.description}
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>

        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
        ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
    </select>



    </li>`

}


//this is a listener to save a completed service to the database
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
saveCompletions(completion)
        }
    }
)



mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {//finds clicked thing
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))//the id of the specific object being clicked
    }
})