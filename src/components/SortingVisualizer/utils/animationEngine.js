// Animation Engine for Sorting Visualizer

class AnimationEngine {
  constructor() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = 0;
    this.animationSteps = [];
    this.speedMultiplier = 1;
    this.animationId = null;
    this.onStepCallback = null;
    this.onCompleteCallback = null;
    this.onPauseCallback = null;
    this.delay = 100; // Base delay in ms
  }

  // Initialize animation with steps and callbacks
  init(animationSteps, onStep, onComplete, onPause = null) {
    this.animationSteps = animationSteps;
    this.onStepCallback = onStep;
    this.onCompleteCallback = onComplete;
    this.onPauseCallback = onPause;
    this.currentStep = 0;
    this.isPlaying = false;
    this.isPaused = false;
  }

  // Set animation speed (0.1x to 5x)
  setSpeed(multiplier) {
    this.speedMultiplier = multiplier;
  }

  // Set speed immediately and restart current animation if playing
  setSpeedImmediately(multiplier) {
    this.speedMultiplier = multiplier;
    
    // If currently playing, restart the current step with new speed
    if (this.isPlaying && !this.isPaused) {
      if (this.animationId) {
        clearTimeout(this.animationId);
        this.animationId = null;
      }
      this.playNextStep();
    }
  }

  // Calculate current delay based on speed multiplier
  getCurrentDelay() {
    return this.delay / this.speedMultiplier;
  }

  // Start animation from current step
  start() {
    if (this.isPlaying || this.animationSteps.length === 0) return;

    this.isPlaying = true;
    this.isPaused = false;
    this.playNextStep();
  }

  // Pause animation
  pause() {
    this.isPlaying = false;
    this.isPaused = true;
    if (this.animationId) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }
    if (this.onPauseCallback) {
      this.onPauseCallback(this.currentStep);
    }
  }

  // Resume animation from current step
  resume() {
    if (!this.isPaused || this.animationSteps.length === 0) return;

    this.isPlaying = true;
    this.isPaused = false;
    this.playNextStep();
  }

  // Stop and reset animation
  reset() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentStep = 0;
    
    if (this.animationId) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }

    // Reset visualization to initial state
    if (this.onStepCallback) {
      this.onStepCallback(null, 'reset');
    }
  }

  // Jump to specific step
  goToStep(step) {
    if (step < 0 || step >= this.animationSteps.length) return;

    this.currentStep = step;
    if (this.onStepCallback) {
      this.onStepCallback(this.animationSteps[step], 'jump');
    }
  }

  // Get current animation state
  getState() {
    return {
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentStep: this.currentStep,
      totalSteps: this.animationSteps.length,
      progress: this.animationSteps.length > 0 ? (this.currentStep / this.animationSteps.length) * 100 : 0
    };
  }

  // Play next animation step
  playNextStep() {
    if (!this.isPlaying || this.currentStep >= this.animationSteps.length) {
      this.handleAnimationComplete();
      return;
    }

    const step = this.animationSteps[this.currentStep];
    
    // Execute current step callback
    if (this.onStepCallback) {
      this.onStepCallback(step, 'play');
    }

    this.currentStep++;

    // Schedule next step
    this.animationId = setTimeout(() => {
      this.playNextStep();
    }, this.getCurrentDelay());
  }

  // Handle animation completion
  handleAnimationComplete() {
    this.isPlaying = false;
    this.isPaused = false;
    
    if (this.animationId) {
      clearTimeout(this.animationId);
      this.animationId = null;
    }

    if (this.onCompleteCallback) {
      this.onCompleteCallback();
    }
  }

  // Skip to next step manually
  nextStep() {
    if (this.currentStep < this.animationSteps.length) {
      const step = this.animationSteps[this.currentStep];
      if (this.onStepCallback) {
        this.onStepCallback(step, 'manual');
      }
      this.currentStep++;
    }
  }

  // Go to previous step
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      const step = this.animationSteps[this.currentStep];
      if (this.onStepCallback) {
        this.onStepCallback(step, 'manual');
      }
    }
  }

  // Check if animation is at the end
  isComplete() {
    return this.currentStep >= this.animationSteps.length;
  }

  // Clean up resources
  destroy() {
    this.reset();
    this.onStepCallback = null;
    this.onCompleteCallback = null;
    this.onPauseCallback = null;
    this.animationSteps = [];
  }
}

export default AnimationEngine;