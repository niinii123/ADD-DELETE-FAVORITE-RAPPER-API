const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteRapper)
})

async function deleteRapper(){
//The code below means that, the text in the childNodes(span) 1(stageName) and 3(birthName) within the parentNode(li)
//in the index.ejs should be grabbed and stored in the variables sName and bName respectively.
//Note that the 'this' keyword below represents the particular list item clicked on by the user in the browser.
//The parentNode is the li and the childNodes are the span element within the li.
//The try block then runs, it fetches the deleteRapper API in the server and passes the values stored
//in the sName and bName to the stageNameS and birthNameS respectively. 
//The names held in the stageNameS is the compared to the names in the rappers database
//If it's present, it will be deleted.
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteRapper', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'stageNameS': sName,
                'birthNameS': bName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
          console.log(err)
    }
}