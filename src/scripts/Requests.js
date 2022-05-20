import { getRequests, deleteRequest, getPlumbers } from "./dataAccess.js"








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






const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {//finds clicked thing
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))//the id of the specific object being clicked
    }
})