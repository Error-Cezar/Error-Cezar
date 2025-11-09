let num = 0

function changeName() {
    document.getElementById('name').innerHTML = num == 0 && "Error-Cezar" || "This Idiot"
    document.getElementById('idiot').innerHTML = num == 0 && "A person" || "An idiot"
    if(num == 0) {
        num = 1
    } else {
        num = 0
    }
    console.log(num)
}

setInterval(changeName, 2000);