
window.document.addEventListener("DOMContentLoaded", (event) => {
    const ul = document.querySelector("ul");
    function ShowOnScreen(passengerdetails) {
        const li = document.createElement("li");
        li.textContent = `${passengerdetails.passenger}  ${passengerdetails.email}  ${passengerdetails.phone}  ${passengerdetails.Busno}`;
        const dbutton = document.createElement('button');
        const ebutton = document.createElement('button');
        dbutton.textContent = "Delete";
        ebutton.textContent = "Edit";
        li.appendChild(dbutton);
        li.appendChild(ebutton);
        ul.appendChild(li);
        dbutton.addEventListener("click", (event) => {
            axios.delete(`${url}/${passengerdetails._id}`)
                .then((res) => console.log("deleted"))
            li.remove();
        })
        ebutton.addEventListener("click", (event) => {
            axios.delete(`${url}/${passengerdetails._id}`)
                .then((res) => console.log("deleted"))
            li.remove();
            document.getElementById("passenger").value = passengerdetails.passenger;
            document.getElementById("email").value = passengerdetails.email;
            document.getElementById("phone").value = passengerdetails.phone;
            document.getElementById("Busno").value = passengerdetails.Busno;

        })

    }
    const url = "https://crudcrud.com/api/02f6394268f5431ca9ab18aef9eaf56f/busbooking";
    const filter = document.getElementById("filter");
    function filteredArray(passengers) {
        ul.innerHTML = "";
        const BusValue = filter.value;
        const filteredPassengers = BusValue == "All" ? passengers : passengers.filter(passenger => passenger.Busno == BusValue);
        filteredPassengers.forEach(finalpassenger => {
            ShowOnScreen(finalpassenger)
        });
    }
    function fetchDetails() {
        axios.get(url)
            .then((response) => {
                const arrofobj = response.data
                filteredArray(arrofobj)
            })
            .catch((error) => console.log(error));
    }
    fetchDetails();
    filter.addEventListener("change", () => {
        fetchDetails();
    })


    const form = document.getElementById("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const passenger = event.target.passenger.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const Busno = event.target.Busno.value;
        const obj = {
            "passenger": passenger,
            "email": email,
            "phone": phone,
            "Busno": Busno
        }
        document.getElementById("passenger").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("Busno").value = "";

        axios.post(url, obj)
            .then((result) => ShowOnScreen(result.data))
            .catch((err) => console.log(err))











    })

})


