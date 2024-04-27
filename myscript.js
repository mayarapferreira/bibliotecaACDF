var rollV, nameV, genderV, addressV, editV, quantV, empV, pertV;

document.getElementById("insert").onclick = function() {
  readForm();

  if (!validateFields()) {
    alert("Por favor, preencher todos os campos");
    return;
  }

  firebase
    .database()
    .ref("student/" + rollV)
    .set({
      rollNo: rollV,
      name: nameV,
      gender: genderV,
      address: addressV,
      edit: editV,
      quant: quantV,
      emp: empV,
      pert: pertV,
    });
  alert("Livro Inserido");
  clearFields();
};

document.getElementById("read").onclick = function() {
  readForm();

  if (!validateRollNo()) {
    alert("Por favor, Inserir um código válido");
    return;
  }

  firebase
    .database()
    .ref("student/" + rollV)
    .on("value", function(snap) {
      var data = snap.val();
      if (data) {
        document.getElementById("roll").value = data.rollNo;
        document.getElementById("name").value = data.name;
        document.getElementById("gender").value = data.gender;
        document.getElementById("address").value = data.address;
        document.getElementById("edit").value = data.edit;
        document.getElementById("quant").value = data.quant;
        document.getElementById("emp").value = data.emp;
        document.getElementById("pert").value = data.pert;
      } else {
        alert("Sem dados para o código: " + rollV);
      }
    });
};

document.getElementById("update").onclick = function() {
  readForm();

  if (!validateRollNo()) {
    alert("Por favor, Inserir um código válido.");
    return;
  }

  if (!validateFields()) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  firebase
    .database()
    .ref("student/" + rollV)
    .update({
      rollNo: rollV,
      name: nameV,
      gender: genderV,
      address: addressV,
      edit: editV,
      quant: quantV,
      emp: empV,
      pert: pertV,
    });
  alert("Informações do livro atualizadas");
  clearFields();
};

document.getElementById("delete").onclick = function() {
  readForm();

  if (!validateRollNo()) {
    alert("Por favor, Inserir um código válido.");
    return;
  }

  firebase
    .database()
    .ref("student/" + rollV)
    .remove();
  alert("Livro deletado");
  clearFields();
};

function readForm() {
  rollV = document.getElementById("roll").value;
  nameV = document.getElementById("name").value;
  genderV = document.getElementById("gender").value;
  addressV = document.getElementById("address").value;
  editV = document.getElementById("edit").value;
  quantV = document.getElementById("quant").value;
  empV = document.getElementById("emp").value;
  pertV = document.getElementById("pert").value;
}

function validateFields() {
  return rollV !== "" && nameV !== "" && genderV !== "" && addressV !== "" && editV !== "" && quantV !== "" && empV !== "" && pertV !== "";
}

function validateRollNo() {
  // You can add specific validation rules for roll number here if needed
  return rollV !== "";
}

function clearFields() {
  document.getElementById("roll").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").value = "";
  document.getElementById("address").value = "";
  document.getElementById("edit").value = "";
  document.getElementById("quant").value = "";
  document.getElementById("emp").value = "";
  document.getElementById("pert").value = "";
}

function updateTable(snapshot) {
  var tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = ""; // Clear the table before adding new data

  snapshot.forEach(function(childSnapshot) {
    var data = childSnapshot.val();
    var row = "<tr><td>" + data.rollNo + "</td><td>" + data.name + "</td><td>" + data.gender + "</td><td>" + data.address + "</td><td>" + data.edit + "</td><td>"+ data.quant + "</td><td>"+ data.emp + "</td><td>" + data.pert + "</td></tr>";
    tableBody.innerHTML += row;
  });
}

// Update the table when the page is loaded
window.onload = function() {
  firebase
    .database()
    .ref("student")
    .once("value", function(snapshot) {
      updateTable(snapshot);
    });
};
