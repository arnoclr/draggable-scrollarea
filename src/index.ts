import './style.css';

type DraggableScrollAreaOptions = {
    velocity?: boolean
};

class DraggableScrollArea {
    private element: HTMLElement;
    private isGrabbed = false;
    private activeVelocityEffect= false;
    private hidesOnStart: [HTMLElement?];
    private hidesOnEnd: [HTMLElement?];
    private scrollPositions: [number?];
    private options: DraggableScrollAreaOptions = {
        velocity: true
    };

    constructor(element: HTMLElement, options: DraggableScrollAreaOptions = {}) {
        this.element = element;
        this.hidesOnStart = [];
        this.hidesOnEnd = [];
        this.options = { ...this.options, ...options };

        this.element.classList.add('draggable-area');

        this.element.addEventListener('mousedown', this.onMouseDown);
        this.element.addEventListener('mousemove', this.onMouseMove);
        this.element.addEventListener('mouseup', this.onMouseUp);
        this.element.addEventListener('mouseleave', this.onMouseUp);
        this.element.addEventListener('scroll', this.handleHides);

        // TODO: remove setTimeout
        setTimeout(() => {
            this.handleHides();
        }, 125);
    }

    public forwards = (): void => {
        this.changeStep(1);
    }

    public backwards = (): void => {
        this.changeStep(-1);
    }

    public hideOnStart = (element: HTMLElement): void => {
        this.hidesOnStart.push(element);
    }

    public hideOnEnd = (element: HTMLElement): void => {
        this.hidesOnEnd.push(element);
    }

    private changeStep = (direction: number): void => {
        this.element.scrollBy({
            top: (this.element.clientHeight / 1.5) * direction,
            left: (this.element.clientWidth / 1.5) * direction,
            behavior: 'smooth'
        });
    }

    private onMouseDown = (): void => {
        this.element.classList.add('grabbing');
        this.isGrabbed = true;
        this.activeVelocityEffect = false;

        this.scrollPositions = [];
        this.appendScrollPositions();
    };

    private onMouseMove = (event: MouseEvent): void => {
        if (!this.isGrabbed) return;

        this.element.scrollLeft = this.element.scrollLeft - event.movementX;
        this.element.scrollTop = this.element.scrollTop - event.movementY;
    };

    private appendScrollPositions = (): void => {
        if (!this.isGrabbed) return;
        this.scrollPositions.push(this.element.scrollLeft + this.element.scrollTop);
        window.requestAnimationFrame(() => this.appendScrollPositions());
    }

    private velocityEffect = (speed: number): FrameRequestCallback => {
        if (!this.activeVelocityEffect) return;
        if (speed <= 1 && speed >= -1) return;

        this.element.scrollLeft = this.element.scrollLeft + speed;
        window.requestAnimationFrame(() => this.velocityEffect(speed / 1.1));
    }

    private onMouseUp = (): void => {
        if (!this.isGrabbed) return;

        this.element.classList.remove('grabbing');
        this.isGrabbed = false;

        const DISTANCE_FRAMES = 10;

        const previousPoint = this.scrollPositions.length > DISTANCE_FRAMES ? this.scrollPositions[this.scrollPositions.length - DISTANCE_FRAMES] : this.scrollPositions[this.scrollPositions.length - 2];
        const currentPoint = this.scrollPositions[this.scrollPositions.length - 1]
        const distance = currentPoint - previousPoint;

        if (this.options.velocity) {
            this.activeVelocityEffect = true;
            window.requestAnimationFrame(() => this.velocityEffect(distance / DISTANCE_FRAMES));
        }
    };

    private handleHides = (): void => {
        const isStart = 
            this.element.scrollLeft < this.element.clientWidth * 0.2
            && this.element.scrollTop < this.element.clientHeight * 0.2;

        const isEnd =
            this.element.scrollLeft > this.element.scrollWidth - this.element.clientWidth * 1.2
            && this.element.scrollTop > this.element.scrollHeight - this.element.clientHeight * 1.2;

        this.hidesOnStart.forEach(element => element.style.display = isStart ? 'none' : null);
        this.hidesOnEnd.forEach(element => element.style.display = isEnd ? 'none' : null);
    };
}

export default DraggableScrollArea;