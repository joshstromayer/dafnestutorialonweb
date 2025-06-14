const steps = document.querySelectorAll('.step');
const nextButtons = document.querySelectorAll('.next-button');
const backButtons = document.querySelectorAll('.back-button');

function showStep(id) {
    steps.forEach(step => step.classList.remove('active'));
    const nextStep = document.getElementById(id);
    if (nextStep) {
        nextStep.classList.add('active');
        localStorage.setItem('currentStep', id);
    }
}

nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const nextId = button.getAttribute('data-next');
        showStep(nextId);
    });
});

backButtons.forEach(button => {
    button.addEventListener('click', () => {
        const prevId = button.getAttribute('data-prev');
        showStep(prevId);
    });
});

const savedStep = localStorage.getItem('currentStep') || 'step-1';
showStep(savedStep);

const revealBtn = document.getElementById('reveal-button');
const previewContainer = document.querySelector('.preview-container');

if (revealBtn && previewContainer) {
    revealBtn.addEventListener('click', () => {
        previewContainer.classList.add('revealed');
        revealBtn.style.display = 'none';
    });
}
