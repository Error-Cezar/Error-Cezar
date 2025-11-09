let num = 0

function changeName() {
    document.getElementById('name').innerHTML = num == 0 && "Stupid Projects !!!" || "Cool Stuff I Made !!!"
    if(num == 0) {
        num = 1
    } else {
        num = 0
    }
    console.log(num)
}

setInterval(changeName, 2000);