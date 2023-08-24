/**
 * @name Chat Area Simple Hide
 * @author AndMJ
 * @authorLink https://github.com/AndMJ
 * @version 0.0.1
 * @description Resizes window to hide chat area from view, showing only the left sidebar, with the servers and its channels. Make sure to enable "Remove Minimum Size" on BetterDiscord settings.
 * @source https://raw.githubusercontent.com/AndMJ/discord-plugins/main/Chat%20Area%20Simple%20Hide/ChatAreaSimpleHide.plugin.js
 */

//just incase i decide to use them
const {Webpack, Webpack: {Filters}, Patcher} = BdApi;

let screenWidth = 1200
let collapsed = false

const sideBar = document.querySelector(`.tutorialContainer-1pL9QS`)
const button = document.createElement("div")
let buttonListItemWrapper = document.createElement("div")
let buttonIconWrapper = document.createElement("div")
//let settingsButton = document.querySelector('button[aria-label="User Settings"]')

function toggleSize() {
    if(!collapsed){
        window.resizeTo(310, document.body.clientHeight)
    } else {
        window.resizeTo(screenWidth, document.body.clientHeight)
    }
    collapsed = !collapsed
    toggleButtonIcon();
}

function toggleButtonIcon() {
    if(!collapsed){
        buttonIconWrapper.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="svg-2ifYOU bi bi-arrow-bar-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5ZM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5Z"/>
            </svg>`
    } else {
        buttonIconWrapper.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="svg-2ifYOU bi bi-arrow-bar-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8Zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5Z"/>
            </svg>`
    }
}

const setScreenWidth = (e) => {
    item = e.currentTarget.myParam
    console.log(item);
    if(item.classList.contains("selected-26oxtA") || item.classList.contains("selected-2TbFuo")){
        toggleSize()
        return
    }
    if(document.body.clientWidth !== screenWidth){
        //console.log("in WTF");
        window.resizeTo(screenWidth, document.body.clientHeight)
        collapsed = false
        toggleButtonIcon();
    } 
}

module.exports = meta => ({
    start() {

        window.onresize = () => {
            if(document.body.clientWidth <= 310){
                collapsed = true
                toggleButtonIcon();
            }

            if(document.body.clientWidth > 310){
                collapsed = false
                toggleButtonIcon();
            }
        }

        //INITIAL RESIZE
        window.resizeTo(screenWidth, document.body.clientHeight)

        //create the button
        button.classList.add("listItem-3SmSlK")
        button.setAttribute('aria-label', "Toggle Chat area");
        button.setAttribute('tabindex', '-1');
        button.setAttribute('role', 'treeitem');

        buttonListItemWrapper.classList.add("listItemWrapper-3d87LP")

        buttonIconWrapper.classList.add("wrapper-2PSQCG")
        toggleButtonIcon() //call the function so it sets initial icon orientation

        buttonListItemWrapper.appendChild(buttonIconWrapper)

        //append all the button child wrappers
        button.appendChild(buttonListItemWrapper)

        //add event listener to the button
        button.addEventListener("click", toggleSize)

        //put toggle the button on top, on sidebar
        sideBar.insertBefore(button, sideBar.firstChild)
        
        //toggle on friends dm click
        /* document.querySelectorAll('.interactive-26HRN_').forEach(item => {
            item.addEventListener('dblclick', setScreenWidth)
            item.myParam = item
        }) */

        //toggle on server channel click
        /* document.querySelectorAll('.containerDefault-YUSmu3').forEach(item => {
            item.addEventListener('dblclick', setScreenWidth)
            item.myParam = item
        }) */
    },
    stop() {
        //remove button
        button.innerHTML = ""
        button.remove()

        //remove all listeners
        /* document.querySelectorAll('.interactive-26HRN_').forEach(item => {
            item.removeEventListener("dblclick", setScreenWidth)
        }) */

        /* document.querySelectorAll('.containerDefault-YUSmu3').forEach(item => {
            item.removeEventListener("dblclick", setScreenWidth)
        }) */
    }
});
