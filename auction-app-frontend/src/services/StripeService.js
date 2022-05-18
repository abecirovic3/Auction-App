function setStripeOnboardingFlag(isComplete) {
    localStorage.setItem('stripe', JSON.stringify({onboardingComplete: isComplete}));
}

function getStripeOnboardingFlag() {
    return JSON.parse(localStorage.getItem('stripe'));
}

const StripeService = {
    setStripeOnboardingFlag,
    getStripeOnboardingFlag
};

export default StripeService;