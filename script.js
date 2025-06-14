const steps = document.querySelectorAll('.step');
const nextButtons = document.querySelectorAll('.next-button');
const backButtons = document.querySelectorAll('.back-button');

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

// --- Handle "Show Code" overlays ---
document.querySelectorAll('.blurred-code-container').forEach(container => {
    const button = container.querySelector('button');
    const codeBox = container.querySelector('.code-box');

    if (button && codeBox) {
        button.classList.add('show-code-button');

        button.addEventListener('click', () => {
            container.classList.add('revealed');
            codeBox.classList.remove('blurred');
        });
    }
});

// Progress bar updater
function updateProgressBar() {
    const totalSteps = steps.length;
    const currentIndex = Array.from(steps).findIndex(step => step.classList.contains('active'));

    const progress = ((currentIndex + 1) / totalSteps) * 100;
    document.getElementById('progress-bar-fill').style.width = `${progress}%`;
}

// Trigger it whenever a step is shown
function showStep(id) {
    steps.forEach(step => step.classList.remove('active'));
    const nextStep = document.getElementById(id);
    if (nextStep) {
        nextStep.classList.add('active');
        localStorage.setItem('currentStep', id);

        // ✅ Trigger progress bar update without breaking anything
        const totalSteps = steps.length;
        const currentIndex = Array.from(steps).findIndex(step => step.classList.contains('active'));
        const progress = ((currentIndex + 1) / totalSteps) * 100;
        const bar = document.getElementById('progress-bar-fill');
        if (bar) bar.style.width = `${progress}%`;
    }
}

