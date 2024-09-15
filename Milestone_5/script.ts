// Function to validate the form
function validateForm(): boolean {
  const form = document.getElementById('resume-form') as HTMLFormElement;
  return form.reportValidity();
}

// Function to add more education fields
function addEducationFields() {
  const educationContainer = document.getElementById('education-fieldset')!;
  const newEntry = document.createElement('div');
  newEntry.className = 'education-entry';
  newEntry.innerHTML = `
      <label for="degree">Degree:</label>
      <input type="text" name="degree" required>
      <label for="institution">Institution:</label>
      <input type="text" name="institution" required>
      <label for="year">Year:</label>
      <input type="number" name="year" required>
  `;
  educationContainer.insertBefore(newEntry, educationContainer.querySelector('button'));
}

// Function to add more work experience fields
function addWorkExperienceFields() {
  const workExperienceContainer = document.getElementById('work-experience-fieldset')!;
  const newEntry = document.createElement('div');
  newEntry.className = 'work-entry';
  newEntry.innerHTML = `
      <label for="jobTitle">Job Title:</label>
      <input type="text" name="jobTitle" required>
      <label for="company">Company:</label>
      <input type="text" name="company" required>
      <label for="years">Years:</label>
      <input type="number" name="years" required>
  `;
  workExperienceContainer.insertBefore(newEntry, workExperienceContainer.querySelector('button'));
}

// Function to generate the resume dynamically
function generateResume(event: Event) {
  event.preventDefault();
  if (!validateForm()) return;

  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;

  // Education
  const educationContainers = document.querySelectorAll('.education-entry');
  const educationDetails = Array.from(educationContainers).map(container => {
      const degree = (container.querySelector('input[name="degree"]') as HTMLInputElement).value;
      const institution = (container.querySelector('input[name="institution"]') as HTMLInputElement).value;
      const year = (container.querySelector('input[name="year"]') as HTMLInputElement).value;
      return `<p>${degree} from ${institution} (${year})</p>`;
  }).join('');

  // Work Experience
  const workExperienceContainers = document.querySelectorAll('.work-entry');
  const workExperienceDetails = Array.from(workExperienceContainers).map(container => {
      const jobTitle = (container.querySelector('input[name="jobTitle"]') as HTMLInputElement).value;
      const company = (container.querySelector('input[name="company"]') as HTMLInputElement).value;
      const years = (container.querySelector('input[name="years"]') as HTMLInputElement).value;
      return `<p>${jobTitle} at ${company} (${years} years)</p>`;
  }).join('');

  // Skills
  const skills = (document.getElementById('skills') as HTMLInputElement).value;
  const skillsList = skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');

  // Profile picture
  const profilePicInput = document.getElementById('profilePicture') as HTMLInputElement;
  const profilePicFile = profilePicInput.files?.[0];
  const profilePicURL = profilePicFile ? URL.createObjectURL(profilePicFile) : '';

  // Generate resume content
  const resumeContent = `
      <section id="personal-info">
          <h1><span contenteditable="true">${name}</span></h1>
          ${profilePicURL ? `<img src="${profilePicURL}" alt="profile picture" class="profilePicture">` : ""}
          <p>Email: <span contenteditable="true">${email}</span></p>
          <p>Phone: <span contenteditable="true">${phone}</span></p>
      </section>
      <section id="education">
          <h2>Education</h2>
          <span contenteditable="true">${educationDetails}</span>
      </section>
      <section id="skills">
          <h2>Skills</h2>
          <ul><span contenteditable="true">${skillsList}</span></ul>
      </section>
      <section id="work-experience">
          <h2>Work Experience</h2>
          <span contenteditable="true">${workExperienceDetails}</span>
      </section>
      <section id="shareable-link-div"> 
        <h5>Share & Download Resume</h5>
        <p>Share Resume: <a id="share-link" target="_blank"></a></p>
        <button id="download-pdf">Download</button>
      </section>
  `;

  // Display the resume
  const resumeContainer = document.getElementById('resume-container')!;
  resumeContainer.innerHTML = resumeContent;

  const shareableURL = `${window.location.origin}?username=${encodeURIComponent(name)}`;
  const shareableLinkElement = document.getElementById("share-link") as HTMLAnchorElement;
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;

  const downloadPdfButton = document.getElementById("download-pdf") as HTMLButtonElement;
  downloadPdfButton.addEventListener("click", () => {
    window.print(); 
  });
}

// Adding event listeners for adding more fields
const addEducationButton = document.getElementById('addEducation')!;
addEducationButton.addEventListener('click', addEducationFields);

const addWorkExperienceButton = document.getElementById('addWorkExperience')!;
addWorkExperienceButton.addEventListener('click', addWorkExperienceFields);

// Adding event listener to the form
const form = document.getElementById('resume-form') as HTMLFormElement;
form.addEventListener('submit', generateResume);












