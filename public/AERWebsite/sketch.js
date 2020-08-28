//---------------------------------------------------//
//                      NAVBAR                       //
//---------------------------------------------------//
function NavDropdown() {
    var x = document.getElementById("NavDropdown");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}


//---------------------------------------------------//
//                    Room Cycle                     //
//---------------------------------------------------//
var roomIndex = 1;
showRooms(roomIndex);

function changeRoom(n) {
    showRooms(roomIndex += n);
}

function currentRoom(n) {
    showRooms(roomIndex = n);
}

function showRooms(n) {
    var i;
    var rooms = document.getElementsByClassName("roomSlide");
    if (n > rooms.length) {
        roomIndex = 1
    }
    if (n < 1) {
        roomIndex = rooms.length
    }
    for (i = 0; i < rooms.length; i++) {
        rooms[i].style.display = "none";
    }
    rooms[roomIndex - 1].style.display = "grid";
}
