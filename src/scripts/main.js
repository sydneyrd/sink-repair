import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests, fetchPlumbers } from "./dataAccess.js"










const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers()) //new?  then method gets us some plumbers
        .then(
            () => {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
