const url = 'https://script.google.com/macros/s/AKfycbxt7W0WCMEiasLA4pB4ieADNEKqSVramNdfPcvbIrAN5oTUMqX9hk-kK55VWE1J1oHXVw/exec';
var matchList = document.getElementById('matchList');

var day = 1;
document.querySelectorAll('.day-button').forEach(button => {
    
    button.addEventListener('click', function() {
        matchList.innerHTML = "";

        day = parseInt(this.getAttribute('data-day'));
        document.querySelectorAll('.day-button').forEach(but => {
            if (day === parseInt(but.getAttribute('data-day'))) {
                but.style.backgroundColor = "#004080";
                but.style.color = "#ffd700";  
            }else{
                but.style.backgroundColor = "#ffd700";
                but.style.color = "#004080";  
            }
            console.log(day);
            
        });
        loadContent();
    });
        
        
    
    
});
function loadContent(){
    fetch(url, { method: 'GET' })
    .then(res => res.json()) 
    .then(function(data){
          var datesArr = data.tempDates;
          var tutorsArr = data.tutors;
          var studentsArr = data.students;
  
          processData(datesArr, tutorsArr, studentsArr);
    }) 
    .catch(error => console.error('Error:', error));
  
 
}


function processData(datesArr, tutorsArr, studentsArr) {
    for (let row = 1; row < datesArr.length; row++) {
        if (datesArr[row][day] !== 'x' && datesArr[row][day] !== "") {
            studentID = datesArr[row][day];
            let subject = studentsArr[studentID][4]
            let location = tutorsArr[row][4];
            let tutorName = tutorsArr[row][1];
            let tutorEmail = tutorsArr[row][3];
            let studentName = studentsArr[studentID][1];
            let studentEmail = studentsArr[studentID][2];
            let blurb = studentsArr[studentID][5];

            addMatch(subject, location, tutorName, tutorEmail, studentName, studentEmail, blurb);
        }
    }
}

function addMatch(subject, location, tutorName, tutorEmail, studentName, studentEmail, blurb) {
    const matchDiv = document.createElement('div');
    matchDiv.classList.add('match');

    const sharedInfoDiv = document.createElement('div');
    sharedInfoDiv.classList.add('shared-info');
    sharedInfoDiv.innerHTML = `<p><strong>Subject:</strong> ${subject}</p>
                               <p><strong>Location:</strong> ${location}</p>`;

    const tutorDiv = document.createElement('div');
    tutorDiv.classList.add('person', 'tutor');
    tutorDiv.innerHTML = `<h2>Tutor</h2>
                          <p><strong>Name:</strong> ${tutorName}</p>
                          <p><strong>Email:</strong> ${tutorEmail}</p>`;

    const studentDiv = document.createElement('div');
    studentDiv.classList.add('person', 'student');
    studentDiv.innerHTML = `<h2>Student</h2>
                            <p><strong>Name:</strong> ${studentName}</p>
                            <p><strong>Email:</strong> ${studentEmail}</p>`;

    const blurbDiv = document.createElement('div');
    blurbDiv.classList.add('blurb');
    blurbDiv.innerHTML = `<p><strong>Specifics:</strong> ${blurb}</p>`;

    matchDiv.appendChild(sharedInfoDiv);
    matchDiv.appendChild(tutorDiv);
    matchDiv.appendChild(studentDiv);
    matchDiv.appendChild(blurbDiv);

    matchList = document.getElementById('matchList');
    matchList.appendChild(matchDiv);
}
