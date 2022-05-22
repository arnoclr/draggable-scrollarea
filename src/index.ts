import './style.css';

type DraggableScrollAreaOptions = {
    velocity?: boolean
};

class DraggableScrollArea {
    private element: HTMLElement;
    private isGrabbed = false;
    private activeVelocityEffect= false;
    private lastGrabTime: number;
    private lastGrabScrollLeft: number;
    private lastGrabScrollTop: number;
    private options: DraggableScrollAreaOptions = {
        velocity: true
    };

    constructor(element: HTMLElement, options: DraggableScrollAreaOptions = {}) {
        this.element = element;
        this.options = { ...this.options, ...options };

        this.element.classList.add('draggable-area');

        this.element.addEventListener('mousedown', this.onMouseDown);
        this.element.addEventListener('mousemove', this.onMouseMove);
        this.element.addEventListener('mouseup', this.onMouseUp);
        this.element.addEventListener('mouseleave', this.onMouseUp);
    }

    public forwards = (): void => {
        this.changeStep(1);
    }

    public backwards = (): void => {
        this.changeStep(-1);
    }

    private changeStep = (direction: number): void => {
        this.element.scrollLeft += (this.element.clientWidth / 1.5) * direction;
        this.element.scrollTop += (this.element.clientHeight / 1.5) * direction;
    }

    private onMouseDown = (): void => {
        this.element.classList.add('grabbing');
        this.isGrabbed = true;
        this.activeVelocityEffect = false;
        this.lastGrabTime = Date.now();
        this.lastGrabScrollLeft = this.element.scrollLeft;
        this.lastGrabScrollTop = this.element.scrollTop;
    };

    private onMouseMove = (event: MouseEvent): void => {
        if (!this.isGrabbed) return;

        this.element.scrollLeft = this.element.scrollLeft - event.movementX;
        this.element.scrollTop = this.element.scrollTop - event.movementY;
    };

    private velocityEffect = (speed: number): FrameRequestCallback => {
        if (!this.activeVelocityEffect) return;
        if (speed <= 1 && speed >= -1) return;

        this.element.scrollLeft = this.element.scrollLeft + speed;
        window.requestAnimationFrame(() => this.velocityEffect(speed / 1.09));
    }

    private onMouseUp = (): void => {
        this.element.classList.remove('grabbing');
        this.isGrabbed = false;
        const grabbingTime = Date.now() - this.lastGrabTime;
        const grabbingDistanceX = this.element.scrollLeft - this.lastGrabScrollLeft;
        const grabbingDistanceY = this.element.scrollTop - this.lastGrabScrollTop;
        const speed = (grabbingDistanceX + grabbingDistanceY) / grabbingTime;

        if (this.options.velocity) {
            this.activeVelocityEffect = true;
            window.requestAnimationFrame(() => this.velocityEffect(speed + (speed > 0 ? 1 : -1)));
        }
    };
}

export default DraggableScrollArea;