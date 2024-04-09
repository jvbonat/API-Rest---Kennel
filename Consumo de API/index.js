async function listDogs() {
    const dogs = await axios.get("http://localhost:4040/dogs").then(response => {
        return response.data;
    }).catch(error => {
        return error;
    });
    return dogs;
}

async function deleteDog (li) {
    const id = li.getAttribute("data-id");
    return axios.delete('http://localhost:4040/dog/'+id).then(()=>{
        alert('Dog has been deleted');
    }).catch(error => {
        alert('There was an error deleting the dog');
    });
}

async function loadDogInfo (li) {
    const id = li.getAttribute("data-id");
    const weight = li.getAttribute("data-weight");
    const breed = li.getAttribute("data-breed");
    const age  = li.getAttribute("data-age");
    const name  = li.getAttribute("data-name");

    const idEdit = document.querySelector("#idEdit");
    const nameEdit = document.querySelector('#nameEdit');
    const weightEdit = document.querySelector('#weigthEdit');
    const breedEdit = document.querySelector('#breedEdit');
    const ageEdit = document.querySelector('#ageEdit');

    idEdit.value = id;
    nameEdit.value = name;
    weightEdit.value = weight;
    breedEdit.value = breed;
    ageEdit.value = age;
}

async function updateDogInfo () {
    const id = document.querySelector("#idEdit").value;
    const name = document.querySelector('#nameEdit').value;
    const weigth = document.querySelector('#weigthEdit').value;
    const breed = document.querySelector('#breedEdit').value;
    const age = document.querySelector('#ageEdit').value;
    const dog = {
        name,
        weigth,
        breed,
        age
    };
    return axios.patch('http://localhost:4040/dog/'+id,dog).then(response => {
        console.log(response);
        if (response.status === 200) {
            alert('Dog has been updated');
            location.reload();
        } else {
            alert('There was a problem registering this dog');
        }
    });
}

async function showDogs () {
    const dogs = await listDogs();
    const dogsList = document.querySelector('.dogsList');
    dogs.forEach(dog => {
        const li = document.createElement('li');
        li.setAttribute('data-id',dog.id);
        li.setAttribute('data-weight',dog.weigth);
        li.setAttribute('data-breed',dog.breed);
        li.setAttribute('data-name',dog.name);
        const btnDeletion = document.createElement('button');
        const btnEdition = document.createElement('button');
        btnEdition.innerText = 'Editar';
        btnDeletion.innerText = 'Deletar';
        btnDeletion.addEventListener('click',function(ev){
            deleteDog(li);
        });
        btnEdition.addEventListener('click',function(ev){
            loadDogInfo(li);
        });
        li.setAttribute('data-age',dog.age);
        li.innerText = `ID : ${dog.id} - Weight : ${dog.weigth} - Breed : ${dog.breed} - Name : ${dog.name} - Age : ${dog.age}`;
        li.appendChild(btnDeletion);
        li.appendChild(btnEdition);
        dogsList.appendChild(li);
    });
    return dogs;
}

async function createDog () {
    const name = document.querySelector('input[name="name"]').value;
    const weigth = Number(document.querySelector('input[name="weigth"]').value);
    const breed = document.querySelector('input[name="breed"]').value;
    const age = Number(document.querySelector('input[name="age"]').value);
    const dog = {
        name,
        weigth,
        breed,
        age
    };
    return axios.post('http://localhost:4040/dog',dog).then(response => {
        console.log(response);
        if (response.status === 200) {
            alert('Dog has been registered');
            location.reload();
        } else {
            alert('There was a problem registering this dog');
        }
    });
}

showDogs();